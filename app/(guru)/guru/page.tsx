import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowUpRight, BookOpenCheck, CalendarDays, ClipboardCheck, Users } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function GuruDashboardPage() {
  const session = await auth();
  const teacher = await prisma.teacher.findUnique({
    where: { userId: session!.user.id },
    select: {
      _count: { select: { classes: true, subjectsTaught: true } },
      classes: {
        select: { _count: { select: { students: true } } },
      },
    },
  });

  const classCount = teacher?._count.classes ?? 0;
  const subjectCount = teacher?._count.subjectsTaught ?? 0;
  const studentCount = teacher?.classes.reduce((sum, kelas) => sum + kelas._count.students, 0) ?? 0;

  return (
    <PageShell variant="portal"
      title={`Selamat datang, ${session?.user.name ?? "Guru"}`}
      description="Semua yang Anda perlukan untuk mengajar, mencatat, dan memantau siswa ada di sini."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[{ label: "Kelas diampu", value: classCount, unit: "kelas" }, { label: "Mata pelajaran", value: subjectCount, unit: "mapel" }, { label: "Siswa dibimbing", value: studentCount, unit: "siswa" }].map((item, index) => (
          <Card key={item.label} className="relative overflow-hidden rounded-xl border-oxford-100 bg-white shadow-none">
            <span className={`absolute inset-y-0 left-0 w-1 ${index === 1 ? "bg-gold-500" : "bg-oxford-600"}`} aria-hidden="true" />
            <CardHeader className="pb-1 pl-6"><CardTitle className="text-sm font-semibold text-oxford-600">{item.label}</CardTitle></CardHeader>
            <CardContent className="pl-6"><span className="text-4xl font-bold tracking-tight text-oxford-950">{item.value}</span><span className="ml-2 text-sm text-oxford-500">{item.unit}</span></CardContent>
          </Card>
        ))}
      </div>

      <section aria-labelledby="teacher-actions-title">
        <div className="mb-3 flex items-end justify-between">
          <div><h2 id="teacher-actions-title" className="text-lg font-bold text-oxford-950">Mulai pekerjaan</h2><p className="mt-1 text-sm text-oxford-500">Akses tugas mengajar yang paling sering digunakan.</p></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: "/guru/kelas", label: "Buka data kelas", detail: "Lihat daftar siswa di kelas Anda", icon: Users },
            { href: "/guru/nilai", label: "Input nilai", detail: "Catat hasil evaluasi siswa", icon: BookOpenCheck },
            { href: "/guru/absensi", label: "Rekap absensi", detail: "Pantau kehadiran siswa", icon: ClipboardCheck },
            { href: "/guru/jadwal", label: "Lihat jadwal", detail: "Periksa pembagian kelas dan mapel", icon: CalendarDays },
          ].map((action) => (
            <Link key={action.href} href={action.href} className="group flex items-center gap-4 rounded-xl border border-oxford-100 bg-white p-4 transition-colors hover:border-oxford-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-oxford-50 text-oxford-700"><action.icon className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block font-semibold text-oxford-950">{action.label}</span><span className="block text-sm text-oxford-500">{action.detail}</span></span>
              <ArrowUpRight className="h-4 w-4 text-oxford-300 transition-colors group-hover:text-gold-600" />
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
