"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";

import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdmin, selfieBucket } from "@/lib/supabase";

type StudentOption = {
  id: string;
  name: string;
  nis: string;
};

export type AbsenResult = {
  success: boolean;
  message: string;
  studentName?: string;
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
  const expiredAttendances = await prisma.attendance.findMany({
    where: { selfieUrl: { not: null }, checkInAt: { lt: cutoff } },
    select: { id: true, selfieUrl: true },
  });
  const supabase = getSupabaseAdmin();

  for (const attendance of expiredAttendances) {
    if (!attendance.selfieUrl) {
      continue;
    }

    const { error } = await supabase.storage.from(selfieBucket).remove([attendance.selfieUrl]);
    if (!error) {
      await prisma.attendance.update({
        where: { id: attendance.id },
        data: { selfieUrl: null },
      });
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

export async function absenAction(formData: FormData): Promise<AbsenResult> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`absensi:${ip}`, 15, 60 * 60 * 1000)) {
    return { success: false, message: "Terlalu banyak percobaan absensi dari perangkat ini. Coba lagi nanti." };
  }

  const classId = String(formData.get("classId") ?? "");
  const studentId = String(formData.get("studentId") ?? "");
  const selfie = formData.get("selfie");
  if (!classId || !studentId || !(selfie instanceof File) || selfie.size === 0) {
    return { success: false, message: "Pilih kelas, nama siswa, dan ambil foto selfie terlebih dahulu." };
  }
  if (selfie.size > MAX_SELFIE_BYTES) {
    return { success: false, message: "Ukuran foto selfie maksimal 5 MB." };
  }

  const extension = allowedSelfieTypes.get(selfie.type);
  if (!extension) {
    return { success: false, message: "Foto selfie harus berformat JPG atau PNG." };
  }

  const fileBytes = new Uint8Array(await selfie.arrayBuffer());
  if (!hasValidImageSignature(fileBytes, selfie.type)) {
    return { success: false, message: "Berkas foto tidak valid. Ambil ulang selfie Anda." };
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

  const selfiePath = `${wib.date}/${studentId}-${randomUUID()}.${extension}`;
  const supabase = getSupabaseAdmin();
  const { error: uploadError } = await supabase.storage.from(selfieBucket).upload(selfiePath, fileBytes, {
    contentType: selfie.type,
    upsert: false,
  });
  if (uploadError) {
    console.error("Gagal mengunggah selfie:", uploadError);
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
    await supabase.storage.from(selfieBucket).remove([selfiePath]);
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") {
      return { success: false, message: "Siswa ini sudah tercatat hadir hari ini." };
    }
    throw error;
  }

  return {
    success: true,
    message: "Absensi berhasil dicatat.",
    studentName: student.user.name,
    checkInAt: wib.time,
  };
}
