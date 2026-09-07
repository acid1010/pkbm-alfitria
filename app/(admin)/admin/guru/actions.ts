"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { teacherSchema, teacherUpdateSchema } from "@/lib/validations/teacher";
import type { AdminActionResult } from "../siswa/actions";

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Tidak diizinkan.");
  }
}

export async function createTeacherAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = teacherSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    nip: formData.get("nip"),
    phone: formData.get("phone"),
    subjects: formData.getAll("subjects").filter((value): value is string => typeof value === "string" && value.length > 0),
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, email, password, nip, phone, subjects } = parsed.data;
  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return { success: false, message: "Email sudah terdaftar." };
  }
  const existingNip = await prisma.teacher.findUnique({ where: { nip } });
  if (existingNip) {
    return { success: false, message: "NIP sudah terdaftar." };
  }
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "GURU",
      teacher: { create: { nip, phone, subjects } },
    },
  });
  revalidatePath("/admin/guru");
  return { success: true, message: `Guru ${name} berhasil ditambahkan.` };
}

export async function updateTeacherAction(teacherId: string, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = teacherUpdateSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
    nip: formData.get("nip"),
    phone: formData.get("phone"),
    subjects: formData.getAll("subjects").filter((value): value is string => typeof value === "string" && value.length > 0),
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, email, password, nip, phone, subjects } = parsed.data;
  const teacher = await prisma.teacher.findUnique({ where: { id: teacherId }, include: { user: true } });
  if (!teacher) {
    return { success: false, message: "Guru tidak ditemukan." };
  }
  const emailTaken = await prisma.user.findFirst({ where: { email, id: { not: teacher.userId } } });
  if (emailTaken) {
    return { success: false, message: "Email sudah digunakan pengguna lain." };
  }
  const nipTaken = await prisma.teacher.findFirst({ where: { nip, id: { not: teacherId } } });
  if (nipTaken) {
    return { success: false, message: "NIP sudah digunakan guru lain." };
  }
  await prisma.user.update({
    where: { id: teacher.userId },
    data: {
      name,
      email,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
      teacher: { update: { nip, phone, subjects } },
    },
  });
  revalidatePath("/admin/guru");
  return { success: true, message: `Data guru ${name} berhasil diperbarui.` };
}

export async function deleteTeacherAction(teacherId: string): Promise<AdminActionResult> {
  await requireAdmin();
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    include: {
      user: true,
      classes: { select: { id: true } },
      subjectsTaught: { select: { id: true } },
    },
  });
  if (!teacher) {
    return { success: false, message: "Guru tidak ditemukan." };
  }
  if (teacher.classes.length) {
    return { success: false, message: "Guru masih menjadi wali kelas. Lepaskan penugasan kelas terlebih dahulu." };
  }
  // Detach taught subjects, then deleting the User cascades to the Teacher row
  await prisma.$transaction([
    prisma.subject.updateMany({ where: { teacherId }, data: { teacherId: null } }),
    prisma.class.updateMany({ where: { teacherId }, data: { teacherId: null } }),
    prisma.user.delete({ where: { id: teacher.userId } }),
  ]);
  revalidatePath("/admin/guru");
  return { success: true, message: `Guru ${teacher.user.name} berhasil dihapus.` };
}
