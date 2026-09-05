import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";

import { demoNews } from "@/lib/demo-data";
import { runWhenDatabaseReady, isDatabaseConfigured } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description:
    "Berita terbaru, pengumuman, dan informasi kegiatan dari PKBM Al-Fitria Purwakarta — sekolah kesetaraan Paket A, B, C.",
  alternates: { canonical: "/berita" },
  openGraph: {
    title: "Berita & Pengumuman PKBM Al-Fitria",
    description: "Berita terbaru, pengumuman, dan informasi kegiatan dari PKBM Al-Fitria Purwakarta.",
    url: "/berita",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berita & Pengumuman PKBM Al-Fitria",
    description: "Berita terbaru dan informasi kegiatan dari PKBM Al-Fitria Purwakarta.",
  },
};

export default async function BeritaPage() {
  const news = await runWhenDatabaseReady(
    () => prisma.news.findMany({ orderBy: { publishedAt: "desc" } }),
    demoNews,
  );

  return (
    <PageShell
      title="Berita & Pengumuman"
      description="Informasi terbaru kegiatan pendidikan, agenda lembaga, dan pengumuman operasional PKBM."
      rightSlot={
        !isDatabaseConfigured ? (
          <p className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">Data demo aktif</p>
        ) : null
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {news.map((item, i) => (
          <article
            key={item.id}
            className="group rounded-2xl border border-oxford-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-gold-200 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-oxford-900 text-gold-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Newspaper className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-oxford-400 mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <time>{item.publishedAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</time>
                </div>
                <h2 className="font-heading text-lg font-bold text-oxford-900 mb-2 line-clamp-2 group-hover:text-gold-700 transition-colors duration-300">
                  <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                </h2>
                <p className="text-oxford-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {item.content.slice(0, 150)}...
                </p>
                <Link
                  href={`/berita/${item.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-oxford-700 hover:text-gold-600 transition-colors duration-300"
                >
                  Selengkapnya
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {news.length === 0 && (
        <div className="rounded-2xl border border-oxford-100 bg-white p-12 text-center shadow-sm">
          <Newspaper className="h-12 w-12 text-oxford-200 mx-auto mb-4" />
          <p className="text-oxford-500 font-medium">Belum ada berita yang dipublikasikan.</p>
        </div>
      )}
    </PageShell>
  );
}
