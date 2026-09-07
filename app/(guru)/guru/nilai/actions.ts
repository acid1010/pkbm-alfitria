"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { gradeEntrySchema } from "@/lib/validations/grade";

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
