import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<"HADIR" | "IZIN" | "SAKIT" | "ALPHA", string> = {
  HADIR: "Hadir",
  IZIN: "Izin",
  SAKIT: "Sakit",
  ALPHA: "Alpha",
};

export default async function SiswaAbsensiPage() {
  const session = await auth();
  const attendances = await runWhenDatabaseReady(
    () =>
      prisma.attendance.findMany({
        where: { student: { userId: session!.user.id } },
        select: { date: true, status: true, checkInAt: true },
        orderBy: { date: "desc" },
        take: 60,
      }),
    [] as { date: Date; status: "HADIR" | "IZIN" | "SAKIT" | "ALPHA"; checkInAt: Date | null }[],
  );

  const summary = attendances.reduce(
    (acc, item) => {
      acc[item.status] += 1;
      return acc;
    },
    { HADIR: 0, IZIN: 0, SAKIT: 0, ALPHA: 0 } as Record<"HADIR" | "IZIN" | "SAKIT" | "ALPHA", number>,
  );

  const dateFormatter = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "medium" });
  const timeFormatter = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" });

  return (
    <PageShell
      title="Rekap Absensi"
      description="Lihat catatan kehadiran lengkap sebagai dasar evaluasi kedisiplinan belajar."
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {(["HADIR", "IZIN", "SAKIT", "ALPHA"] as const).map((status) => (
          <Card key={status} className="rounded-2xl border-oxford-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-oxford-600">{STATUS_LABEL[status]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-oxford-950">{summary[status]}</p>
              <p className="text-xs text-oxford-500">dari {attendances.length} hari terakhir</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-oxford-950">Riwayat Kehadiran</CardTitle>
        </CardHeader>
        <CardContent>
          {attendances.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jam Check-in</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendances.map((attendance, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-oxford-900">{dateFormatter.format(attendance.date)}</TableCell>
                    <TableCell>{STATUS_LABEL[attendance.status]}</TableCell>
                    <TableCell>{attendance.checkInAt ? `${timeFormatter.format(attendance.checkInAt)} WIB` : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-oxford-600">Belum ada catatan kehadiran.</p>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
