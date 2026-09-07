"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { AdminActionResult } from "../siswa/actions";

async function requireAdmin(): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Tidak diizinkan.");
  }
}

export async function updatePpdbStatusAction(ppdbId: string, status: "APPROVED" | "REJECTED" | "PENDING"): Promise<AdminActionResult> {
  await requireAdmin();
  const ppdb = await prisma.pPDB.findUnique({ where: { id: ppdbId } });
  if (!ppdb) {
    return { success: false, message: "Pendaftar tidak ditemukan." };
  }
  await prisma.pPDB.update({ where: { id: ppdbId }, data: { status } });
  revalidatePath("/admin/ppdb");
  return {
    success: true,
    message: `Pendaftar ${ppdb.name} (${"PPDB-" + ppdb.registrationNumber}) diperbarui ke status ${status}.`,
  };
}

export async function deletePpdbAction(ppdbId: string): Promise<AdminActionResult> {
  await requireAdmin();
  const ppdb = await prisma.pPDB.findUnique({ where: { id: ppdbId } });
  if (!ppdb) {
    return { success: false, message: "Pendaftar tidak ditemukan." };
  }
  await prisma.pPDB.delete({ where: { id: ppdbId } });
  revalidatePath("/admin/ppdb");
  return { success: true, message: `Pendaftar ${ppdb.name} berhasil dihapus.` };
}
