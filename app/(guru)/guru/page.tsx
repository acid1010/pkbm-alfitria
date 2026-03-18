import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function GuruDashboardPage() {
  return (
    <PageShell
      title="Dashboard Guru"
      description="Pantau aktivitas mengajar harian, progres penilaian, dan pengelolaan kelas dalam satu tampilan."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Kelas Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">3 kelas aktif</CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-oxford-950">Nilai Belum Diinput</CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-semibold text-oxford-700">12 entri</CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
