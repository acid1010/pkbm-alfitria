import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
export const dynamic = "force-dynamic";

export default async function GuruDashboardPage() {
  const session = await auth();
  const teacher = await runWhenDatabaseReady(
    () =>
      prisma.teacher.findUnique({
        where: { userId: session!.user.id },
        select: {
          _count: { select: { classes: true, subjectsTaught: true } },
          classes: {
            select: { _count: { select: { students: true } } },
          },
        },
      }),
    null,
  );

  const classCount = teacher?._count.classes ?? 0;
  const subjectCount = teacher?._count.subjectsTaught ?? 0;
  const studentCount = teacher?.classes.reduce((sum, kelas) => sum + kelas._count.students, 0) ?? 0;

  return (
    <PageShell
      title="Dashboard Guru"
      description="Pantau aktivitas mengajar harian, progres penilaian, dan pengelolaan kelas dalam satu tampilan."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Kelas Diampu</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">{classCount} kelas</CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Mata Pelajaran</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">{subjectCount} mapel</CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Total Siswa</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">{studentCount} siswa</CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
