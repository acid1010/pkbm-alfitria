import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";


export default function AdminSettingsPage() {
  return (
    <PageShell title="Pengaturan Sistem" description="Konfigurasikan tahun ajaran, semester aktif, dan parameter operasional portal pendidikan.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Pengaturan Sistem</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Atur tahun ajaran, semester, dan konfigurasi portal.</CardContent>
      </Card>
    </PageShell>
  );
}
