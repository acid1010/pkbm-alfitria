import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function GuruAbsensiPage() {
  return (
    <PageShell title="Input Absensi" description="Pencatatan kehadiran kelas harian dengan format yang konsisten untuk monitoring akademik.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Input Absensi</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Input absensi harian per kelas.</CardContent>
      </Card>
    </PageShell>
  );
}
