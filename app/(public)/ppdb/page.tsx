import type { Metadata } from "next";
import { PpdbForm } from "@/app/(public)/ppdb/ppdb-form";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Pendaftaran PPDB Online",
  description:
    "Daftar Penerimaan Peserta Didik Baru (PPDB) PKBM Al-Fitria Purwakarta secara online. Program Paket A, B, C dengan biaya terjangkau dan waktu fleksibel.",
  alternates: { canonical: "/ppdb" },
};

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
