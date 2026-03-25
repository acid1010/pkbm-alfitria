import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Users, BookOpen, ChevronRight } from "lucide-react";

import { demoPrograms } from "@/lib/demo-data";
import { runWhenDatabaseReady, isDatabaseConfigured } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Program Pendidikan",
  description:
    "Program pendidikan kesetaraan Paket A (SD), Paket B (SMP), Paket C (SMA) di PKBM Al-Fitria Purwakarta dengan kurikulum merdeka dan ijazah resmi negara.",
  alternates: { canonical: "/program" },
};

const gradeIcons: Record<number, typeof GraduationCap> = {
  1: BookOpen,
  2: Users,
  3: GraduationCap,
};

const gradeColors: Record<number, { icon: string; border: string; badge: string }> = {
  1: {
    icon: "bg-gold-50 text-gold-600",
    border: "border-gold-200 hover:border-gold-300",
    badge: "bg-gold-50 text-gold-700",
  },
  2: {
    icon: "bg-oxford-100 text-oxford-700",
    border: "border-oxford-200 hover:border-oxford-300",
    badge: "bg-oxford-50 text-oxford-700",
  },
  3: {
    icon: "bg-oxford-900 text-gold-400",
    border: "border-oxford-300 hover:border-gold-200",
    badge: "bg-oxford-900 text-gold-300",
  },
};

function getGradeLabel(grade: number): string {
  switch (grade) {
    case 1: return "Paket A (Setara SD)";
    case 2: return "Paket B (Setara SMP)";
    case 3: return "Paket C (Setara SMA)";
    default: return `Grade ${grade}`;
  }
}

export default async function ProgramPage() {
  const classes = await runWhenDatabaseReady(
    () => prisma.class.findMany({ orderBy: { grade: "asc" } }),
    demoPrograms.map((item, index) => ({ ...item, id: `demo-program-${index}` })),
  );

  return (
    <PageShell
      title="Program Pembelajaran"
      description="Eksplorasi program pendidikan kesetaraan Paket A, B, dan C dengan struktur kurikulum terarah."
      rightSlot={
        !isDatabaseConfigured ? (
          <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Data demo aktif
          </p>
        ) : null
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {classes.map((item) => {
          const colors = gradeColors[item.grade] ?? gradeColors[1];
          const Icon = gradeIcons[item.grade] ?? GraduationCap;

          return (
            <div
              key={item.id}
              className={`group rounded-2xl border bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 ${colors.border}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 ${colors.icon}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-oxford-900 mb-1">{item.name}</h3>
                  <span className={`inline-block rounded-md px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider mb-3 ${colors.badge}`}>
                    {getGradeLabel(item.grade)}
                  </span>
                  <p className="text-oxford-500 text-sm leading-relaxed">
                    Tahun Ajaran {item.year}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-oxford-100">
                <Link
                  href="/modul"
                  className="inline-flex items-center text-sm font-semibold text-oxford-700 hover:text-gold-600 transition-colors duration-300"
                >
                  Lihat Modul Pembelajaran
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {classes.length === 0 && (
        <div className="rounded-2xl border border-oxford-100 bg-white p-12 text-center shadow-sm">
          <GraduationCap className="h-12 w-12 text-oxford-200 mx-auto mb-4" />
          <p className="text-oxford-500 font-medium">Belum ada program yang terdaftar.</p>
        </div>
      )}
    </PageShell>
  );
}
