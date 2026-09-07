"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { documentRequestSchema } from "@/lib/validations/document";
import { studentProfileSchema } from "@/lib/validations/profile";
import bcrypt from "bcryptjs";

export type SiswaActionResult = {
  success: boolean;
  message: string;
};

async function requireSiswa() {
  const session = await auth();
  if (session?.user?.role !== "SISWA") {
    throw new Error("Tidak diizinkan.");
  }
  return session;
}

export async function requestDocumentAction(formData: FormData): Promise<SiswaActionResult> {
  const session = await requireSiswa();
  const parsed = documentRequestSchema.safeParse({
    type: formData.get("type"),
    notes: formData.get("notes") ?? "",
  });
  if (! parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (! student) {
    return { success: false, message: "Data siswa tidak ditemukan." };
  }
  await prisma.document.create({
    data: {
      studentId: student.id,
      type: parsed.data.type,
    },
  });
  revalidatePath("/siswa/dokumen");
  return { success: true, message: `Pengajuan ${parsed.data.type} berhasil dikirim.` };
}

export async function cancelDocumentAction(documentId: string): Promise<SiswaActionResult> {
  const session = await requireSiswa();
  const document = await prisma.document.findFirst({
    where: { id: documentId, student: { userId: session.user.id } },
  });
  if (! document) {
    return { success: false, message: "Dokumen tidak ditemukan." };
  }
  if (document.status !== "REQUESTED") {
    return { success: false, message: "Dokumen sudah diproses dan tidak dapat dibatalkan." };
  }
  await prisma.document.delete({ where: { id: documentId } });
  revalidatePath("/siswa/dokumen");
  return { success: true, message: "Pengajuan dokumen dibatalkan." };
}

export async function updateStudentProfileAction(formData: FormData): Promise<SiswaActionResult> {
  const session = await requireSiswa();
  const parsed = studentProfileSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    currentPassword: formData.get("currentPassword") ?? "",
    newPassword: formData.get("newPassword") ?? "",
  });
  if (! parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, address, phone, currentPassword, newPassword } = parsed.data;
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });
  if (! student) {
    return { success: false, message: "Data siswa tidak ditemukan." };
  }
  await prisma.student.update({ where: { id: student.id }, data: { address, phone } });
  if (newPassword) {
    const valid = await bcrypt.compare(currentPassword ?? "", student.user.password);
    if (! valid) {
      return { success: false, message: "Password saat ini salah." };
    }
    await prisma.user.update({
      where: { id: student.userId },
      data: { name, password: await bcrypt.hash(newPassword, 10) },
    });
  } else {
    await prisma.user.update({ where: { id: student.userId }, data: { name } });
  }
  revalidatePath("/siswa/profil");
  return { success: true, message: "Profil berhasil diperbarui." };
}
