import type { Metadata } from "next";
import { PpdbForm } from "@/app/(public)/ppdb/ppdb-form";
import { PageShell } from "@/components/shared/page-shell";


export const metadata: Metadata = {
  title: "Pendaftaran PPDB Online",
  description:
    "Daftar Penerimaan Peserta Didik Baru (PPDB) PKBM Al-Fitria Purwakarta secara online. Program Paket A, B, C dengan biaya terjangkau dan waktu fleksibel.",
  alternates: { canonical: "/ppdb" },
  openGraph: {
    title: "Pendaftaran PPDB PKBM Al-Fitria — Sekolah Kesetaraan Purwakarta",
    description:
      "Daftar online sekarang! Bebas usia & domisili, biaya terjangkau bisa dicicil, pembelajaran online & offline, ijazah resmi negara.",
    url: "/ppdb",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/ppdb/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pendaftaran PPDB PKBM Al-Fitria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pendaftaran PPDB PKBM Al-Fitria",
    description: "Daftar online sekarang! Bebas usia & domisili, biaya terjangkau, ijazah resmi negara.",
    images: ["/ppdb/opengraph-image"],
  },
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
