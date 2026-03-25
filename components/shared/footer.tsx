import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { href: "/program", label: "Program Studi" },
  { href: "/modul", label: "Portal Modul" },
  { href: "/ppdb", label: "Pendaftaran Siswa Baru" },
  { href: "/berita", label: "Berita & Pengumuman" },
  { href: "/kontak", label: "Hubungi Kami" },
];

const programLinks = [
  { href: "/modul", label: "Paket A (SD/MI)" },
  { href: "/modul", label: "Paket B (SMP/MTs)" },
  { href: "/modul", label: "Paket C (SMA/MA)" },
];

export function Footer() {
  return (
    <footer className="bg-oxford-950 text-white mt-auto font-sans relative overflow-hidden">
      {/* Gold accent bar */}
      <div className="h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300" />

      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className="container mx-auto px-6 lg:px-12 max-w-[1200px] relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image
                src="/logo.png"
                alt="Logo PKBM Al-Fitria"
                width={44}
                height={49}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div>
                <span className="block font-heading text-lg font-bold tracking-tight leading-tight">
                  PKBM Al-Fitria
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-oxford-400">
                  Pendidikan Kesetaraan
                </span>
              </div>
            </Link>
            <p className="text-oxford-400 text-sm leading-relaxed mb-6">
              Pusat Kegiatan Belajar Masyarakat yang menyelenggarakan Program
              Kesetaraan Paket A, B, dan C. Terakreditasi dan resmi terdaftar
              di Kementerian Pendidikan.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-10 h-10 rounded-full bg-oxford-800 hover:bg-gold-500 hover:text-oxford-950 flex items-center justify-center text-oxford-400 transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-oxford-800 hover:bg-gold-500 hover:text-oxford-950 flex items-center justify-center text-oxford-400 transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-oxford-800 hover:bg-gold-500 hover:text-oxford-950 flex items-center justify-center text-oxford-400 transition-all duration-300" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-6">
              Tautan Penting
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-oxford-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 text-oxford-600 group-hover:text-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-6">
              Program Kami
            </h4>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-oxford-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 text-oxford-600 group-hover:text-gold-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-6">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-oxford-500" />
                <span className="text-oxford-400 text-sm leading-relaxed">
                  Kp. Peuntas RT 011/004, Desa Wanasari, Kec. Wanayasa, Kab. Purwakarta, Jawa Barat
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-oxford-500" />
                <span className="text-oxford-400 text-sm">info@pkbmalfitria.sch.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-oxford-500" />
                <span className="text-oxford-400 text-sm">0878-0531-2348</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-oxford-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-oxford-500 text-sm">
            &copy; {new Date().getFullYear()} PKBM Al-Fitria. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-oxford-500 text-sm">
            <Link href="/profil" className="hover:text-white transition-colors">Tentang Kami</Link>
            <Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
