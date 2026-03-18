"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { isDatabaseConfigured } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";
import { ppdbSchema } from "@/lib/validations/ppdb";

export type SubmitPpdbResult = {
  success: boolean;
  message: string;
  registrationNumber?: string;
};

export async function submitPpdbAction(formData: FormData): Promise<SubmitPpdbResult> {
  if (!isDatabaseConfigured) {
    return {
      success: false,
      message: "DATABASE_URL belum diatur. Tambahkan koneksi database sebelum menyimpan pendaftaran.",
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
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const savedFiles: string[] = [];
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${randomUUID()}-${file.name.replace(/\s+/g, "-")}`;
    const destination = path.join(uploadDir, filename);
    await writeFile(destination, buffer);
    savedFiles.push(`/uploads/${filename}`);
  }

  const registrationNumber = `PPDB-2026-${Math.floor(1000 + Math.random() * 9000)}`;

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
