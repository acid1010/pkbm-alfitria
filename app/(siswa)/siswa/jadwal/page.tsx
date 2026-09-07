import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
export const dynamic = "force-dynamic";

export default async function SiswaJadwalPage() {
  const session = await auth();
  const student = await runWhenDatabaseReady(
    () =>
      prisma.student.findUnique({
        where: { userId: session!.user.id },
        select: {
          classRef: {
            select: {
              name: true,
              year: true,
              grade: true,
              teacher: { select: { user: { select: { name: true } } } },
            },
          },
        },
      }),
    null,
  );

  const subjects = student?.classRef
    ? await runWhenDatabaseReady(
        () =>
          prisma.subject.findMany({
            select: { name: true, code: true, teacher: { select: { user: { select: { name: true } } } } },
            orderBy: { name: "asc" },
          }),
        [] as { name: string; code: string; teacher: { user: { name: string } } | null }[],
      )
    : [];

  return (
    <PageShell
      title="Jadwal Mingguan"
      description="Akses jadwal pembelajaran mingguan untuk perencanaan studi yang lebih terstruktur."
    >
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-oxford-950">Kelas Anda</CardTitle>
        </CardHeader>
        <CardContent>
          {student?.classRef ? (
            <div className="space-y-1 text-sm text-oxford-700">
              <p className="font-semibold text-oxford-900">{student.classRef.name} · {student.classRef.year}</p>
              <p>Tingkat {student.classRef.grade}</p>
              <p>Wali Kelas: {student.classRef.teacher?.user.name ?? "—"}</p>
            </div>
          ) : (
            <p className="text-sm text-oxford-600">Anda belum ditempatkan di kelas manapun.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6 rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-oxford-950">Mata Pelajaran</CardTitle>
        </CardHeader>
        <CardContent>
          {student?.classRef ? (
            subjects.length ? (
              <ul className="divide-y divide-oxford-50">
                {subjects.map((subject) => (
                  <li key={subject.code} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-medium text-oxford-900">{subject.name}</span>
                    <span className="text-oxford-500">{subject.teacher?.user.name ?? "—"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-oxford-600">Belum ada mata pelajaran yang ditambahkan.</p>
            )
          ) : (
            <p className="text-sm text-oxford-600">Jadwal tersedia setelah Anda ditempatkan di kelas.</p>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
