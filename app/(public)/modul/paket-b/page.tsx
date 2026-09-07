import Link from "next/link";
import { FileDown, ArrowUp, BookOpen } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";


export const metadata = {
  title: "Download Modul Paket B - PKBM Al-Fitria",
  description: "eModul Pendidikan Kesetaraan Setara SMP/MTs",
};

const BASE_URL = "https://modul.pkbm.id/paket-b";

const subjects = [
  {
    id: "bahasa-indonesia",
    title: "Bahasa Indonesia",
    description: "Modul Bahasa Indonesia untuk Paket B membantu peserta didik memahami bahasa Indonesia dengan pendekatan yang interaktif dan mudah dipahami, setara SMP.",
    modules: [
      { num: 1, title: "Indahnya Negeriku", file: "Modul 1 Bahasa Indonesia Paket B Indahnya Negeriku.pdf" },
      { num: 2, title: "Asyiknya Membuat Cerita", file: "Modul 2 Bahasa Indonesia Paket B Asyiknya Membuat Cerita.pdf" },
      { num: 3, title: "Warisan Budaya Indonesia", file: "Modul 3 Bahasa Indonesia Paket B Warisan Budaya Indonesia.pdf" },
      { num: 4, title: "Aku Jadi Tahu", file: "Modul 4 Bahasa Indonesia Paket B Aku Jadi Tahu.pdf" },
      { num: 5, title: "Berkorespondensi yang Baik", file: "Modul 5 Bahasa Indonesia Paket B Berkorespondensi yang Baik.pdf" },
      { num: 6, title: "Mencari Informasi Terkini", file: "Modul 6 Bahasa Indonesia Paket B Mencari Informasi Terkini.pdf" },
      { num: 7, title: "Lestari Alamku", file: "Modul 7 Bahasa Indonesia Paket B Lestari Alamku.pdf" },
      { num: 8, title: "Mengapa Bisa Begitu", file: "Modul 8 Bahasa Indonesia Paket B Mengapa Bisa Begitu.pdf" },
      { num: 9, title: "Kupas Tuntas Karya Sastra", file: "Modul 9 Bahasa Indonesia Paket B Kupas Tuntas Karya Sastra.pdf" },
      { num: 10, title: "Berkomunikasi Persuasif", file: "Modul 10 Bahasa Indonesia Paket B Berkomunikasi Persuasif.pdf" },
      { num: 11, title: "Ungkapkan Perasaan Melalui Puisi", file: "Modul 11 Bahasa Indonesia Paket B Ungkapkan Perasaan Melalui Puisi.pdf" },
      { num: 12, title: "Aku Coba Aku Bisa", file: "Modul 12 Bahasa Indonesia Paket B Aku Coba Aku Bisa.pdf" },
      { num: 13, title: "Lingkungan Bersih Masyarakat Sehat", file: "Modul 13 Bahasa Indonesia Paket B Lingkungan Bersih Masyarakat Sehat.pdf" },
      { num: 14, title: "Ceritaku Ceritamu", file: "Modul 14 Bahasa Indonesia Paket B Ceritaku Ceritamu.pdf" },
      { num: 15, title: "Diskusi Menggapai Demokrasi", file: "Modul 15 Bahasa Indonesia Paket B Diskusi Menggapai Demokrasi.pdf" },
      { num: 16, title: "Narasi Literasi", file: "Modul 16 Bahasa Indonesia Paket B Narasi Literasi.pdf" },
    ],
  },
  {
    id: "bahasa-inggris",
    title: "Bahasa Inggris",
    description: "Modul Bahasa Inggris untuk Paket B membantu peserta didik menguasai dasar-dasar bahasa Inggris dengan materi yang relevan untuk tingkat SMP.",
    modules: [
      { num: 1, title: "Getting Acquaintan", file: "Modul 1 Bahasa Inggris Paket B Getting Acquaintan.pdf" },
      { num: 2, title: "Lets Start The Day", file: "Modul 2 Bahasa Inggris Paket B Lets Star The Day.pdf" },
      { num: 3, title: "My Lovely Friends", file: "Modul 3 Bahasa Inggris Paket B My Lovely Friends.pdf" },
      { num: 4, title: "See Wonderful", file: "Modul 4 Bahasa Inggris Paket B See Wonderful.pdf" },
      { num: 5, title: "Attention Please", file: "Modul 5 Bahasa Inggris Paket B Attention Please.pdf" },
      { num: 6, title: "Holiday Mode On", file: "Modul 6 Bahasa Inggris Paket B Holiday Mode On.pdf" },
      { num: 7, title: "People \u2013 Birds", file: "Modul 7 Bahasa Inggris Paket B People \u2013 Birds.pdf" },
      { num: 8, title: "Something\u2019s Gonna", file: "Modul 8 Bahasa Inggris Paket B Something\u2019s Gonna.pdf" },
      { num: 9, title: "The Most Lovely Experience", file: "Modul 9 Bahasa Inggris Paket B The Most Lovely Experience.pdf" },
      { num: 10, title: "Excited Life", file: "Modul 10 Bahasa Inggris Paket B Excited Life.pdf" },
      { num: 11, title: "Apreciation", file: "Modul 11 Bahasa Inggris Paket B Apreciation.pdf" },
      { num: 12, title: "Step by Step", file: "Modul 12 Bahasa Inggris Paket B Step by Step.pdf" },
      { num: 13, title: "Time after Time", file: "Modul 13 Bahasa Inggris Paket B Time after Time.pdf" },
      { num: 14, title: "Once Upon a Time", file: "Modul 14 Bahasa Inggris Paket B Once Upon a Time.pdf" },
      { num: 15, title: "Rainbow", file: "Modul 15 Bahasa Inggris Paket B Rainbow.pdf" },
    ],
  },
  {
    id: "ipa",
    title: "IPA",
    description: "Modul IPA untuk Paket B mengajarkan konsep sains dasar seperti makhluk hidup, energi, dan lingkungan, dengan pendekatan praktis untuk siswa setara SMP.",
    modules: [
      { num: 1, title: "Pengukuran", file: "Modul 1 IPA Paket B Pengukuran.pdf" },
      { num: 2, title: "Makhluk dan Benda di Sekitar Kita", file: "Modul 2 IPA Paket B Makhluk dan Benda di Sekitar Kita.pdf" },
      { num: 3, title: "Suhu Kalor dan Energi di Sekitarmu", file: "Modul 3 IPA Paket B Suhu Kalor dan Energi di Sekitarmu.pdf" },
      { num: 4, title: "Organisasi Kehidupan", file: "Modul 4 IPA Paket B Organisasi Kehidupan.pdf" },
      { num: 5, title: "Bumiku Semakin Tua", file: "Modul 5 IPA Paket B Bumiku Semakin Tua.pdf" },
      { num: 6, title: "Buana Yang Indah", file: "Modul 6 IPA Paket B Buana Yang Indah.pdf" },
      { num: 7, title: "Gerak Dalam Kehidupan", file: "Modul 7 IPA Paket B Gerak Dalam Kehidupan.pdf" },
      { num: 8, title: "Kenali Lebih Jauh Tentang Tumbuhan", file: "Modul 8 IPA Paket B Kenali Lebih Jauh Tentang Tumbuhan.pdf" },
      { num: 9, title: "Transportasi pada Tubuh Makhluk Hidup", file: "Modul 9 IPA Paket B Transportasi pada Tubuh Makhluk Hidup.pdf" },
      { num: 10, title: "Sejahtera Raga di Kehidupanku", file: "Modul 10 IPA Paket B Sejahtera Raga di Kehidupanku.pdf" },
      { num: 11, title: "Harmoni dalam Keberagaman", file: "Modul 11 IPA Paket B Harmoni dalam Keberagaman.pdf" },
      { num: 12, title: "Reproduksi pada Makhluk Hidup", file: "Modul 12 IPA Paket B Reproduksi pada Makhluk Hidup.pdf" },
      { num: 13, title: "Listrik dalam Kehidupan Sehari-hari", file: "Modul 13 IPA Paket B Listrik dalam Kehidupan Sehari-hari.pdf" },
      { num: 14, title: "Menolak Yang Sejenis", file: "Modul 14 IPA Paket B Menolak Yang Sejenis.pdf" },
      { num: 15, title: "Memanfaatkan Benda yang Tak Kasat Mata", file: "Modul 15 IPA Paket B Memanfaatkan Benda yang Tak Kasat Mata.pdf" },
      { num: 16, title: "Rekayasa Teknologi", file: "Modul 16 IPA Paket B Rekayasa Teknologi.pdf" },
    ],
  },
  {
    id: "ips",
    title: "IPS",
    description: "Modul IPS untuk Paket B mengenalkan siswa pada keberagaman budaya, sejarah, dan lingkungan sosial di Indonesia, cocok untuk pembelajaran setara SMP.",
    modules: [
      { num: 1, title: "Indonesia Kaya", file: "Modul 1 IPS Paket B Indonesia Kaya.pdf" },
      { num: 2, title: "Antara Aku dan Indonesia", file: "Modul 2 IPS Paket B Antara Aku dan Indonesia.pdf" },
      { num: 3, title: "Bersahabat Menuju Prestasi", file: "Modul 3 IPS Paket B Bersahabat Menuju Prestasi.pdf" },
      { num: 4, title: "Kebutuhan dan Peluangku untuk Sejahtera", file: "Modul 4 IPS Paket B Kebutuhan dan Peluangku untuk Sejahtera.pdf" },
      { num: 5, title: "Cikal Bakal Kebudayaan Masyarakat Indonesia", file: "Modul 5 IPS Paket B Cikal Bakal Kebudayaan Masyarakat Indonesia.pdf" },
      { num: 6, title: "Wajah Asean", file: "Modul 6 IPS Paket B Wajah Asean.pdf" },
      { num: 7, title: "Indahnya Pluralitas di ASEAN", file: "Modul 7 IPS Paket B Indahnya Pluralitas di ASEAN.pdf" },
      { num: 8, title: "Bersama Kita Tangguh", file: "Modul 8 IPS Paket B Bersama Kita Tangguh.pdf" },
      { num: 9, title: "Belajar Bijak dari Masa Kelam Imperialisme Barat", file: "Modul 9 IPS Paket B Belajar Bijak dari Masa Kelam Imperialisme Barat.pdf" },
      { num: 10, title: "Kebangkitan Semangat Laskar Merdeka", file: "Modul 10 IPS Paket B Kebangkitan Semangat Laskar Merdeka.pdf" },
      { num: 11, title: "Dimana Kita", file: "Modul 11 IPS Paket B Dimana Kita.pdf" },
      { num: 12, title: "Dunia Dalam Genggamanku", file: "Modul 12 IPS Paket B Dunia Dalam Genggamanku.pdf" },
      { num: 13, title: "Saling Melengkapi", file: "Modul 13 IPS Paket B Saling Melengkapi.pdf" },
      { num: 14, title: "Tiada Negara Dapat Hidup Sendiri", file: "Modul 14 IPS Paket B Tiada Negara Dapat Hidup Sendiri.pdf" },
      { num: 15, title: "Tanah Airku", file: "Modul 15 IPS Paket B Tanah Airku.pdf" },
    ],
  },
  {
    id: "matematika",
    title: "Matematika",
    description: "Modul Matematika untuk Paket B memperkenalkan konsep dasar matematika yang lebih lanjut, disusun untuk siswa setara SMP.",
    modules: [
      { num: 1, title: "Makanan Favoritku", file: "Modul 1 Matematika Paket B Makanan Favoritku.pdf" },
      { num: 2, title: "Indahnya Keberagaman", file: "Modul 2 Matematika Paket B Indahnya Keberagaman.pdf" },
      { num: 3, title: "Asyiknya Berdagang", file: "Modul 3 Matematika Paket B Asyiknya Berdagang.pdf" },
      { num: 4, title: "Jejak Petualang", file: "Modul 4 Matematika Paket B Jejak Petualang.pdf" },
      { num: 5, title: "Media dan Informasi", file: "Modul 5 Matematika Paket B Media dan Informasi.pdf" },
      { num: 6, title: "Penomeran dan Posisi Rumah", file: "Modul 6 Matematika Paket B Penomeran dan Posisi Rumah.pdf" },
      { num: 7, title: "Hidup Hemat", file: "Modul 7 Matematika Paket B Hidup Hemat.pdf" },
      { num: 8, title: "Kampung Pelangi", file: "Modul 8 Matematika Paket B Kampung Pelangi.pdf" },
      { num: 9, title: "Pasar Malam di Kampungku", file: "Modul 9 Matematika Paket B Pasar Malam di Kampungku.pdf" },
      { num: 10, title: "Idaman Pedagang", file: "Modul 10 Matematika Paket B Idaman Pedagang.pdf" },
      { num: 11, title: "Semarak Media", file: "Modul 11 Matematika Paket B Semarak Media.pdf" },
      { num: 12, title: "Tempat Parkir", file: "Modul 12 Matematika Paket B Tempat Parkir.pdf" },
      { num: 13, title: "Petani Pintar", file: "Modul 13 Matematika Paket B Petani Pintar.pdf" },
      { num: 14, title: "Memperindah Momen Terindah", file: "Modul 14 Matematika Paket B Memperindah Momen Terindah.pdf" },
      { num: 15, title: "Membedah Isi Rumah", file: "Modul 15 Matematika Paket B Membedah Isi Rumah.pdf" },
    ],
  },
  {
    id: "olahraga",
    title: "Olahraga",
    description: "Modul Olahraga untuk Paket B mencakup berbagai materi aktivitas fisik dan kesehatan untuk siswa setara SMP.",
    modules: [
      { num: 1, title: "Tim Kesebelasan Sepak Bola", file: "Modul 1 Olahraga Paket B Tim Kesebelasan Sepak Bola.pdf" },
      { num: 2, title: "Menari Indah di Udara", file: "Modul 2 Olahraga Paket B Menari Indah di Udara.pdf" },
      { num: 3, title: "Sehat Bugar Untuk Tua Muda", file: "Modul 3 Olahraga Paket B Sehat Bugar Untuk Tua Muda.pdf" },
      { num: 4, title: "Lestarika Pencak Silat", file: "Modul 4 Olahraga Paket B Lestarika Pencak Silat.pdf" },
      { num: 5, title: "Bugar dan Sehat", file: "Modul 5 Olahraga Paket B Bugar dan Sehat.pdf" },
      { num: 6, title: "Ekstrim tapi Bermanfaat", file: "Modul 6 Olahraga Paket B Ekstrim tapi Bermanfaat.pdf" },
      { num: 7, title: "Sehat Negeriku dengan Senam Aerobik", file: "Modul 7 Olahraga Paket B Sehat Negeriku dengan Senam Aerobik.pdf" },
      { num: 8, title: "Renang Ala Kampung", file: "Modul 8 Olahraga Paket B Renang Ala Kampung.pdf" },
      { num: 9, title: "Tubuh Aset Tak Ternilai", file: "Modul 9 Olahraga Paket B Tubuh Aset Tak Ternilai.pdf" },
      { num: 10, title: "Jagalah Martabat dan Jiwamu", file: "Modul 10 Olahraga Paket B Jagalah Martabat dan Jiwamu.pdf" },
      { num: 11, title: "Melatih Gerak", file: "Modul 11 Olahraga Paket B Melatih Gerak.pdf" },
      { num: 12, title: "Lincahnya", file: "Modul 12 Olahraga Paket B Lincahnya.pdf" },
      { num: 13, title: "Jurus Menghadapi", file: "Modul 13 Olahraga Paket B Jurus Menghadapi.pdf" },
      { num: 14, title: "Indahnya Gerakan Ku", file: "Modul 14 Olahraga Paket B Indahnya Gerakan Ku.pdf" },
      { num: 15, title: "Meleset di Air", file: "Modul 15 Olahraga Paket B Meleset di Air.pdf" },
      { num: 16, title: "Berjuang Untuk Sehat", file: "Modul 16 Olahraga Paket B Berjuang Untuk Sehat.pdf" },
    ],
  },
  {
    id: "ppkn",
    title: "PPKn",
    description: "Modul PPKn untuk Paket B mengajarkan nilai-nilai Pancasila, keberagaman, dan kehidupan bernegara yang relevan untuk siswa setara SMP.",
    modules: [
      { num: 1, title: "Saya Indonesia Saya Pancasila", file: "Modul 1 PPKn Paket B Saya Indonesia Saya Pancasila.pdf" },
      { num: 2, title: "Mari Membangun Kesadaran Berkonstitusi", file: "Modul 2 PPKn Paket B Mari Membangun Kesadaran Berkonstitusi.pdf" },
      { num: 3, title: "Keragaman Dalam Bingkai Bhineka Tunggal Ika", file: "Modul 3 PPKn Paket B Keragaman Dalam Bingkai Bhineka Tunggal Ika.pdf" },
      { num: 4, title: "Gotong Royong", file: "Modul 4 PPKn Paket B Gotong Royong.pdf" },
      { num: 5, title: "NKRI Harga Mati", file: "Modul 5 PPKn Paket B NKRI Harga Mati.pdf" },
      { num: 6, title: "Taat Norma Ketertiban Tercipta", file: "Modul 6 PPKn Paket B Taat Norma Ketertiban Tercipta.pdf" },
      { num: 7, title: "Falsafah Bangsaku", file: "Modul 7 PPKn Paket B Falsafah Bangsaku.pdf" },
      { num: 8, title: "Makna Undang-Undang Dasar", file: "Modul 8 PPKn Paket B Makna Undang-Undang Dasar.pdf" },
      { num: 9, title: "Struktur Undang-Undang", file: "Modul 9 PPKn Paket B Struktur Undang-Undang.pdf" },
      { num: 10, title: "Bangkitlah Bangsaku", file: "Modul 10 PPKn Paket B Bangkitlah Bangsaku.pdf" },
      { num: 11, title: "Indonesia Tanah Air Beta", file: "Modul 11 PPKn Paket B Indonesia Tanah Air Beta.pdf" },
      { num: 12, title: "Pancasila Jiwa Bangsa Indonesia", file: "Modul 12 PPKn Paket B Pancasila Jiwa Bangsa Indonesia.pdf" },
      { num: 13, title: "Negara Begitu Bunyinya", file: "Modul 13 PPKn Paket B Negara Begitu Bunyinya.pdf" },
      { num: 14, title: "Tunduk Pada Negara", file: "Modul 14 PPKn Paket B Tunduk Pada Negara.pdf" },
      { num: 15, title: "Harmoni Keberagaman dan Bela Negara", file: "Modul 15 PPKn Paket B Harmoni Keberagaman dan Bela Negara.pdf" },
      { num: 16, title: "Jalan Panjang Menjaga Negeri Indonesia", file: "Modul 16 PPKn Paket B Jalan Panjang Menjaga Negeri Indonesia.pdf" },
    ],
  },
  {
    id: "prakarya",
    title: "Prakarya",
    description: "Modul Prakarya untuk Paket B mengembangkan kreativitas dan keterampilan praktis peserta didik, setara SMP.",
    modules: [
      { num: 1, title: "Teknologi dan Masa Depanku", file: "Modul 1 Prakarya Paket B Teknologi dan Masa Depanku.pdf" },
      { num: 2, title: "Teknologi Hidupku Menjadi Mudah", file: "Modul 2 Prakarya Paket B Teknologi Hidupku Menjadi Mudah.pdf" },
      { num: 3, title: "Bersosialisasi via Teknologi Konstruksi", file: "Modul 3 Prakarya Paket B Bersosialisasi via Teknologi Konstruksi.pdf" },
      { num: 4, title: "Mengenal Kayu dan Fungsinya", file: "Modul 4 Prakarya Paket B Mengenal Kayu dan Fungsinya.pdf" },
      { num: 5, title: "Karyaku Membuat Kotak Pensil", file: "Modul 5 Prakarya Paket B Karyaku Membuat Kotak Pensil.pdf" },
      { num: 6, title: "Raam Kerajinan Bahan Lunak Nusantara", file: "Modul 6 Prakarya Paket B Raam Kerajinan Bahan Lunak Nusantara.pdf" },
      { num: 7, title: "Mari Berkarya", file: "Modul 7 Prakarya Paket B Mari Berkarya.pdf" },
      { num: 8, title: "Limbah Bernilai", file: "Modul 8 Prakarya Paket B Limbah Bernilai.pdf" },
      { num: 9, title: "Cipta Kreasi Limbah Cangkang Kerang", file: "Modul 9 Prakarya Paket B Cipta Kreasi Limbah Cangkang Kerang.pdf" },
      { num: 10, title: "Cipta Kreasi Limbah Plastik", file: "Modul 10 Prakarya Paket B Cipta Kreasi Limbah Plastik.pdf" },
      { num: 11, title: "Pangan Apakah Aku", file: "Modul 11 Prakarya Paket B Pangan Apakah Aku.pdf" },
      { num: 12, title: "Dolenak si Cendol Enak", file: "Modul 12 Prakarya Paket B Dolenak si Cendol Enak.pdf" },
      { num: 13, title: "Cabut Duri Gaya Surmi", file: "Modul 13 Prakarya Paket B Cabut Duri Gaya Surmi.pdf" },
      { num: 14, title: "Si Cenil Sedang Mandi", file: "Modul 14 Prakarya Paket B Si Cenil Sedang Mandi.pdf" },
      { num: 15, title: "Rengganis si Hitam Manis", file: "Modul 15 Prakarya Paket B Rengganis si Hitam Manis.pdf" },
    ],
  },
  {
    id: "seni-budaya",
    title: "Seni Budaya",
    description: "Modul Seni Budaya untuk Paket B meliputi berbagai aspek seni dan budaya, dirancang untuk siswa setara SMP.",
    modules: [
      { num: 1, title: "Inspirasi Alam", file: "Modul 1 Seni Budaya Paket B Inspirasi Alam.pdf" },
      { num: 2, title: "Ragam Hias pada Media Kertas", file: "Modul 2 Seni Budaya Paket B Ragam Hias pada Media Kertas.pdf" },
      { num: 3, title: "Pesona Kerajinan Indonesia", file: "Modul 3 Seni Budaya Paket B Pesona Kerajinan Indonesia.pdf" },
      { num: 4, title: "Warisan Budaya Tradisi pada Bahan Alam Kayu", file: "Modul 4 Seni Budaya Paket B Warisan Budaya Tradisi pada Bahan Alam Kayu.pdf" },
      { num: 5, title: "Warisan Budaya Tradisi pada Bahan Alam Kulit", file: "Modul 5 Seni Budaya Paket B Warisan Budaya Tradisi pada Bahan Alam Kulit.pdf" },
      { num: 6, title: "Uniknya Tarian Daerahku", file: "Modul 6 Seni Budaya Paket B Uniknya Tarian Daerahku.pdf" },
      { num: 7, title: "Pendukung Penampilan Tari", file: "Modul 7 Seni Budaya Paket B Pendukung Penampilan Tari.pdf" },
      { num: 8, title: "Mari Menari Bersama", file: "Modul 8 Seni Budaya Paket B Mari Menari Bersama.pdf" },
      { num: 9, title: "Menari dengan Irama Musik", file: "Modul 9 Seni Budaya Paket B Menari dengan Irama Musik.pdf" },
      { num: 10, title: "Ornamentasi Lagu", file: "Modul 10 Seni Budaya Paket B Ornamentasi Lagu.pdf" },
      { num: 11, title: "Aransemen Lagu Vocal Grop", file: "Modul 11 Seni Budaya Paket B Aransemen Lagu Vocal Grop.pdf" },
      { num: 12, title: "Lagu-lagu Populer Indonesia", file: "Modul 12 Seni Budaya Paket B Lagu-lagu Populer Indonesia.pdf" },
      { num: 13, title: "Pertunjukan Musik POP", file: "Modul 13 Seni Budaya Paket B Pertunjukan Musik POP.pdf" },
    ],
  },
];

const totalModules = subjects.reduce((sum, sub) => sum + sub.modules.length, 0);

export default function PaketBModulPage() {
  return (
    <PageShell
      title="Download Modul Paket B"
      description={`eModul Pendidikan Kesetaraan Setara SMP/MTs \u2014 ${totalModules} modul dari 9 mata pelajaran. Disediakan gratis oleh Kemdikbud.`}
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
