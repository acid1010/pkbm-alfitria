import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelfieFilePath, readSelfie } from "@/lib/selfie-storage";
import path from "node:path";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
};

export async function GET(
  _request: Request,
  props: { params: Promise<{ path: string[] }> },
) {
  const session = await auth();
  const role = session?.user?.role;
  const userId = session?.user?.id;
  if ((role !== "GURU" && role !== "ADMIN") || !userId) {
    return Response.json({ message: "Tidak diizinkan." }, { status: 403 });
  }

  const { path: pathSegments } = await props.params;
  const selfiePath = pathSegments.join("/");
  try {
    getSelfieFilePath(selfiePath);
  } catch {
    return Response.json({ message: "Path selfie tidak valid." }, { status: 400 });
  }

  const studentAttendance = await prisma.attendance.findFirst({
    where: {
      selfieUrl: selfiePath,
      ...(role === "GURU" ? { class: { teacher: { userId } } } : {}),
    },
    select: { selfieUrl: true },
  });
  const teacherAttendance = role === "ADMIN"
    ? await prisma.teacherAttendance.findFirst({ where: { selfieUrl: selfiePath }, select: { selfieUrl: true } })
    : null;
  if (!studentAttendance && !teacherAttendance) {
    return Response.json({ message: "Selfie tidak ditemukan." }, { status: 404 });
  }

  try {
    const file = await readSelfie(selfiePath);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentTypes[path.extname(selfiePath).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "private, no-store",
        "Content-Disposition": `inline; filename="${path.basename(selfiePath)}"`,
      },
    });
  } catch {
    return Response.json({ message: "Berkas selfie tidak ditemukan." }, { status: 404 });
  }
}
