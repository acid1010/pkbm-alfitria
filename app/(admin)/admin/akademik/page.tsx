import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function AdminAkademikPage() {
  return (
    <PageShell title="Data Akademik" description="Kontrol data nilai, absensi, dan progres pembelajaran untuk seluruh unit kelas.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Data Akademik</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Kelola nilai dan data absensi seluruh kelas.</CardContent>
      </Card>
    </PageShell>
  );
}
