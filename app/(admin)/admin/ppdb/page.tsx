import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function AdminPpdbPage() {
  return (
    <PageShell title="Review PPDB" description="Validasi berkas pendaftaran, verifikasi kelengkapan, dan finalisasi status penerimaan.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Review PPDB</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Validasi pendaftar dan ubah status PPDB.</CardContent>
      </Card>
    </PageShell>
  );
}
