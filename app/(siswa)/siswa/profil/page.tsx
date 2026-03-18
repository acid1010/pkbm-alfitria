import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export default function SiswaProfilPage() {
  return (
    <PageShell title="Profil Siswa" description="Lihat dan perbarui data pribadi sebagai bagian dari administrasi pembelajaran resmi.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Profil Siswa</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">Lihat dan perbarui data profil pribadi.</CardContent>
      </Card>
    </PageShell>
  );
}
