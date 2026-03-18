import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function SiswaJadwalPage() {
  return (
    <PageShell title="Jadwal Mingguan" description="Akses jadwal pembelajaran mingguan untuk perencanaan studi yang lebih terstruktur.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Jadwal Mingguan</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Jadwal pembelajaran siswa per hari.</CardContent>
      </Card>
    </PageShell>
  );
}
