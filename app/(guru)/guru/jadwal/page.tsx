import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export default async function GuruJadwalPage() {
  const session = await auth();
  const teacher = await prisma.teacher.findUnique({
    where: { userId: session!.user.id },
    select: {
      classes: { select: { name: true, year: true, grade: true, _count: { select: { students: true } } }, orderBy: [{ grade: "asc" }, { name: "asc" }] },
      subjectsTaught: { select: { name: true, code: true }, orderBy: { name: "asc" } },
    },
  });

  return (
    <PageShell
      title="Jadwal Mengajar"
      description="Lihat distribusi jadwal pembelajaran mingguan untuk memastikan alokasi waktu mengajar optimal."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Kelas Diampu (Wali Kelas)</CardTitle>
          </CardHeader>
          <CardContent>
            {teacher?.classes.length ? (
              <ul className="divide-y divide-oxford-50">
                {teacher.classes.map((kelas) => (
                  <li key={kelas.name} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium text-oxford-900">{kelas.name} · {kelas.year}</span>
                    <span className="text-oxford-500">{kelas._count.students} siswa</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-oxford-600">Anda belum menjadi wali kelas.</p>
            )}
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Mata Pelajaran Diampu</CardTitle>
          </CardHeader>
          <CardContent>
            {teacher?.subjectsTaught.length ? (
              <ul className="divide-y divide-oxford-50">
                {teacher.subjectsTaught.map((subject) => (
                  <li key={subject.code} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium text-oxford-900">{subject.name}</span>
                    <span className="text-oxford-500">{subject.code}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-oxford-600">Belum ada mata pelajaran yang ditugaskan.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
