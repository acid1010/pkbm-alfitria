import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function GuruNilaiPage() {
  return (
    <PageShell title="Input Nilai" description="Kelola penilaian siswa per mata pelajaran dengan alur input yang terstruktur dan cepat.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Input Nilai</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Input nilai per kelas dan mata pelajaran.</CardContent>
      </Card>
    </PageShell>
  );
}
