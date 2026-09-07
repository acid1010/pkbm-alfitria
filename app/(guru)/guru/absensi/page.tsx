import { ExternalLink } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSupabaseAdmin, selfieBucket } from "@/lib/supabase";


export const dynamic = "force-dynamic";

type GuruAbsensiPageProps = {
  searchParams: Promise<{ classId?: string; date?: string }>;
};

function getTodayWib(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function parseWibDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00+07:00`);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

function formatCheckIn(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default async function GuruAbsensiPage(props: GuruAbsensiPageProps) {
  const searchParams = await props.searchParams;
  const session = await auth();
  const teacher = await prisma.teacher.findUnique({
    where: { userId: session!.user.id },
    select: { classes: { select: { id: true, name: true, grade: true, year: true }, orderBy: [{ grade: "asc" }, { name: "asc" }] } },
  });
  const classes = teacher?.classes ?? [];
  const selectedClassId = classes.some((classItem) => classItem.id === searchParams.classId) ? searchParams.classId! : classes[0]?.id;
  const selectedDate = parseWibDate(searchParams.date ?? "") ? searchParams.date! : getTodayWib();
  const attendanceDate = parseWibDate(selectedDate);

  const selectedClass = selectedClassId && attendanceDate
    ? await prisma.class.findFirst({
        where: { id: selectedClassId, teacher: { userId: session!.user.id } },
        select: {
          students: {
            select: {
              id: true,
              nis: true,
              user: { select: { name: true } },
              attendances: { where: { date: attendanceDate }, select: { status: true, checkInAt: true, selfieUrl: true } },
            },
            orderBy: { user: { name: "asc" } },
          },
        },
      })
    : undefined;

  const selfiePaths = selectedClass?.students.flatMap((student) => student.attendances[0]?.selfieUrl ? [student.attendances[0].selfieUrl] : []) ?? [];
  const signedUrls = new Map<string, string>();
  if (selfiePaths.length) {
    const { data } = await getSupabaseAdmin().storage.from(selfieBucket).createSignedUrls(selfiePaths, 60 * 60);
    data?.forEach((item) => {
      if (item.path && item.signedUrl) signedUrls.set(item.path, item.signedUrl);
    });
  }

  return (
    <PageShell title="Rekap Absensi" description="Pantau kehadiran mandiri siswa dan bukti selfie per kelas.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form className="mb-7 grid gap-4 border-b border-oxford-100 pb-6 md:grid-cols-[1fr_180px_auto]">
            <label className="text-sm font-semibold text-oxford-800">Kelas
              <select name="classId" defaultValue={selectedClassId} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                {classes.map((classItem) => <option key={classItem.id} value={classItem.id}>{classItem.name} · {classItem.year}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-oxford-800">Tanggal
              <input type="date" name="date" defaultValue={selectedDate} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm" />
            </label>
            <button type="submit" className="mt-auto h-11 rounded-xl bg-oxford-900 px-5 text-sm font-bold text-white hover:bg-oxford-800">Tampilkan</button>
          </form>

          {!classes.length ? <p className="text-sm text-oxford-600">Belum ada kelas yang ditugaskan kepada Anda.</p> : null}
          {selectedClass ? (
            <Table>
              <TableHeader><TableRow><TableHead>Nama siswa</TableHead><TableHead>Status</TableHead><TableHead>Jam check-in</TableHead><TableHead>Selfie</TableHead></TableRow></TableHeader>
              <TableBody>
                {selectedClass.students.map((student) => {
                  const attendance = student.attendances[0];
                  const selfieUrl = attendance?.selfieUrl ? signedUrls.get(attendance.selfieUrl) : undefined;
                  return <TableRow key={student.id}><TableCell><p className="font-medium text-oxford-900">{student.user.name}</p><p className="text-xs text-oxford-500">{student.nis}</p></TableCell><TableCell>{attendance?.status ?? "Belum hadir"}</TableCell><TableCell>{formatCheckIn(attendance?.checkInAt ?? null)}</TableCell><TableCell>{selfieUrl ? <a href={selfieUrl} target="_blank" rel="noreferrer" className="block h-12 w-12 overflow-hidden rounded-lg bg-oxford-100" style={{ backgroundImage: `url(${selfieUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}><span className="sr-only">Lihat selfie {student.user.name}</span></a> : <span className="text-oxford-400">—</span>}</TableCell></TableRow>;
                })}
              </TableBody>
            </Table>
          ) : null}
          {selectedClass && !selectedClass.students.length ? <p className="py-4 text-sm text-oxford-600">Belum ada siswa di kelas ini.</p> : null}
          <p className="mt-5 flex items-center gap-1 text-xs text-oxford-500"><ExternalLink className="h-3 w-3" /> Selfie dapat dibuka selama satu jam dari halaman ini.</p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
