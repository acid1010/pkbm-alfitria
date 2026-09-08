"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AdminAttendanceResult = {
  success: boolean;
  message: string;
};

const attendanceInputSchema = z.object({
  classId: z.string().min(1, "Kelas wajib dipilih."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal tidak valid."),
  entries: z.array(
    z.object({
      studentId: z.string().min(1),
      status: z.enum(["NONE", "HADIR", "IZIN", "SAKIT", "ALPHA"]),
    }),
  ),
});

function parseWibDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00+07:00`);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

export async function saveAdminAttendanceAction(input: unknown): Promise<AdminAttendanceResult> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Tidak diizinkan.");
  }

  const parsed = attendanceInputSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Data tidak valid." };
  }

  const attendanceDate = parseWibDate(parsed.data.date);
  if (!attendanceDate) {
    return { success: false, message: "Tanggal tidak valid." };
  }

  const kelas = await prisma.class.findUnique({
    where: { id: parsed.data.classId },
    select: { students: { select: { id: true } } },
  });
  if (!kelas) {
    return { success: false, message: "Kelas tidak ditemukan." };
  }

  const studentIds = new Set(kelas.students.map((student) => student.id));
  const entries = parsed.data.entries.filter((entry) => studentIds.has(entry.studentId));

  await prisma.$transaction(
    entries.map((entry) => {
      if (entry.status === "NONE") {
        return prisma.attendance.deleteMany({
          where: {
            studentId: entry.studentId,
            classId: parsed.data.classId,
            date: attendanceDate,
          },
        });
      }

      return prisma.attendance.upsert({
        where: {
          studentId_classId_date: {
            studentId: entry.studentId,
            classId: parsed.data.classId,
            date: attendanceDate,
          },
        },
        create: {
          studentId: entry.studentId,
          classId: parsed.data.classId,
          date: attendanceDate,
          status: entry.status,
          checkInAt: entry.status === "HADIR" ? new Date() : null,
        },
        update: { status: entry.status },
      });
    }),
  );

  revalidatePath("/admin/absensi");
  return { success: true, message: `Absensi ${entries.length} siswa berhasil disimpan.` };
}
