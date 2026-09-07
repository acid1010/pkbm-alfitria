import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

type GuruKelasPageProps = {
  searchParams: Promise<{ classId?: string }>;
};

export default async function GuruKelasPage(props: GuruKelasPageProps) {
  const searchParams = await props.searchParams;
  const session = await auth();

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session!.user.id },
    select: { classes: { select: { id: true, name: true, year: true }, orderBy: [{ grade: "asc" }, { name: "asc" }] } },
  });
  const classes = teacher?.classes ?? [];
  const selectedClassId = classes.some((item) => item.id === searchParams.classId)
    ? searchParams.classId!
    : classes[0]?.id;

  const kelas = selectedClassId
    ? await prisma.class.findFirst({
        where: { id: selectedClassId, teacher: { userId: session!.user.id } },
        select: {
          name: true,
          year: true,
          grade: true,
          students: {
            select: {
              id: true,
              nis: true,
              phone: true,
              user: { select: { name: true, email: true } },
              _count: { select: { attendances: true, grades: true } },
            },
            orderBy: { user: { name: "asc" } },
          },
        },
      })
    : undefined;

  return (
    <PageShell
      title="Daftar Kelas"
      description="Akses roster siswa dan informasi kelas aktif untuk keperluan pembelajaran dan evaluasi."
    >
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form className="mb-7 border-b border-oxford-100 pb-6">
            <label className="text-sm font-semibold text-oxford-800">Kelas
              <select name="classId" defaultValue={selectedClassId} className="mt-2 h-11 w-full max-w-sm rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                {classes.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.year}</option>)}
              </select>
            </label>
            <button type="submit" className="mt-4 block h-11 rounded-xl bg-oxford-900 px-5 text-sm font-bold text-white hover:bg-oxford-800">Tampilkan</button>
          </form>

          {!classes.length ? (
            <p className="text-sm text-oxford-600">Belum ada kelas yang ditugaskan kepada Anda.</p>
          ) : kelas ? (
            <>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-heading text-xl text-oxford-950">
                  {kelas.name} · Tingkat {kelas.grade} · {kelas.year} · {kelas.students.length} siswa
                </CardTitle>
              </CardHeader>
              {kelas.students.length ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama siswa</TableHead>
                      <TableHead>NIS</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>No. HP</TableHead>
                      <TableHead>Absensi tercatat</TableHead>
                      <TableHead>Nilai tercatat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kelas.students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium text-oxford-900">{student.user.name}</TableCell>
                        <TableCell>{student.nis}</TableCell>
                        <TableCell>{student.user.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{student._count.attendances} hari</TableCell>
                        <TableCell>{student._count.grades} nilai</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-oxford-600">Belum ada siswa di kelas ini.</p>
              )}
            </>
          ) : null}
        </CardContent>
      </Card>
    </PageShell>
  );
}
