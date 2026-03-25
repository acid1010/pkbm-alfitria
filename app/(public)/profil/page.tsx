import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/shared/page-shell";
import { Award, BookOpen, Users, Target, GraduationCap, Shield, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Sekolah",
  description:
    "Profil lengkap PKBM Al-Fitria Purwakarta — visi misi, data lembaga, akreditasi, struktur organisasi, dan tenaga pendidik sekolah kesetaraan Paket A, B, C.",
  alternates: { canonical: "/profil" },
};

const values = [
  {
    icon: Target,
    title: "Visi",
    description: "Menjadi lembaga pendidikan kesetaraan terdepan yang menghasilkan lulusan berkualitas, mandiri, dan berdaya saing di masyarakat.",
  },
  {
    icon: BookOpen,
    title: "Misi",
    description: "Menyelenggarakan pendidikan kesetaraan yang fleksibel, inklusif, dan berorientasi pada capaian belajar dengan kurikulum terkini.",
  },
  {
    icon: Users,
    title: "Tujuan",
    description: "Memberikan kesempatan pendidikan setara bagi seluruh masyarakat tanpa batasan usia, domisili, maupun latar belakang ekonomi.",
  },
];

const milestones = [
  { year: "2009", event: "PKBM Al-Fitria didirikan di Desa Wanasari, Kec. Wanayasa, Kab. Purwakarta." },
  { year: "2012", event: "Mendapat izin operasional resmi dari Dinas Pendidikan Kabupaten Purwakarta." },
  { year: "2016", event: "Terakreditasi oleh Badan Akreditasi Nasional Pendidikan Nonformal (BAN-PNF)." },
  { year: "2020", event: "Meluncurkan sistem E-Learning untuk mendukung pembelajaran daring secara nasional." },
  { year: "2024", event: "Telah meluluskan lebih dari 500 warga belajar dari berbagai penjuru Indonesia." },
];

export default function ProfilPage() {
  return (
    <PageShell
      title="Profil PKBM Al-Fitria"
      description="Lembaga pendidikan kesetaraan dengan pendekatan fleksibel, adaptif, dan berorientasi capaian belajar warga belajar."
    >
      <div className="space-y-8">
        {/* About section */}
        <div className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-8 text-oxford-700 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-oxford-900 text-gold-400 flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-oxford-900">Tentang Kami</h2>
              <p className="text-oxford-500 text-sm mt-1">Pusat Kegiatan Belajar Masyarakat</p>
            </div>
          </div>
          <div className="space-y-4 leading-relaxed">
            <p>
              <strong className="text-oxford-900">PKBM Al-Fitria</strong> adalah Pusat Kegiatan Belajar Masyarakat yang
              berlokasi di Kp. Peuntas RT 011/004, Desa Wanasari, Kecamatan Wanayasa, Kabupaten Purwakarta,
              Provinsi Jawa Barat. Sebagai lembaga pendidikan nonformal swasta, kami berkomitmen kuat memberikan
              kesempatan pendidikan yang setara bagi mereka yang mengalami kendala dalam pendidikan formal.
            </p>
            <p>
              Kami menyelenggarakan program pendidikan kesetaraan Paket A (setara SD/MI), Paket B (setara SMP/MTs),
              dan Paket C (setara SMA/MA) dengan kurikulum merdeka yang berlaku secara nasional. Ijazah yang
              kami terbitkan bersifat resmi dari Kementerian Pendidikan dan memiliki hak eligibilitas yang sama
              dengan ijazah pendidikan formal.
            </p>
            <p>
              PKBM Al-Fitria menerima pendaftaran warga belajar baru maupun pindahan dari seluruh Indonesia
              bahkan luar negeri, dengan sistem pembelajaran yang fleksibel baik secara offline maupun online.
            </p>
          </div>
        </div>

        {/* Visi, Misi, Tujuan */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item) => (
            <div key={item.title} className="rounded-2xl border border-oxford-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-oxford-900 mb-3">{item.title}</h3>
              <p className="text-oxford-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* School Identity Data */}
        <div className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-oxford-900">Data Lembaga</h2>
              <p className="text-oxford-500 text-sm mt-1">Sumber: Kemendikdasmen RI</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">NPSN</span>
              <span className="font-semibold text-oxford-800">P9999879</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Akreditasi</span>
              <span className="font-semibold text-oxford-800">C</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Status</span>
              <span className="font-semibold text-oxford-800">Swasta</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Bentuk Pendidikan</span>
              <span className="font-semibold text-oxford-800">PKBM</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Kepala Sekolah</span>
              <span className="font-semibold text-oxford-800">Eva Fitria Latifah</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Operator</span>
              <span className="font-semibold text-oxford-800">Liva Tusadiah</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Yayasan</span>
              <span className="font-semibold text-oxford-800">Yayasan Daarul Fitria Tauhid</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Kurikulum</span>
              <span className="font-semibold text-oxford-800">Paket B Merdeka</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Jumlah Guru</span>
              <span className="font-semibold text-oxford-800">4 orang</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Total Siswa</span>
              <span className="font-semibold text-oxford-800">224 (L: 135, P: 89)</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Rombongan Belajar</span>
              <span className="font-semibold text-oxford-800">8</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Ruang Kelas</span>
              <span className="font-semibold text-oxford-800">6 ruang</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Luas Tanah</span>
              <span className="font-semibold text-oxford-800">513 m&sup2;</span>
            </div>
            <div className="flex justify-between border-b border-oxford-100 pb-3">
              <span className="text-oxford-500">Penyelenggaraan</span>
              <span className="font-semibold text-oxford-800">Sehari Penuh / 3 hari</span>
            </div>
          </div>
        </div>

        {/* Struktur Organisasi & Tenaga Pendidik */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-oxford-100 bg-white overflow-hidden shadow-sm">
            <div className="relative h-[280px] md:h-[320px]">
              <Image
                src="/galeri/struktru-organisasi.jpeg"
                alt="Struktur Organisasi PKBM Al-Fitria"
                fill
                className="object-contain bg-white p-2"
              />
            </div>
            <div className="p-5 border-t border-oxford-100">
              <h3 className="font-heading text-lg font-bold text-oxford-900">Struktur Organisasi</h3>
              <p className="text-oxford-500 text-sm mt-1">Susunan kepengurusan PKBM Al-Fitria</p>
            </div>
          </div>
          <div className="rounded-2xl border border-oxford-100 bg-white overflow-hidden shadow-sm">
            <div className="relative h-[280px] md:h-[320px]">
              <Image
                src="/galeri/tenaga-pendidik.jpeg"
                alt="Tenaga Pendidik PKBM Al-Fitria"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 border-t border-oxford-100">
              <h3 className="font-heading text-lg font-bold text-oxford-900">Tenaga Pendidik</h3>
              <p className="text-oxford-500 text-sm mt-1">Tim pengajar profesional dan berpengalaman</p>
            </div>
          </div>
        </div>

        {/* Accreditation badge */}
        <div className="rounded-2xl border border-oxford-100 bg-gradient-to-r from-oxford-900 to-oxford-800 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/20 border border-gold-400/30 flex items-center justify-center shrink-0">
              <Shield className="h-8 w-8 text-gold-400" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-heading text-xl font-bold text-white mb-2">Terakreditasi & Resmi</h3>
              <p className="text-oxford-300 text-sm leading-relaxed">
                PKBM Al-Fitria (NPSN: P9999879) telah terakreditasi C oleh Badan Akreditasi Nasional Pendidikan Nonformal (BAN-PNF)
                dan terdaftar resmi di Kementerian Pendidikan Dasar dan Menengah Republik Indonesia
                di bawah naungan Yayasan Daarul Fitria Tauhid.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Award className="h-10 w-10 text-gold-400" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-oxford-900 mb-6">Sejarah Singkat</h2>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-oxford-900 text-gold-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 ? (
                    <div className="w-px h-full bg-oxford-200 mt-2" />
                  ) : null}
                </div>
                <p className="text-oxford-600 text-sm leading-relaxed pt-2.5">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
