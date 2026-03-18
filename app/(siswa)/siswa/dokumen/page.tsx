import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function SiswaDokumenPage() {
  return (
    <PageShell title="Dokumen Siswa" description="Kelola dokumen administratif siswa untuk kebutuhan surat keterangan dan arsip pembelajaran.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Dokumen Siswa</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Ajukan dan unduh surat keterangan.</CardContent>
      </Card>
    </PageShell>
  );
}
