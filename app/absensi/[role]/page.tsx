import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AbsenForm } from "@/app/absensi/absen-form";
import { GuruAbsenForm } from "@/app/absensi/guru-absen-form";
import { getGuruOptions } from "@/app/absensi/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Absensi Mandiri",
  robots: { index: false, follow: false },
};

export default async function AbsensiRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (role !== "murid" && role !== "guru") {
    notFound();
  }

  const classes = role === "murid"
    ? await prisma.class.findMany({
        select: { id: true, name: true, grade: true, year: true },
        orderBy: [{ grade: "asc" }, { name: "asc" }],
      })
    : [];
  const teachers = role === "guru" ? await getGuruOptions() : [];

  return (
    <main className="min-h-screen bg-oxford-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-600">PKBM Al-Fitria</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-oxford-950">Absensi {role === "guru" ? "Guru" : "Murid"}</h1>
          <p className="mt-3 text-oxford-600">Pilih data Anda lalu ambil selfie untuk mencatat kehadiran hari ini.</p>
        </div>
        {role === "guru" ? <GuruAbsenForm teachers={teachers} /> : <AbsenForm classes={classes} />}
      </div>
    </main>
  );
}
