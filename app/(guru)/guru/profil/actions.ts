"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { teacherProfileSchema } from "@/lib/validations/profile";

export type GuruActionResult = {
  success: boolean;
  message: string;
};

async function requireGuru() {
  const session = await auth();
  if (session?.user?.role !== "GURU") {
    throw new Error("Tidak diizinkan.");
  }
  return session;
}

export async function updateTeacherProfileAction(formData: FormData): Promise<GuruActionResult> {
  const session = await requireGuru();
  const parsed = teacherProfileSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    currentPassword: formData.get("currentPassword") ?? "",
    newPassword: formData.get("newPassword") ?? "",
  });
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { name, phone, currentPassword, newPassword } = parsed.data;
  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });
  if (!teacher) {
    return { success: false, message: "Profil guru tidak ditemukan." };
  }

  const password = newPassword
    ? await bcrypt.compare(currentPassword ?? "", teacher.user.password).then((valid) => {
        if (!valid) return null;
        return bcrypt.hash(newPassword, 10);
      })
    : undefined;
  if (newPassword && !password) {
    return { success: false, message: "Password saat ini salah." };
  }

  await prisma.$transaction([
    prisma.teacher.update({ where: { id: teacher.id }, data: { phone } }),
    prisma.user.update({
      where: { id: teacher.userId },
      data: { name, ...(password ? { password } : {}) },
    }),
  ]);
  revalidatePath("/guru/profil");
  return { success: true, message: "Profil berhasil diperbarui." };
}
