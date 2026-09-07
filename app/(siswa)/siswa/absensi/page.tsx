import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";


export default function SiswaAbsensiPage() {
  return (
    <PageShell title="Rekap Absensi" description="Lihat catatan kehadiran lengkap sebagai dasar evaluasi kedisiplinan belajar.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Rekap Absensi</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Status hadir, izin, sakit, alpha.</CardContent>
      </Card>
    </PageShell>
  );
}
