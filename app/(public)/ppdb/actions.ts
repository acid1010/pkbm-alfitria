"use server";

import { mkdir, rm, writeFile } from "fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { isDatabaseConfigured } from "@/lib/db-config";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";
import { ppdbSchema } from "@/lib/validations/ppdb";

export type SubmitPpdbResult = {
  success: boolean;
  message: string;
  registrationNumber?: string;
};

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".pdf"]);
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const MAX_UPLOAD_FILES = 5;

export async function submitPpdbAction(formData: FormData): Promise<SubmitPpdbResult> {
  if (!isDatabaseConfigured) {
    return {
      success: false,
      message: "DATABASE_URL belum diatur. Tambahkan koneksi database sebelum menyimpan pendaftaran.",
    };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`ppdb:${ip}`, 10, 60 * 60 * 1000)) {
    return {
      success: false,
      message: "Terlalu banyak pengajuan dari perangkat ini. Coba lagi nanti.",
    };
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    birthdate: String(formData.get("birthdate") ?? ""),
    address: String(formData.get("address") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    documents: formData
      .getAll("documents")
      .filter((value): value is string => typeof value === "string" && value.length > 0),
  };

  const parsed = ppdbSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Data tidak valid.",
    };
  }

  const files = formData.getAll("fileUpload").filter((item): item is File => item instanceof File && item.size > 0);
  if (!files.length || files.length > MAX_UPLOAD_FILES) {
    return { success: false, message: "Unggah 1 sampai 5 dokumen." };
  }

  const totalBytes = files.reduce((total, file) => total + file.size, 0);
  if (totalBytes > MAX_UPLOAD_BYTES) {
    return { success: false, message: "Total ukuran dokumen maksimal 10 MB." };
  }

  const uploadDir = process.env.PPDB_UPLOAD_DIR ?? path.join(process.cwd(), "data", "ppdb-uploads");
  await mkdir(uploadDir, { recursive: true });

  const pendingFiles: { filename: string; buffer: Buffer }[] = [];
  for (const file of files) {
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return { success: false, message: "Format berkas harus JPG, PNG, atau PDF." };
    }

    pendingFiles.push({
      filename: `${randomUUID()}${ext}`,
      buffer: Buffer.from(await file.arrayBuffer()),
    });
  }

  await Promise.all(
    pendingFiles.map(({ filename, buffer }) => writeFile(path.join(uploadDir, filename), buffer)),
  );

  const savedFiles = pendingFiles.map(({ filename }) => filename);
  const registrationNumber = `PPDB-${new Date().getFullYear()}-${randomUUID().toUpperCase()}`;

  try {
    await prisma.pPDB.create({
      data: {
        name: parsed.data.name,
        birthdate: new Date(parsed.data.birthdate),
        address: parsed.data.address,
        phone: parsed.data.phone,
        documents: savedFiles,
        registrationNumber,
      },
    });
  } catch (error) {
    await Promise.all(savedFiles.map((filename) => rm(path.join(uploadDir, filename), { force: true })));
    throw error;
  }

  return {
    success: true,
    message: "Pendaftaran berhasil disimpan.",
    registrationNumber,
  };
}
