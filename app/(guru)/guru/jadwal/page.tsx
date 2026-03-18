import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function GuruJadwalPage() {
  return (
    <PageShell title="Jadwal Mengajar" description="Lihat distribusi jadwal pembelajaran mingguan untuk memastikan alokasi waktu mengajar optimal.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Jadwal Mengajar</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Jadwal mengajar guru setiap minggu.</CardContent>
      </Card>
    </PageShell>
  );
}
