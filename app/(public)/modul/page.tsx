import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Book, Target, Compass, Download, ArrowRight, LibraryBig, Search } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";

export const metadata = {
  title: "Portal Modul Pembelajaran - PKBM Al-Fitria",
  description: "Akses bahan ajar kesetaraan Paket A, Paket B, dan Paket C terintegrasi.",
  alternates: { canonical: "/modul" },
  openGraph: {
    title: "Portal Modul Pembelajaran PKBM Al-Fitria",
    description: "Akses bahan ajar digital kesetaraan Paket A, B, dan Paket C terintegrasi dengan kurikulum merdeka.",
    url: "/modul",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Modul Pembelajaran PKBM Al-Fitria",
    description: "Akses bahan ajar digital kesetaraan Paket A, B, dan Paket C.",
  },
};

const modules = [
  {
    id: "paket-a",
    title: "Paket A",
    subtitle: "Setara SD / MI",
    description: "Fondasi pendidikan dasar dengan kurikulum merdeka untuk mengasah kemampuan literasi dan numerasi dasar.",
    icon: Compass,
    color: "from-gold-400 to-gold-600",
    stats: "73 Modul",
  },
  {
    id: "paket-b",
    title: "Paket B",
    subtitle: "Setara SMP / MTs",
    description: "Pengembangan karakter dan pengetahuan aplikatif sebagai pijakan penting menuju kemandirian berfikir.",
    icon: Target,
    color: "from-oxford-500 to-oxford-700",
    stats: "137 Modul",
  },
  {
    id: "paket-c",
    title: "Paket C",
    subtitle: "Setara SMA / MA",
    description: "Pendidikan lanjutan komprehensif, persiapan terstruktur untuk karir profesional maupun pendidikan tinggi.",
    icon: Book,
    color: "from-oxford-800 to-oxford-950",
    stats: "249 Modul",
  },
];

export default function ModulPage() {
  return (
    <PageShell
      title="Perpustakaan Modul Pembelajaran"
      description="Dapatkan akses ke kurikulum terpadu PKBM Al-Fitria. Pilih tingkat pendidikan Anda untuk mengunduh bahan ajar."
    >
      {/* Search */}
      <div className="max-w-md mx-auto relative group mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-oxford-400 group-focus-within:text-gold-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full rounded-xl border border-oxford-200 bg-white py-3.5 pl-12 pr-6 text-oxford-900 placeholder-oxford-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-sm shadow-sm transition-shadow"
          placeholder="Cari mata pelajaran atau modul..."
        />
      </div>

      {/* Module Cards */}
      <div className="grid gap-8 md:grid-cols-3">
        {modules.map((modul) => (
          <div
            key={modul.id}
            className="bg-white rounded-2xl p-8 shadow-sm border border-oxford-100 group hover:-translate-y-1 hover:shadow-lg hover:border-gold-200 transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${modul.color} opacity-[0.06] rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`} />

            <div className="relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${modul.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                <modul.icon className="h-7 w-7" strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-2xl font-bold text-oxford-950 mb-1">
                {modul.title}
              </h3>
              <span className="inline-block px-3 py-1 rounded-md bg-oxford-50 text-oxford-600 font-bold uppercase tracking-wider text-xs mb-5">
                {modul.subtitle}
              </span>

              <p className="text-oxford-500 leading-relaxed mb-8">
                {modul.description}
              </p>
            </div>

            <div className="mt-auto pt-6 border-t border-oxford-100 flex items-center justify-between relative z-10">
              <div className="text-sm font-bold text-oxford-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> {modul.stats}
              </div>
              <Button
                asChild
                variant="ghost"
                className="rounded-full text-oxford-900 group-hover:bg-oxford-50 font-bold hover:text-gold-600 cursor-pointer"
              >
                <Link href={`/modul/${modul.id}`}>
                  Buka <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions CTA */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-oxford-900 via-oxford-900 to-oxford-800 rounded-[2rem] p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Cara Penggunaan <span className="italic text-gold-400">Portal</span>
            </h2>
            <p className="text-oxford-300 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Pilih paket pendidikan yang sesuai, klik mata pelajaran untuk melihat daftar modul PDF, lalu unduh ke perangkat Anda.
            </p>
            <Button asChild size="lg" className="bg-gold-500 text-oxford-950 hover:bg-gold-400 rounded-full h-12 px-8 font-bold shadow-[0_4px_14px_rgba(224,163,30,0.4)] transition-all duration-300 cursor-pointer">
              <Link href="/modul/paket-a">
                Mulai Belajar <Download className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
