import { PpdbForm } from "@/app/(public)/ppdb/ppdb-form";
import { PageShell } from "@/components/shared/page-shell";

export default function PpdbPage() {
  return (
    <PageShell
      title="Pendaftaran PPDB Online"
      description="Lengkapi form pendaftaran dalam 3 langkah mudah untuk bergabung menjadi peserta didik baru di PKBM Al-Fitria."
    >
      <div className="max-w-4xl mx-auto">
        <PpdbForm />
      </div>
    </PageShell>
  );
}
