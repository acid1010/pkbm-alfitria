import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";


export default function GuruKelasPage() {
  return (
    <PageShell title="Daftar Kelas" description="Akses roster siswa dan informasi kelas aktif untuk keperluan pembelajaran dan evaluasi.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Daftar Kelas</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Lihat roster siswa per kelas.</CardContent>
      </Card>
    </PageShell>
  );
}
