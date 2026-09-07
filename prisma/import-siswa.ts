/**
 * Import real student roster from "ABSEN SISWA PKBM AL-FITRIA TP 2627.xlsx".
 *
 * - Idempotent: batched createMany for new rows, upserts only for mismatches.
 *   Safe to re-run (resumes partial imports).
 * - Never deletes anything.
 * - Classes are created per sheet (Paket B, Paket C X/XI/XII) for TP 2026/2027.
 * - Fields not present in the source (birthdate, address, phone) get neutral
 *   placeholders; admins can update them via /admin/siswa.
 * - Duplicate NIS across sheets: first occurrence wins.
 *
 * Usage:
 *   npx tsx prisma/import-siswa.ts --dry   # preview only
 *   npx tsx prisma/import-siswa.ts         # write to DB
 */
import bcrypt from "bcryptjs";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

/**
 * Minimal .env loader (dotenv is not a project dependency).
 * Reads KEY=VALUE lines; `override: true` lets the first file win.
 */
function loadEnvFile(path: string, override = false): void {
  try {
    const content = fs.readFileSync(path, "utf8");
    for (const line of content.split("\n")) {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const key = match[1];
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (override || !(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // File missing — fall back to existing process.env
  }
}

// Prefer the Vercel-pulled pooler URL (IPv4-safe); falls back to .env
loadEnvFile(".env.vercel-full", true);
loadEnvFile(".env");

const prisma = new PrismaClient();
const XLSX_PATH = "/Users/acidjp/Downloads/ABSEN SISWA PKBM AL-FITRIA TP 2627.xlsx";
const YEAR = "2026/2027";
const DEFAULT_PASSWORD = "pkbm2026";
const EMAIL_DOMAIN = "siswa.pkbmalfitria.id";

const SHEETS = [
  { file: "PAKET B", className: "Paket B", grade: 7 },
  { file: " PAKET C KLS 10", className: "Paket C X", grade: 10 },
  { file: "PAKET C KLS 11", className: "Paket C XI", grade: 11 },
  { file: "PAKET C KLS 12", className: "Paket C XII", grade: 12 },
];

// Required by the schema but absent from the source file — rough age per grade
const BIRTH_PLACEHOLDER: Record<number, Date> = {
  7: new Date("2013-01-01"),
  10: new Date("2010-01-01"),
  11: new Date("2009-01-01"),
  12: new Date("2008-01-01"),
};

type Entry = {
  nis: string;
  nama: string;
  email: string;
  classId: string;
  className: string;
  grade: number;
};

function cellText(row: ExcelJS.Row, col: number): string {
  const cell = row.getCell(col);
  try {
    return String(cell.text ?? "").trim();
  } catch {
    return ""; // merged slave cells throw on .text
  }
}

function titleCase(name: string): string {
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function ensureClass(className: string, grade: number, dryRun: boolean): Promise<string> {
  const kelas = await prisma.class.findFirst({ where: { name: className, year: YEAR } });
  if (kelas) return kelas.id;
  if (dryRun) {
    console.log(`[dry] would create class: ${className} (grade ${grade}, ${YEAR})`);
    return `dry-${grade}`;
  }
  const created = await prisma.class.create({
    data: { name: className, grade, year: YEAR },
  });
  console.log(`created class: ${className} (${created.id})`);
  return created.id;
}

async function main() {
  const dryRun = process.argv.includes("--dry");
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(XLSX_PATH);

  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
  const seenNis = new Map<string, string>();
  const entries: Entry[] = [];
  let skippedDupes = 0;

  // 1. Parse + dedupe (no writes yet)
  for (const sheet of SHEETS) {
    const ws = workbook.getWorksheet(sheet.file);
    if (!ws) throw new Error(`Sheet "${sheet.file}" not found`);

    for (let r = 10; r <= ws.rowCount; r++) {
      const row = ws.getRow(r);
      const nisRaw = cellText(row, 2);
      const namaRaw = cellText(row, 4);
      if (!/^\d+(\.0)?$/.test(nisRaw) || !namaRaw) continue; // footer/summary rows
      const nis = nisRaw.replace(/\.0$/, "");
      if (seenNis.has(nis)) {
        skippedDupes += 1;
        console.log(`DUPLICATE NIS ${nis} (${titleCase(namaRaw)}) — kept from ${seenNis.get(nis)}, skipped here`);
        continue;
      }
      seenNis.set(nis, sheet.className);
      entries.push({
        nis,
        nama: titleCase(namaRaw),
        email: `${nis}@${EMAIL_DOMAIN}`,
        classId: "", // filled after class resolution
        className: sheet.className,
        grade: sheet.grade,
      });
    }
  }

  // 2. Resolve/create classes
  const classCache = new Map<string, string>();
  for (const sheet of SHEETS) {
    classCache.set(sheet.className, await ensureClass(sheet.className, sheet.grade, dryRun));
  }
  for (const entry of entries) {
    entry.classId = classCache.get(entry.className)!;
  }

  if (dryRun) {
    const perClass = entries.reduce<Record<string, number>>((acc, e) => {
      acc[e.className] = (acc[e.className] ?? 0) + 1;
      return acc;
    }, {});
    console.log("---");
    console.log(`[dry] would import ${entries.length} students, duplicates skipped: ${skippedDupes}`);
    console.log("[dry] per class:", JSON.stringify(perClass));
    return;
  }

  // 3. Diff against DB
  const emails = entries.map((e) => e.email);
  const existingUsers = await prisma.user.findMany({
    where: { email: { in: emails } },
    select: { email: true },
  });
  const existingEmails = new Set(existingUsers.map((u) => u.email));

  const nisList = entries.map((e) => e.nis);
  const existingStudents = await prisma.student.findMany({
    where: { nis: { in: nisList } },
    select: { nis: true, classId: true, user: { select: { email: true } } },
  });
  const existingByNis = new Map(existingStudents.map((s) => [s.nis, s]));

  const newEntries = entries.filter((e) => !existingByNis.has(e.nis));
  const existingEntries = entries.filter((e) => existingByNis.has(e.nis));

  // 4. Batch-create users (new), then link missing user accounts for existing students
  const newUsers = newEntries.filter((e) => !existingEmails.has(e.email));
  if (newUsers.length) {
    await prisma.user.createMany({
      data: newUsers.map((e) => ({ name: e.nama, email: e.email, password: passwordHash, role: "SISWA" })),
    });
  }
  const orphanEmails = existingEntries
    .filter((e) => !existingEmails.has(e.email))
    .map((e) => e.email); // partial-run leftovers: user row missing but student exists
  if (orphanEmails.length) {
    await prisma.user.createMany({
      data: entries
        .filter((e) => orphanEmails.includes(e.email))
        .map((e) => ({ name: e.nama, email: e.email, password: passwordHash, role: "SISWA" })),
    });
  }

  // 5. Batch-create students (new)
  if (newEntries.length) {
    const newEmails = newEntries.map((e) => e.email);
    const usersByEmail = new Map(
      (
        await prisma.user.findMany({
          where: { email: { in: [...new Set(newEmails)] } },
          select: { id: true, email: true },
        })
      ).map((u) => [u.email, u.id]),
    );
    const missing = newEntries.filter((e) => !usersByEmail.has(e.email));
    if (missing.length) throw new Error(`Missing user rows after createMany: ${missing.map((e) => e.email).join(", ")}`);
    await prisma.student.createMany({
      data: newEntries.map((e) => ({
        userId: usersByEmail.get(e.email)!,
        nis: e.nis,
        classId: e.classId,
        birthdate: BIRTH_PLACEHOLDER[e.grade],
        address: "",
        phone: "",
      })),
    });
  }

  // 6. Fix existing students: wrong class or orphaned user link
  let fixed = 0;
  for (const e of existingEntries) {
    const existing = existingByNis.get(e.nis)!;
    const fixes: { classId?: string; userId?: string } = {};
    if (existing.classId !== e.classId) fixes.classId = e.classId;
    if (existing.user.email !== e.email) fixes.userId = "resolve-orphan";
    if (fixes.userId === "resolve-orphan") {
      const user = await prisma.user.findUnique({ where: { email: e.email }, select: { id: true } });
      if (user) fixes.userId = user.id;
      else delete fixes.userId;
    }
    if (Object.keys(fixes).length) {
      await prisma.student.update({ where: { nis: e.nis }, data: fixes });
      fixed += 1;
    }
  }

  const perClass = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.className] = (acc[e.className] ?? 0) + 1;
    return acc;
  }, {});
  console.log("---");
  console.log(`imported: ${newEntries.length} created, ${fixed} fixed (class/user link), duplicates skipped: ${skippedDupes}`);
  console.log("per class:", JSON.stringify(perClass));
}

main()
  .catch((error) => {
    console.error("IMPORT FAILED:", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
