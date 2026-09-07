import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";


export default function SiswaNilaiPage() {
  return (
    <PageShell title="Nilai Siswa" description="Pantau perkembangan capaian belajar pada setiap mata pelajaran dan semester.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Nilai Siswa</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Tabel nilai per mata pelajaran dan semester.</CardContent>
      </Card>
    </PageShell>
  );
}
