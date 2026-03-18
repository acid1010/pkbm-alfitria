import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function AdminLaporanPage() {
  return (
    <PageShell title="Laporan" description="Ringkasan performa akademik dan administrasi yang siap diekspor untuk kebutuhan audit internal.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Laporan</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Ekspor data ke PDF dan Excel.</CardContent>
      </Card>
    </PageShell>
  );
}
