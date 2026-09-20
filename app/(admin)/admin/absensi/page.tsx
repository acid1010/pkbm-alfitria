import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSelfieUrl } from "@/lib/selfie-storage";

import { AttendanceManager, type AdminAttendanceRow } from "./attendance-manager";

export const dynamic = "force-dynamic";

type AdminAbsensiPageProps = {
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
  return `${new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)} WIB`;
}

export default async function AdminAbsensiPage(props: AdminAbsensiPageProps) {
  const searchParams = await props.searchParams;
  await auth();

  const classes = await prisma.class.findMany({
    select: { id: true, name: true, grade: true, year: true },
    orderBy: [{ year: "desc" }, { grade: "asc" }, { name: "asc" }],
  });
  const selectedClassId = classes.some((classItem) => classItem.id === searchParams.classId)
    ? searchParams.classId!
    : classes[0]?.id;
  const selectedDate = parseWibDate(searchParams.date ?? "") ? searchParams.date! : getTodayWib();
  const attendanceDate = parseWibDate(selectedDate);

  const selectedClass = selectedClassId && attendanceDate
    ? await prisma.class.findUnique({
        where: { id: selectedClassId },
        select: {
          id: true,
          name: true,
          year: true,
          students: {
            select: {
              id: true,
              nis: true,
              user: { select: { name: true } },
              attendances: {
                where: { date: attendanceDate },
                select: { status: true, checkInAt: true, selfieUrl: true },
              },
            },
            orderBy: { user: { name: "asc" } },
          },
        },
      })
    : undefined;

  const rows: AdminAttendanceRow[] = selectedClass?.students.map((student) => {
    const attendance = student.attendances[0];
    return {
      id: student.id,
      name: student.user.name,
      nis: student.nis,
      status: attendance?.status ?? "NONE",
      checkInAt: formatCheckIn(attendance?.checkInAt ?? null),
      selfieUrl: attendance?.selfieUrl ? getSelfieUrl(attendance.selfieUrl) : undefined,
    };
  }) ?? [];

  const teacherAttendances = attendanceDate
    ? await prisma.teacherAttendance.findMany({
        where: { date: attendanceDate },
        select: {
          status: true,
          checkInAt: true,
          selfieUrl: true,
          teacher: { select: { nip: true, user: { select: { name: true } } } },
        },
        orderBy: { checkInAt: "asc" },
      })
    : [];

  return (
    <PageShell
      title="Manajemen Absensi"
      description="Kelola rekap kehadiran seluruh kelas dan koreksi status absensi siswa."
    >
      <div className="space-y-6">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardContent className="p-6 md:p-8">
          <form className="mb-7 grid gap-4 border-b border-oxford-100 pb-6 md:grid-cols-[1fr_180px_auto]">
            <label className="text-sm font-semibold text-oxford-800">Kelas
              <select name="classId" defaultValue={selectedClassId} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>{classItem.name} · {classItem.year}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold text-oxford-800">Tanggal
              <input type="date" name="date" defaultValue={selectedDate} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm" />
            </label>
            <button type="submit" className="mt-auto h-11 rounded-xl bg-oxford-900 px-5 text-sm font-bold text-white hover:bg-oxford-800">Tampilkan</button>
          </form>

          {selectedClass ? (
            <>
              <div className="mb-5">
                <h2 className="font-heading text-xl font-bold text-oxford-950">{selectedClass.name} · {selectedClass.year}</h2>
                <p className="mt-1 text-sm text-oxford-600">Perbarui status siswa, lalu simpan perubahan.</p>
              </div>
              <AttendanceManager classId={selectedClass.id} date={selectedDate} rows={rows} />
            </>
          ) : (
            <p className="text-sm text-oxford-600">Belum ada kelas yang tersedia.</p>
          )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="mb-5">
              <h2 className="font-heading text-xl font-bold text-oxford-950">Absensi Guru</h2>
              <p className="mt-1 text-sm text-oxford-600">Selfie guru yang tercatat pada {selectedDate}.</p>
            </div>
            {teacherAttendances.length ? (
              <Table>
                <TableHeader><TableRow><TableHead>Nama Guru</TableHead><TableHead>NIP</TableHead><TableHead>Status</TableHead><TableHead>Check-in</TableHead><TableHead>Selfie</TableHead></TableRow></TableHeader>
                <TableBody>
                  {teacherAttendances.map((attendance) => {
                    const selfieUrl = attendance.selfieUrl ? getSelfieUrl(attendance.selfieUrl) : undefined;
                    return <TableRow key={`${attendance.teacher.nip}-${attendance.checkInAt?.toISOString()}`}><TableCell className="font-medium text-oxford-900">{attendance.teacher.user.name}</TableCell><TableCell>{attendance.teacher.nip}</TableCell><TableCell>{attendance.status === "HADIR" ? "Hadir" : attendance.status}</TableCell><TableCell>{formatCheckIn(attendance.checkInAt)}</TableCell><TableCell>{selfieUrl ? <a href={selfieUrl} target="_blank" rel="noreferrer" className="block h-12 w-12 overflow-hidden rounded-lg bg-oxford-100" style={{ backgroundImage: `url(${selfieUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}><span className="sr-only">Lihat selfie {attendance.teacher.user.name}</span></a> : <span className="text-oxford-400">—</span>}</TableCell></TableRow>;
                  })}
                </TableBody>
              </Table>
            ) : <p className="text-sm text-oxford-600">Belum ada absensi guru pada tanggal ini.</p>}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
