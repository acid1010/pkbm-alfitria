import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";

import { demoNews } from "@/lib/demo-data";
import { runWhenDatabaseReady } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/shared/page-shell";


export default async function BeritaDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const item = await runWhenDatabaseReady(
    () => prisma.news.findUnique({ where: { slug: params.slug } }),
    demoNews.find((entry) => entry.slug === params.slug) ?? null,
  );

  if (!item) {
    notFound();
  }

  return (
    <PageShell
      title={item.title}
      description={`Dipublikasikan pada ${item.publishedAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`}
    >
      <div className="max-w-4xl mx-auto">
        <article className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-oxford-400 mb-6">
            <Calendar className="h-4 w-4" />
            <time>{item.publishedAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</time>
            <span className="mx-2 text-oxford-200">|</span>
            <span className="rounded-full bg-gold-50 px-3 py-0.5 text-xs font-semibold text-gold-700">Publikasi PKBM</span>
          </div>
          <div className="whitespace-pre-line leading-8 text-oxford-700 text-base">
            {item.content}
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm font-semibold text-oxford-700 hover:text-gold-600 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
