import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function AdminSiswaPage() {
  return (
    <PageShell title="Manajemen Siswa" description="Kelola data siswa aktif, mutasi kelas, dan status akademik secara terpusat.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Manajemen Siswa</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">CRUD siswa dan assignment kelas.</CardContent>
      </Card>
    </PageShell>
  );
}
