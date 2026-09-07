import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";


export default function AdminGuruPage() {
  return (
    <PageShell title="Manajemen Guru" description="Kelola data pendidik, penugasan mata pelajaran, dan distribusi kelas mengajar.">
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader><CardTitle className="font-heading text-2xl text-oxford-950">Manajemen Guru</CardTitle></CardHeader>
        <CardContent className="text-sm text-oxford-600">CRUD guru dan assignment mata pelajaran.</CardContent>
      </Card>
    </PageShell>
  );
}
