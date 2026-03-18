import Link from "next/link";
import { FileDown, ArrowUp, BookOpen } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";

export const metadata = {
  title: "Download Modul Paket A - PKBM Al-Fitria",
  description: "eModul Pendidikan Kesetaraan Setara SD/MI",
};

const BASE_URL = "https://modul.pkbm.id/paket-a";

const subjects = [
  {
    id: "bahasa-indonesia",
    title: "Bahasa Indonesia",
    description: "Modul Bahasa Indonesia untuk Paket A membantu peserta didik memahami dasar-dasar bahasa dengan pendekatan yang interaktif dan mudah dipahami.",
    modules: [
      { num: 1, title: "Indahnya Kebersamaan", file: "Modul 1 Bahasa Indonesia Paket A Indahnya Kebersamaan.pdf" },
      { num: 2, title: "Profesi dan Pekerjaan di Sekitar Kita", file: "Modul 2 Bahasa Indonesia Paket A Profesi dan Pekerjaan di Sekitar Kita.pdf" },
      { num: 3, title: "Peralatan Rumah Tangga", file: "Modul 3 Bahasa Indonesia Paket A Peralatan Rumah Tangga.pdf" },
      { num: 4, title: "Aku Gemar Membaca", file: "Modul 4 Bahasa Indonesia Paket A Aku Gemar Membaca.pdf" },
      { num: 5, title: "Katakan dengan Puisi", file: "Modul 5 Bahasa Indonesia Paket A Katakan dengan Puisi.pdf" },
      { num: 6, title: "Buku Jendela Ilmu", file: "Modul 6 Bahasa Indonesia Paket A Buku Jendela Ilmu.pdf" },
      { num: 7, title: "Kau Idolaku", file: "Modul 7 Bahasa Indonesia Paket A Kau Idolaku.pdf" },
      { num: 8, title: "Iklan Menarik Produk Laris", file: "Modul 8 Bahasa Indonesia Paket A Iklan Menarik Produk Laris.pdf" },
      { num: 9, title: "Kampung Halamanku", file: "Modul 9 Bahasa Indonesia Paket A Kampung Halamanku.pdf" },
      { num: 10, title: "Menyibak Ilmu Pengetahuan di Sekitar Kita", file: "Modul 10 Bahasa Indonesia Paket A Menyibak Ilmu Pengetahuan di Sekitar Kita.pdf" },
      { num: 11, title: "Waspada Bencana", file: "Modul 11 Bahasa Indonesia Paket A Waspada Bencana.pdf" },
      { num: 12, title: "Aku Berani Bicara di Depan Umum", file: "Modul 12 Bahasa Indonesia Paket A Aku Berani Bicara di Depan Umum.pdf" },
      { num: 13, title: "Pahlawanku dan Kebanggaanku", file: "Modul 13 Bahasa Indonesia Paket A Pahlawanku dan Kebanggaanku.pdf" },
      { num: 14, title: "Pengetahuanku Semakin Bertambah", file: "Modul 14 Bahasa Indonesia Paket A Pengetahuanku Semakin Bertambah.pdf" },
      { num: 15, title: "Peluang di Sekitar Kita", file: "Modul 15 Bahasa Indonesia Paket A Peluang di Sekitar Kita.pdf" },
    ],
  },
  {
    id: "ipa",
    title: "IPA",
    description: "Modul IPA untuk Paket A mengajarkan konsep sains dasar seperti makhluk hidup, energi, dan lingkungan, dengan pendekatan praktis untuk siswa setara SD.",
    modules: [
      { num: 1, title: "Makhluk Hidup di Sekitar Kita", file: "Modul 1 IPA Paket A Makhluk Hidup di Sekitar Kita.pdf" },
      { num: 2, title: "Siklus Hidup dan Pelestarian", file: "Modul 2 IPA Paket A Siklus Hidup dan Pelestarian.pdf" },
      { num: 3, title: "Aktif Bergerak", file: "Modul 3 IPA Paket A Aktif Bergerak.pdf" },
      { num: 4, title: "Indahnya Negeriku", file: "Modul 4 IPA Paket A Indahnya Negeriku.pdf" },
      { num: 5, title: "Energi di Sekitar Kita", file: "Modul 5 IPA Paket A Energi di Sekitar Kita.pdf" },
      { num: 6, title: "Misteri Rangka dan Tarikan Nafas Kita", file: "Modul 6 IPA Paket A Misteri Rangka dan Tarikan Nafas Kita.pdf" },
      { num: 7, title: "Darahku Lancar Tubuhku Sehat", file: "Modul 7 IPA Paket A Darahku Lancar Tubuhku Sehat.pdf" },
      { num: 8, title: "Lingkungan Hidup Kita", file: "Modul 8 IPA Paket A Lingkungan Hidup Kita.pdf" },
      { num: 9, title: "Panas Dingin", file: "Modul 9 IPA Paket A Panas Dingin.pdf" },
      { num: 10, title: "Benda-Benda di Sekitar Kita", file: "Modul 10 IPA Paket A Benda-Benda di Sekitar Kita.pdf" },
      { num: 11, title: "Bagaimana Hewan dan Tumbuhan Berkembang Biak", file: "Modul 11 IPA Paket A Bagaimana Hewan dan Tumbuhan Berkembang Biak.pdf" },
      { num: 12, title: "Yang Berubah pada Diriku", file: "Modul 12 IPA Paket A Yang Berubah pada Diriku.pdf" },
      { num: 13, title: "Bagaimana Hewan dan Tumbuhan", file: "Modul 13 IPA Paket A Bagaimana Hewan dan Tumbuhan.pdf" },
      { num: 14, title: "Mengenal Listrik di Rumah", file: "Modul 14 IPA Paket A Mengenal Listrik di Rumah.pdf" },
      { num: 15, title: "Daya Tarik antar Kutub", file: "Modul 15 IPA Paket A Daya Tarik antar Kutub.pdf" },
      { num: 16, title: "Bumi Kita dalam Tata Surya", file: "Modul 16 IPA Paket A Bumi Kita dalam Tata Surya.pdf" },
    ],
  },
  {
    id: "ips",
    title: "IPS",
    description: "Modul IPS untuk Paket A mengenalkan siswa pada keberagaman budaya, sejarah, dan lingkungan sosial di Indonesia, cocok untuk pembelajaran setara SD.",
    modules: [
      { num: 1, title: "Tak Kenal Maka Tak Sayang", file: "Modul 1 IPS Paket A Tak Kenal Maka Tak Sayang.pdf" },
      { num: 2, title: "Mendunia karena Potensi Lokal", file: "Modul 2 IPS Paket A Mendunia karena Potensi Lokal.pdf" },
      { num: 3, title: "Karya Untuk Merah Putih", file: "Modul 3 IPS Paket A Karya Untuk Merah Putih.pdf" },
      { num: 4, title: "Beda Tapi Sama", file: "Modul 4 IPS Paket A Beda Tapi Sama.pdf" },
      { num: 5, title: "Teropong Waktu", file: "Modul 5 IPS Paket A Teropong Waktu.pdf" },
      { num: 6, title: "Wajah Indonesiaku", file: "Modul 6 IPS Paket A Wajah Indonesiaku.pdf" },
      { num: 7, title: "Warna-warni Tempat Tinggalku", file: "Modul 7 IPS Paket A Warna-warni Tempat Tinggalku.pdf" },
      { num: 8, title: "Sejahtera Indonesiaku", file: "Modul 8 IPS Paket A Sejahtera Indonesiaku.pdf" },
      { num: 9, title: "Negeri dengan Seribu Pesona", file: "Modul 9 IPS Paket A Negeri dengan Seribu Pesona.pdf" },
      { num: 10, title: "Hebatnya Pahlawan Zaman Old", file: "Modul 10 IPS Paket A Hebatnya Pahlawan Zaman Old.pdf" },
      { num: 11, title: "Serumpun ASEAN", file: "Modul 11 IPS Paket A Serumpun ASEAN.pdf" },
      { num: 12, title: "Indonesia dan Modernisasi", file: "Modul 12 IPS Paket A Indonesia dan Modernisasi.pdf" },
      { num: 13, title: "Rekam Jejak Indonesia di ASEAN", file: "Modul 13 IPS Paket A Rekam Jejak Indonesia di ASEAN.pdf" },
      { num: 14, title: "Bakti Untuk Negri", file: "Modul 14 IPS Paket A Bakti Untuk Negri.pdf" },
    ],
  },
  {
    id: "matematika",
    title: "Matematika",
    description: "Modul Matematika untuk Paket A memperkenalkan konsep dasar matematika seperti berhitung dan pengukuran, disusun untuk siswa setara SD.",
    modules: [
      { num: 1, title: "Indahnya Berbagi", file: "Modul 1 Matematika Paket A Indahnya Berbagi.pdf" },
      { num: 2, title: "Sehat Berolahraga", file: "Modul 2 Matematika Paket A Sehat Berolahraga.pdf" },
      { num: 3, title: "Ragam Budaya", file: "Modul 3 Matematika Paket A Ragam Budaya.pdf" },
      { num: 4, title: "Asyiknya Bercocok Tanam", file: "Modul 4 Matematika Paket A Asyiknya Bercocok Tanam.pdf" },
      { num: 5, title: "Kesehatan Masyarakat", file: "Modul 5 Matematika Paket A Kesehatan Masyarakat.pdf" },
      { num: 6, title: "Bazar", file: "Modul 6 Matematika Paket A Bazar.pdf" },
      { num: 7, title: "Kemasan Produk", file: "Modul 7 Matematika Paket A Kemasan Produk.pdf" },
      { num: 8, title: "Seberapa Cepat Aku", file: "Modul 8 Matematika Paket A Seberapa Cepat Aku.pdf" },
      { num: 9, title: "Cantiknya Rumahku", file: "Modul 9 Matematika Paket A Cantiknya Rumahku.pdf" },
      { num: 10, title: "Sensus Penduduk", file: "Modul 10 Matematika Paket A Sensus Penduduk.pdf" },
      { num: 11, title: "Berkebun Memetik", file: "Modul 11 Matematika Paket A Berkebun Memetik.pdf" },
      { num: 12, title: "Pandai Mensyukuri Rizki", file: "Modul 12 Matematika Paket A Pandai Mensyukuri Rizki.pdf" },
      { num: 13, title: "Nikmat Menuai Hasil", file: "Modul 13 Matematika Paket A Nikmat Menuai Hasil.pdf" },
      { num: 14, title: "Menjadi Pengusaha Mandiri", file: "Modul 14 Matematika Paket A Menjadi Pengusaha Mandiri.pdf" },
      { num: 15, title: "Rahasia Benda di Sekitar Kita", file: "Modul 15 Matematika Paket A Rahasia Benda di Sekitar Kita.pdf" },
      { num: 16, title: "Meneropong Dunia", file: "Modul 16 Matematika Paket A Meneropong Dunia.pdf" },
    ],
  },
  {
    id: "ppkn",
    title: "PPKn",
    description: "Modul PPKn untuk Paket A mengajarkan nilai-nilai Pancasila, keberagaman, dan kehidupan bernegara, dirancang untuk siswa setara SD.",
    modules: [
      { num: 1, title: "Garuda di Dadaku", file: "Modul 1 PPKn Paket A Garuda di Dadaku.pdf" },
      { num: 2, title: "Harmoni dalam Kehidupan", file: "Modul 2 PPKn Paket A Harmoni dalam Kehidupan.pdf" },
      { num: 3, title: "Keberagaman di Sekitarku", file: "Modul 3 PPKn Paket A Keberagaman di Sekitarku.pdf" },
      { num: 4, title: "Keanekaragaman Budaya dalam Persatuan Indonesia", file: "Modul 4 PPKn Paket A Keanekaragaman Budaya dalam Persatuan Indonesia.pdf" },
      { num: 5, title: "Pancasila Rumah Kita", file: "Modul 5 PPKn Paket A Pancasila Rumah Kita.pdf" },
      { num: 6, title: "Indahnya Kebersamaan", file: "Modul 6 PPKn Paket A Indahnya Kebersamaan.pdf" },
      { num: 7, title: "Indonesiaku Unik", file: "Modul 7 PPKn Paket A Indonesiaku Unik.pdf" },
      { num: 8, title: "Hidup Rukun", file: "Modul 8 PPKn Paket A Hidup Rukun.pdf" },
      { num: 9, title: "Berlomba Berbuat Kebaikan", file: "Modul 9 PPKn Paket A Berlomba Berbuat Kebaikan.pdf" },
      { num: 10, title: "Hak atau Kewajiban", file: "Modul 10 PPKn Paket A Hak atau Kewajiban.pdf" },
      { num: 11, title: "Bersama Meskipun Beragam", file: "Modul 11 PPKn Paket A Bersama Meskipun Beragam.pdf" },
      { num: 12, title: "Jaga Arah Jaga Persatuan", file: "Modul 12 PPKn Paket A Jaga Arah Jaga Persatuan.pdf" },
    ],
  },
];

const totalModules = subjects.reduce((sum, sub) => sum + sub.modules.length, 0);

export default function PaketAModulPage() {
  return (
    <PageShell
      title="Download Modul Paket A"
      description={`eModul Pendidikan Kesetaraan Setara SD/MI \u2014 ${totalModules} modul dari 5 mata pelajaran. Disediakan gratis oleh Kemdikbud.`}
    >
      {/* Subject Navigation */}
      <div className="mb-10">
        <h2 className="font-heading text-xl font-bold text-oxford-900 mb-5 text-center">Daftar Mata Pelajaran</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {subjects.map((sub) => (
            <Link
              key={sub.id}
              href={`#${sub.id}`}
              className="bg-oxford-900 hover:bg-oxford-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm cursor-pointer"
            >
              {sub.title}
              <span className="ml-1.5 text-gold-400 text-xs">({sub.modules.length})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Modules by Subject */}
      <div className="space-y-10">
        {subjects.map((sub) => (
          <div key={sub.id} id={sub.id} className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-10 shadow-sm scroll-mt-32 hover:shadow-md transition-shadow duration-300">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-xl bg-oxford-900 text-gold-400 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-oxford-900 mb-2">{sub.title}</h3>
              <p className="text-oxford-500 max-w-2xl mx-auto text-sm leading-relaxed">{sub.description}</p>
              <span className="inline-block mt-2 text-xs font-semibold text-gold-600">{sub.modules.length} modul tersedia</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sub.modules.map((mod) => (
                <a
                  key={mod.num}
                  href={`${BASE_URL}/${mod.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 rounded-xl border border-oxford-100 hover:border-gold-200 hover:bg-oxford-50/50 transition-all group cursor-pointer"
                >
                  <div className="bg-oxford-900 text-gold-400 p-2.5 rounded-lg shrink-0 mr-4 shadow-sm group-hover:bg-oxford-800 transition-colors">
                    <FileDown size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-oxford-800 group-hover:text-oxford-900 transition-colors text-sm">
                      Modul {mod.num}: {mod.title}
                    </span>
                    <span className="text-xs text-oxford-400 mt-0.5">PDF Document - Klik untuk unduh</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back to top */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="#" className="flex items-center justify-center w-12 h-12 bg-gold-500 hover:bg-gold-400 text-oxford-950 rounded-full shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
          <ArrowUp size={22} />
        </Link>
      </div>
    </PageShell>
  );
}
