"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { classSchema, subjectSchema } from "@/lib/validations/akademik";
import type { AdminActionResult } from "../siswa/actions";

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Tidak diizinkan.");
  }
}

export async function createClassAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = classSchema.safeParse({
    name: formData.get("name"),
    grade: formData.get("grade"),
    year: formData.get("year"),
    teacherId: formData.get("teacherId") || undefined,
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, grade, year, teacherId } = parsed.data;
  const existing = await prisma.class.findFirst({ where: { name, year } });
  if (existing) {
    return { success: false, message: `Kelas ${name} untuk tahun ajaran ${year} sudah ada.` };
  }
  await prisma.class.create({
    data: { name, grade, year, teacherId: teacherId ?? null },
  });
  revalidatePath("/admin/akademik");
  return { success: true, message: `Kelas ${name} berhasil ditambahkan.` };
}

export async function updateClassAction(classId: string, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = classSchema.safeParse({
    name: formData.get("name"),
    grade: formData.get("grade"),
    year: formData.get("year"),
    teacherId: formData.get("teacherId") || undefined,
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, grade, year, teacherId } = parsed.data;
  const existing = await prisma.class.findFirst({ where: { name, year, id: { not: classId } } });
  if (existing) {
    return { success: false, message: `Kelas ${name} untuk tahun ajaran ${year} sudah ada.` };
  }
  await prisma.class.update({ where: { id: classId }, data: { name, grade, year, teacherId: teacherId ?? null } });
  revalidatePath("/admin/akademik");
  return { success: true, message: `Kelas ${name} berhasil diperbarui.` };
}

export async function deleteClassAction(classId: string): Promise<AdminActionResult> {
  await requireAdmin();
  const kelas = await prisma.class.findUnique({
    where: { id: classId },
    include: { _count: { select: { students: true, attendances: true } } },
  });
  if (!kelas) {
    return { success: false, message: "Kelas tidak ditemukan." };
  }
  if (kelas._count.students > 0) {
    return { success: false, message: `Kelas masih memiliki ${kelas._count.students} siswa. Pindahkan siswa terlebih dahulu.` };
  }
  // Detach wali kelas, delete attendance history, then remove the class
  await prisma.$transaction([
    prisma.class.update({ where: { id: classId }, data: { teacherId: null } }),
    prisma.attendance.deleteMany({ where: { classId } }),
    prisma.class.delete({ where: { id: classId } }),
  ]);
  revalidatePath("/admin/akademik");
  return { success: true, message: `Kelas ${kelas.name} berhasil dihapus.` };
}

export async function createSubjectAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = subjectSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    teacherId: formData.get("teacherId") || undefined,
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, code, teacherId } = parsed.data;
  const existingCode = await prisma.subject.findUnique({ where: { code } });
  if (existingCode) {
    return { success: false, message: `Kode mata pelajaran ${code} sudah digunakan.` };
  }
  await prisma.subject.create({ data: { name, code, teacherId: teacherId ?? null } });
  revalidatePath("/admin/akademik");
  return { success: true, message: `Mata pelajaran ${name} berhasil ditambahkan.` };
}

export async function updateSubjectAction(subjectId: string, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = subjectSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    teacherId: formData.get("teacherId") || undefined,
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, code, teacherId } = parsed.data;
  const existingCode = await prisma.subject.findFirst({ where: { code, id: { not: subjectId } } });
  if (existingCode) {
    return { success: false, message: `Kode mata pelajaran ${code} sudah digunakan.` };
  }
  await prisma.subject.update({ where: { id: subjectId }, data: { name, code, teacherId: teacherId ?? null } });
  revalidatePath("/admin/akademik");
  return { success: true, message: `Mata pelajaran ${name} berhasil diperbarui.` };
}

export async function deleteSubjectAction(subjectId: string): Promise<AdminActionResult> {
  await requireAdmin();
  const subject = await prisma.subject.findUnique({
    where: { id: subjectId },
    include: { _count: { select: { grades: true } } },
  });
  if (!subject) {
    return { success: false, message: "Mata pelajaran tidak ditemukan." };
  }
  if (subject._count.grades > 0) {
    return { success: false, message: `Mata pelajaran masih memiliki ${subject._count.grades} data nilai. Hapus nilai terlebih dahulu.` };
  }
  await prisma.subject.delete({ where: { id: subjectId } });
  revalidatePath("/admin/akademik");
  return { success: true, message: `Mata pelajaran ${subject.name} berhasil dihapus.` };
}
