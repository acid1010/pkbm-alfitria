"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
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
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

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
  // ponytail: local disk — ephemeral on Vercel; switch to object storage (S3/R2) before prod deploy
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const savedFiles: string[] = [];
  for (const file of files) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return { success: false, message: "Ukuran setiap berkas maksimal 5 MB." };
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return { success: false, message: "Format berkas harus JPG, PNG, atau PDF." };
    }

    const filename = `${Date.now()}-${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);
    savedFiles.push(`/uploads/${filename}`);
  }

  const registrationNumber = `PPDB-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;

  await prisma.pPDB.create({
    data: {
      name: parsed.data.name,
      birthdate: new Date(parsed.data.birthdate),
      address: parsed.data.address,
      phone: parsed.data.phone,
      documents: savedFiles.length ? savedFiles : parsed.data.documents,
      registrationNumber,
    },
  });

  return {
    success: true,
    message: "Pendaftaran berhasil disimpan.",
    registrationNumber,
  };
}
