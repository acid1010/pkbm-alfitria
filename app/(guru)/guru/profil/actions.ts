"use server";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { gradeEntrySchema } from "@/lib/validations/grade";
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

export async function saveGradesAction(input: unknown): Promise<GuruActionResult> {
  const session = await requireGuru();
  const parsed = gradeEntrySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }
  const { classId, subjectId, semester, type, scores } = parsed.data;

  // Authorization: subject must belong to this teacher, class must be theirs too
  const subject = await prisma.subject.findFirst({
    where: { id: subjectId, teacher: { userId: session.user.id } },
  });
  if (!subject) {
    return { success: false, message: "Mata pelajaran bukan penugasan Anda." };
  }
  const kelas = await prisma.class.findFirst({
    where: { id: classId, teacher: { userId: session.user.id } },
    select: { students: { select: { id: true } } },
  });
  if (!kelas) {
    return { success: false, message: "Kelas bukan penugasan Anda." };
  }
  const studentIds = new Set(kelas.students.map((student) => student.id));
  const validScores = scores.filter((item) => studentIds.has(item.studentId));

  await prisma.$transaction(
    validScores.map((item) =>
      prisma.grade.upsert({
        where: {
          studentId_subjectId_semester_type: {
            studentId: item.studentId,
            subjectId,
            semester,
            type,
          },
        },
        create: {
          studentId: item.studentId,
          subjectId,
          semester,
          type,
          score: item.score,
        },
        update: { score: item.score },
      }),
    ),
  );
  revalidatePath("/guru/nilai");
  return { success: true, message: `Nilai ${validScores.length} siswa berhasil disimpan.` };
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
  await prisma.teacher.update({ where: { id: teacher.id }, data: { phone } });
  if (newPassword) {
    const valid = await bcrypt.compare(currentPassword ?? "", teacher.user.password);
    if (!valid) {
      return { success: false, message: "Password saat ini salah." };
    }
    await prisma.user.update({
      where: { id: teacher.userId },
      data: { name, password: await bcrypt.hash(newPassword, 10) },
    });
  } else {
    await prisma.user.update({ where: { id: teacher.userId }, data: { name } });
  }
  revalidatePath("/guru/profil");
  return { success: true, message: "Profil berhasil diperbarui." };
}
