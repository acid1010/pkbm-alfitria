import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";


export default function SiswaDashboardPage() {
  return (
    <PageShell
      title="Dashboard Siswa"
      description="Lihat ringkasan kehadiran, perkembangan nilai, dan jadwal pembelajaran harian secara cepat."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Absensi</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">92%</CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Nilai Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">Matematika: 84</CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Jadwal Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">2 mata pelajaran</CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
