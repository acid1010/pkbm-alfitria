import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function GuruProfilPage() {
  return (
    <PageShell title="Profil Guru" description="Kelola informasi profil profesional guru sebagai referensi akademik dan administrasi.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Profil Guru</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Lihat dan perbarui profil guru.</CardContent>
      </Card>
    </PageShell>
  );
}
