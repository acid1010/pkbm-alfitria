"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { removeSelfie, saveSelfie } from "@/lib/selfie-storage";

type StudentOption = {
  id: string;
  name: string;
  nis: string;
};

export type TeacherOption = {
  id: string;
  name: string;
  nip: string;
};

export type AbsenResult = {
  success: boolean;
  message: string;
  personName?: string;
  checkInAt?: string;
};

const MAX_SELFIE_BYTES = 5 * 1024 * 1024;
const allowedSelfieTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
]);

let lastPurgeDate: string | undefined;

function getWibDateParts(date = new Date()): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";

  return {
    date: `${value("year")}-${value("month")}-${value("day")}`,
    time: `${value("hour")}:${value("minute")}:${value("second")}`,
  };
}

function getAttendanceDate(wibDate: string): Date {
  return new Date(`${wibDate}T00:00:00+07:00`);
}

function hasValidImageSignature(bytes: Uint8Array, type: string): boolean {
  if (type === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }

  return bytes.length >= 8 && bytes.subarray(0, 8).every((byte, index) => byte === [137, 80, 78, 71, 13, 10, 26, 10][index]);
}

async function purgeExpiredSelfies(today: string): Promise<void> {
  if (lastPurgeDate === today) {
    return;
  }

  lastPurgeDate = today;
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [expiredStudentAttendances, expiredTeacherAttendances] = await Promise.all([
    prisma.attendance.findMany({
      where: { selfieUrl: { not: null }, checkInAt: { lt: cutoff } },
      select: { id: true, selfieUrl: true },
    }),
    prisma.teacherAttendance.findMany({
      where: { selfieUrl: { not: null }, checkInAt: { lt: cutoff } },
      select: { id: true, selfieUrl: true },
    }),
  ]);
  const expiredAttendances = [
    ...expiredStudentAttendances.map((attendance) => ({ ...attendance, type: "student" as const })),
    ...expiredTeacherAttendances.map((attendance) => ({ ...attendance, type: "teacher" as const })),
  ];

  for (const attendance of expiredAttendances) {
    if (!attendance.selfieUrl) {
      continue;
    }

    try {
      await removeSelfie(attendance.selfieUrl);
      if (attendance.type === "student") {
        await prisma.attendance.update({ where: { id: attendance.id }, data: { selfieUrl: null } });
      } else {
        await prisma.teacherAttendance.update({ where: { id: attendance.id }, data: { selfieUrl: null } });
      }
    } catch (error) {
      console.error("Gagal menghapus selfie kedaluwarsa:", error);
    }
  }
}

export async function getSiswaByKelas(classId: string): Promise<StudentOption[]> {
  if (!classId) {
    return [];
  }

  return prisma.student.findMany({
    where: { classId },
    select: { id: true, nis: true, user: { select: { name: true } } },
    orderBy: { user: { name: "asc" } },
  }).then((students) => students.map((student) => ({ id: student.id, nis: student.nis, name: student.user.name })));
}

export async function getGuruOptions(): Promise<TeacherOption[]> {
  const teachers = await prisma.teacher.findMany({
    select: { id: true, nip: true, user: { select: { name: true } } },
    orderBy: { user: { name: "asc" } },
  });
  return teachers.map((teacher) => ({ id: teacher.id, nip: teacher.nip, name: teacher.user.name }));
}

async function parseSelfie(formData: FormData): Promise<{ fileBytes: Uint8Array; extension: string } | { error: string }> {
  const selfie = formData.get("selfie");
  if (!(selfie instanceof File) || selfie.size === 0) {
    return { error: "Ambil foto selfie terlebih dahulu." };
  }
  if (selfie.size > MAX_SELFIE_BYTES) {
    return { error: "Ukuran foto selfie maksimal 5 MB." };
  }

  const extension = allowedSelfieTypes.get(selfie.type);
  if (!extension) {
    return { error: "Foto selfie harus berformat JPG atau PNG." };
  }

  const fileBytes = new Uint8Array(await selfie.arrayBuffer());
  if (!hasValidImageSignature(fileBytes, selfie.type)) {
    return { error: "Berkas foto tidak valid. Ambil ulang selfie Anda." };
  }

  return { fileBytes, extension };
}

async function isAttendanceRateLimited(): Promise<boolean> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return !rateLimit(`absensi:${ip}`, 15, 60 * 60 * 1000);
}

export async function absenAction(formData: FormData): Promise<AbsenResult> {
  if (await isAttendanceRateLimited()) {
    return { success: false, message: "Terlalu banyak percobaan absensi dari perangkat ini. Coba lagi nanti." };
  }

  const classId = String(formData.get("classId") ?? "");
  const studentId = String(formData.get("studentId") ?? "");
  if (!classId || !studentId) {
    return { success: false, message: "Pilih kelas dan nama siswa terlebih dahulu." };
  }
  const parsedSelfie = await parseSelfie(formData);
  if ("error" in parsedSelfie) {
    return { success: false, message: parsedSelfie.error };
  }

  const student = await prisma.student.findFirst({
    where: { id: studentId, classId },
    select: { id: true, user: { select: { name: true } } },
  });
  if (!student) {
    return { success: false, message: "Siswa tidak ditemukan pada kelas yang dipilih." };
  }

  const now = new Date();
  const wib = getWibDateParts(now);
  const attendanceDate = getAttendanceDate(wib.date);
  const existing = await prisma.attendance.findUnique({
    where: { studentId_classId_date: { studentId, classId, date: attendanceDate } },
    select: { id: true },
  });
  if (existing) {
    return { success: false, message: "Siswa ini sudah tercatat hadir hari ini." };
  }

  try {
    await purgeExpiredSelfies(wib.date);
  } catch (error) {
    console.error("Gagal membersihkan selfie kedaluwarsa:", error);
  }

  const selfiePath = `${wib.date}/${studentId}-${randomUUID()}.${parsedSelfie.extension}`;
  try {
    await saveSelfie(selfiePath, parsedSelfie.fileBytes);
  } catch (error) {
    console.error("Gagal mengunggah selfie:", error);
    return { success: false, message: "Foto selfie gagal diunggah. Coba lagi." };
  }

  try {
    await prisma.attendance.create({
      data: {
        studentId,
        classId,
        date: attendanceDate,
        status: "HADIR",
        selfieUrl: selfiePath,
        checkInAt: now,
      },
    });
  } catch (error) {
    try {
      await removeSelfie(selfiePath);
    } catch (cleanupError) {
      console.error("Gagal membersihkan selfie setelah absensi gagal:", cleanupError);
    }
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") {
      return { success: false, message: "Siswa ini sudah tercatat hadir hari ini." };
    }
    throw error;
  }

  return {
    success: true,
    message: "Absensi berhasil dicatat.",
    personName: student.user.name,
    checkInAt: wib.time,
  };
}

export async function absenGuruAction(formData: FormData): Promise<AbsenResult> {
  if (await isAttendanceRateLimited()) {
    return { success: false, message: "Terlalu banyak percobaan absensi dari perangkat ini. Coba lagi nanti." };
  }

  const teacherId = String(formData.get("teacherId") ?? "");
  if (!teacherId) {
    return { success: false, message: "Pilih nama guru terlebih dahulu." };
  }
  const parsedSelfie = await parseSelfie(formData);
  if ("error" in parsedSelfie) {
    return { success: false, message: parsedSelfie.error };
  }

  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    select: { id: true, user: { select: { name: true } } },
  });
  if (!teacher) {
    return { success: false, message: "Guru tidak ditemukan." };
  }

  const now = new Date();
  const wib = getWibDateParts(now);
  const attendanceDate = getAttendanceDate(wib.date);
  const existing = await prisma.teacherAttendance.findUnique({
    where: { teacherId_date: { teacherId, date: attendanceDate } },
    select: { id: true },
  });
  if (existing) {
    return { success: false, message: "Guru ini sudah tercatat hadir hari ini." };
  }

  try {
    await purgeExpiredSelfies(wib.date);
  } catch (error) {
    console.error("Gagal membersihkan selfie kedaluwarsa:", error);
  }

  const selfiePath = `${wib.date}/guru-${teacherId}-${randomUUID()}.${parsedSelfie.extension}`;
  try {
    await saveSelfie(selfiePath, parsedSelfie.fileBytes);
  } catch (error) {
    console.error("Gagal mengunggah selfie guru:", error);
    return { success: false, message: "Foto selfie gagal diunggah. Coba lagi." };
  }

  try {
    await prisma.teacherAttendance.create({
      data: {
        teacherId,
        date: attendanceDate,
        status: "HADIR",
        selfieUrl: selfiePath,
        checkInAt: now,
      },
    });
  } catch (error) {
    try {
      await removeSelfie(selfiePath);
    } catch (cleanupError) {
      console.error("Gagal membersihkan selfie guru setelah absensi gagal:", cleanupError);
    }
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") {
      return { success: false, message: "Guru ini sudah tercatat hadir hari ini." };
    }
    throw error;
  }

  return {
    success: true,
    message: "Absensi guru berhasil dicatat.",
    personName: teacher.user.name,
    checkInAt: wib.time,
  };
}
