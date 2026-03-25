import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Award, BadgeCheck, UserCheck, MapPin, Wallet, MonitorPlay,
  Users, Clock, GraduationCap, BookOpen, ArrowRight, Phone,
  CheckCircle2, Star, Shield, ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PKBM Al-Fitria — Sekolah Kesetaraan Paket A, B, C Purwakarta",
  description:
    "PKBM Al-Fitria adalah sekolah kesetaraan terakreditasi di Purwakarta, Jawa Barat. Program Paket A (SD), Paket B (SMP), Paket C (SMA) dengan ijazah resmi negara, biaya terjangkau, dan waktu belajar fleksibel.",
  alternates: { canonical: "/" },
};

const features = [
  {
    icon: Award,
    title: "Ijazah Resmi Negara",
    description: "Ijazah Kesetaraan langsung dari Kementerian Pendidikan, bersifat resmi dengan hak eligibilitas setara ijazah SMA/SMP/SD.",
  },
  {
    icon: BadgeCheck,
    title: "Terakreditasi",
    description: "Sekolah kesetaraan resmi yang sudah terakreditasi dengan standar mutu pendidikan nasional.",
  },
  {
    icon: UserCheck,
    title: "Bebas Usia",
    description: "Tidak ada batasan usia untuk meraih pendidikan setara. Terbuka untuk semua jenjang usia.",
  },
  {
    icon: MapPin,
    title: "Bebas Domisili",
    description: "Menerima pendaftaran dari seluruh wilayah Indonesia bahkan luar negeri, khususnya secara online.",
  },
  {
    icon: Wallet,
    title: "Biaya Ringan & Bisa Dicicil",
    description: "Biaya pendidikan sangat terjangkau dan bisa dicicil agar pendidikan mudah diakses semua kalangan.",
  },
  {
    icon: MonitorPlay,
    title: "E-Learning System",
    description: "Pembelajaran daring yang nyaman dan efektif. Belajar kapan saja, di mana saja secara offline maupun online.",
  },
  {
    icon: Users,
    title: "Tutor Profesional",
    description: "Pengajar berpengalaman dan profesional membimbing Anda dalam setiap tahap perjalanan pendidikan.",
  },
  {
    icon: Clock,
    title: "Waktu Belajar Fleksibel",
    description: "Cocok bagi yang sudah bekerja. Belajar nyaman tanpa mengganggu kesibukan kerja Anda.",
  },
];

const programs = [
  {
    title: "Paket A",
    equiv: "Setara SD / MI",
    description: "Fondasi literasi dan numerasi dasar dengan kurikulum merdeka untuk pendidikan kesetaraan tingkat dasar.",
    color: "from-gold-400 to-gold-600",
    border: "border-gold-200",
    bg: "bg-gold-50",
    text: "text-gold-700",
  },
  {
    title: "Paket B",
    equiv: "Setara SMP / MTs",
    description: "Pengembangan karakter dan pengetahuan aplikatif menuju kemandirian berpikir tingkat menengah pertama.",
    color: "from-oxford-500 to-oxford-700",
    border: "border-oxford-200",
    bg: "bg-oxford-50",
    text: "text-oxford-700",
  },
  {
    title: "Paket C",
    equiv: "Setara SMA / MA",
    description: "Pendidikan lanjutan komprehensif sebagai persiapan karir profesional maupun pendidikan tinggi.",
    color: "from-oxford-800 to-oxford-950",
    border: "border-oxford-300",
    bg: "bg-oxford-100",
    text: "text-oxford-800",
  },
];

const stats = [
  { value: "224", label: "Warga Belajar" },
  { value: "4", label: "Tenaga Pengajar" },
  { value: "8", label: "Rombongan Belajar" },
  { value: "3", label: "Program Paket" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[700px] lg:min-h-[750px] flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/galeri/kegiatan.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-oxford-950/90 via-oxford-900/80 to-oxford-800/70" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-oxford-400/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-[1200px] py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-gold-300 text-sm font-semibold tracking-wide border border-white/10 mb-8">
                <Shield className="h-4 w-4" />
                Terakreditasi & Resmi
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Sekolah Pendidikan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                Kesetaraan
              </span>
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg md:text-xl text-oxford-200 mb-10 max-w-2xl leading-relaxed font-medium">
              PKBM Al-Fitria menyelenggarakan Program Kesetaraan Paket A, B, dan C
              untuk seluruh masyarakat Indonesia. Raih ijazah resmi negara dengan
              pembelajaran yang fleksibel dan terjangkau.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gold-500 hover:bg-gold-400 text-oxford-950 font-bold rounded-full px-8 h-14 text-base shadow-[0_4px_20px_rgba(224,163,30,0.3)] hover:shadow-[0_6px_28px_rgba(224,163,30,0.4)] transition-all duration-300 cursor-pointer">
                <Link href="/ppdb">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-white border-2 border-white/20 hover:bg-white/10 hover:border-white/30 rounded-full px-8 h-14 text-base font-semibold transition-all duration-300 cursor-pointer">
                <Link href="/kontak">
                  <Phone className="mr-2 h-5 w-5" />
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-in-up delay-500 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-heading font-bold text-white">{stat.value}</p>
                <p className="text-oxford-300 text-sm font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gold-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px] relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            {/* Left: Photo Collage */}
            <div className="flex justify-center">
              <div className="relative grid grid-cols-2 gap-3 animate-fade-in">
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/galeri/guru.jpeg"
                      alt="Guru PKBM Al-Fitria"
                      width={280}
                      height={200}
                      className="object-cover w-full h-[180px]"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/galeri/siswa-olahraga.jpeg"
                      alt="Kegiatan Olahraga Siswa"
                      width={280}
                      height={240}
                      className="object-cover w-full h-[220px]"
                    />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/galeri/siswa.jpeg"
                      alt="Siswa PKBM Al-Fitria"
                      width={280}
                      height={240}
                      className="object-cover w-full h-[220px]"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src="/galeri/rapat.jpeg"
                      alt="Rapat PKBM Al-Fitria"
                      width={280}
                      height={200}
                      className="object-cover w-full h-[180px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div className="max-w-2xl">
              <span className="text-gold-600 font-semibold text-sm tracking-wider uppercase">
                Pusat Kegiatan Belajar Masyarakat
              </span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-oxford-900 mt-3 mb-8 pb-8 border-b-2 border-dotted border-oxford-100">
                Pendidikan Setara untuk Semua
              </h2>

              <div className="space-y-4 text-oxford-600 leading-relaxed mb-8">
                <p>
                  <strong className="text-oxford-900">Pusat Kegiatan Belajar Masyarakat (PKBM) Al-Fitria</strong> adalah
                  sekolah kesetaraan resmi dan terakreditasi yang berlokasi di{" "}
                  <strong>Kp. Peuntas RT 011/004, Desa Wanasari, Kec. Wanayasa, Kab. Purwakarta, Jawa Barat.</strong>
                </p>
                <p>
                  Sebagai lembaga pendidikan nonformal swasta, PKBM Al-Fitria berkomitmen kuat
                  memberikan kesempatan pendidikan yang setara bagi mereka yang mengalami kendala
                  dalam pendidikan formal.
                </p>
                <p>
                  Kami menerima pendaftaran warga belajar baru maupun pindahan dari seluruh
                  nusantara dan luar negeri, khususnya yang berada di Purwakarta dan sekitarnya.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-gold-500 hover:bg-gold-400 text-oxford-950 font-bold px-8 h-12 rounded-full shadow-md transition-all duration-300 cursor-pointer">
                  <Link href="/ppdb">Daftar Sekarang</Link>
                </Button>
                <Button asChild variant="outline" className="border-oxford-200 text-oxford-700 hover:bg-oxford-50 font-semibold px-8 h-12 rounded-full transition-all duration-300 cursor-pointer">
                  <Link href="/kontak">Hubungi Kami</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-24 bg-oxford-50/50 relative">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold text-sm tracking-wider uppercase">Keunggulan Kami</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-900 mt-3">
              Kenapa PKBM Al-Fitria?
            </h2>
            <p className="text-oxford-500 mt-4 max-w-2xl mx-auto text-lg">
              Delapan alasan utama mengapa ribuan warga belajar mempercayakan pendidikan mereka kepada kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-oxford-100/80 hover:shadow-lg hover:border-gold-200 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-oxford-800 to-oxford-900 text-gold-400 flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-oxford-900 mb-3">{feature.title}</h3>
                <p className="text-oxford-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROGRAMS ═══ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold text-sm tracking-wider uppercase">Program Pendidikan</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-900 mt-3">
              Pilih Program yang Sesuai
            </h2>
            <p className="text-oxford-500 mt-4 max-w-2xl mx-auto text-lg">
              Tiga jenjang pendidikan kesetaraan dengan kurikulum terpadu dan ijazah resmi negara.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div key={prog.title} className={`rounded-2xl border ${prog.border} p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${prog.color} opacity-[0.06] rounded-bl-[80px] -mr-4 -mt-4 group-hover:scale-150 transition-transform duration-500`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${prog.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
                    <GraduationCap className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-oxford-950 mb-1">{prog.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-md ${prog.bg} ${prog.text} font-bold uppercase tracking-wider text-xs mb-5`}>
                    {prog.equiv}
                  </span>
                  <p className="text-oxford-500 leading-relaxed mb-8">{prog.description}</p>
                  <Button asChild variant="ghost" className="rounded-full text-oxford-900 hover:text-gold-600 hover:bg-oxford-50 font-bold px-0 cursor-pointer">
                    <Link href="/modul">
                      Lihat Modul <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST INDICATORS ═══ */}
      <section className="py-20 bg-oxford-50/50">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-oxford-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-oxford-900 mb-1">Legalitas Terjamin</h3>
                <p className="text-oxford-500 text-sm leading-relaxed">Terdaftar resmi di Kementerian Pendidikan dan Kebudayaan Republik Indonesia.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-oxford-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-oxford-900 mb-1">Reputasi Terpercaya</h3>
                <p className="text-oxford-500 text-sm leading-relaxed">Lebih dari 15 tahun melayani masyarakat dengan dedikasi di bidang pendidikan kesetaraan.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-oxford-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-oxford-50 text-oxford-600 flex items-center justify-center shrink-0">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-oxford-900 mb-1">Kurikulum Terkini</h3>
                <p className="text-oxford-500 text-sm leading-relaxed">Bahan ajar digital terintegrasi sesuai kurikulum merdeka yang berlaku secara nasional.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GALERI KEGIATAN ═══ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-semibold text-sm tracking-wider uppercase">Dokumentasi</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-oxford-900 mt-3">
              Galeri Kegiatan
            </h2>
            <p className="text-oxford-500 mt-4 max-w-2xl mx-auto text-lg">
              Momen-momen berharga dari kegiatan belajar mengajar dan aktivitas di PKBM Al-Fitria.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/galeri/siswa.jpeg", alt: "Siswa PKBM Al-Fitria", span: "md:col-span-2 md:row-span-2" },
              { src: "/galeri/guru.jpeg", alt: "Tenaga Pendidik" },
              { src: "/galeri/kegiatan.jpeg", alt: "Kegiatan Belajar" },
              { src: "/galeri/siswa2.jpeg", alt: "Kegiatan Siswa" },
              { src: "/galeri/rapat.jpeg", alt: "Rapat Koordinasi" },
              { src: "/galeri/siswa-olahraga.jpeg", alt: "Olahraga Siswa" },
              { src: "/galeri/visitasi.jpeg", alt: "Visitasi Akreditasi" },
              { src: "/galeri/guru2.jpeg", alt: "Guru Pengajar" },
            ].map((img) => (
              <div
                key={img.src}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span ?? ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full min-h-[180px] md:min-h-[220px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oxford-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-3 left-4 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1000px]">
          <div className="bg-gradient-to-br from-oxford-900 via-oxford-900 to-oxford-800 rounded-[2rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-oxford-400/20 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center mx-auto mb-8">
                <GraduationCap className="h-8 w-8 text-gold-400" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-5">
                Siap Memulai Perjalanan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 italic">
                  Pendidikan
                </span>{" "}
                Anda?
              </h2>
              <p className="text-oxford-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Bergabunglah dengan ratusan warga belajar lainnya di PKBM Al-Fitria.
                Pendaftaran terbuka sepanjang tahun untuk semua jenjang.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gold-500 text-oxford-950 hover:bg-gold-400 rounded-full h-14 px-10 text-base font-bold shadow-[0_4px_20px_rgba(224,163,30,0.35)] transition-all duration-300 cursor-pointer">
                  <Link href="/ppdb">
                    Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-white border-2 border-white/20 hover:bg-white/10 rounded-full h-14 px-10 text-base font-semibold transition-all duration-300 cursor-pointer">
                  <Link href="/ppdb/cek">
                    Cek Status Pendaftaran
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
