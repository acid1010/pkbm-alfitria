"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { studentSchema, studentUpdateSchema } from "@/lib/validations/student";

export type AdminActionResult = {
  success: boolean;
  message: string;
};

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Tidak diizinkan.");
  }
}

export async function createStudentAction(formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = studentSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    nis: formData.get("nis"),
    classId: formData.get("classId") || undefined,
    birthdate: formData.get("birthdate"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, email, password, nis, classId, birthdate, address, phone } = parsed.data;
  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return { success: false, message: "Email sudah terdaftar." };
  }
  const existingNis = await prisma.student.findUnique({ where: { nis } });
  if (existingNis) {
    return { success: false, message: "NIS sudah terdaftar." };
  }
  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "SISWA",
      student: {
        create: {
          nis,
          classId: classId ?? null,
          birthdate: new Date(birthdate),
          address,
          phone,
        },
      },
    },
  });
  revalidatePath("/admin/siswa");
  return { success: true, message: `Siswa ${name} berhasil ditambahkan.` };
}

export async function updateStudentAction(studentId: string, formData: FormData): Promise<AdminActionResult> {
  await requireAdmin();
  const parsed = studentUpdateSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
    nis: formData.get("nis"),
    classId: formData.get("classId") || undefined,
    birthdate: formData.get("birthdate"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, email, password, nis, classId, birthdate, address, phone } = parsed.data;
  const student = await prisma.student.findUnique({ where: { id: studentId }, include: { user: true } });
  if (!student) {
    return { success: false, message: "Siswa tidak ditemukan." };
  }
  const emailTaken = await prisma.user.findFirst({ where: { email, id: { not: student.userId } } });
  if (emailTaken) {
    return { success: false, message: "Email sudah digunakan pengguna lain." };
  }
  const nisTaken = await prisma.student.findFirst({ where: { nis, id: { not: studentId } } });
  if (nisTaken) {
    return { success: false, message: "NIS sudah digunakan siswa lain." };
  }
  await prisma.user.update({
    where: { id: student.userId },
    data: {
      name,
      email,
      ...(password ? { password: await bcrypt.hash(password, 10) } : {}),
      student: {
        update: {
          nis,
          classId: classId ?? null,
          birthdate: new Date(birthdate),
          address,
          phone,
        },
      },
    },
  });
  revalidatePath("/admin/siswa");
  return { success: true, message: `Data siswa ${name} berhasil diperbarui.` };
}

export async function deleteStudentAction(studentId: string): Promise<AdminActionResult> {
  await requireAdmin();
  const student = await prisma.student.findUnique({ where: { id: studentId }, include: { user: true } });
  if (!student) {
    return { success: false, message: "Siswa tidak ditemukan." };
  }
  // Deleting the User cascades to Student, Attendance, Grade, and Document rows
  await prisma.user.delete({ where: { id: student.userId } });
  revalidatePath("/admin/siswa");
  return { success: true, message: `Siswa ${student.user.name} berhasil dihapus.` };
}
