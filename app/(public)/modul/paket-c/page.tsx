import Link from "next/link";
import { FileDown, ArrowUp, BookOpen } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";


export const metadata = {
  title: "Download Modul Paket C - PKBM Al-Fitria",
  description: "eModul Pendidikan Kesetaraan Setara SMA/MA",
};

const BASE_URL = "https://modul.pkbm.id/paket-c";

const subjects = [
  {
    id: "bahasa-indonesia",
    title: "Bahasa Indonesia",
    description: "Modul Bahasa Indonesia untuk Paket C membantu peserta didik memahami bahasa Indonesia dengan pendekatan yang interaktif dan mudah dipahami, setara SMA.",
    modules: [
      { num: 1, title: "Menyingkap Ilmu Pengetahuan di Sekitar Kita", file: "Modul 1 Bahasa Indonesia Paket C Menyingkap Ilmu Pengetahuan di Sekitar Kita.pdf" },
      { num: 2, title: "Memberi Gagasan Cerdas Terhadap Permasalahan di Sekitar", file: "Modul 2 Bahasa Indonesia Paket C Memberi Gagasan Cerdas Terhadap Permasalahan di Sekitar.pdf" },
      { num: 3, title: "Keteladanan Sang Tokoh", file: "Modul 3 Bahasa Indonesia Paket C Keteladanan Sang Tokoh.pdf" },
      { num: 4, title: "Teks Negosiasi", file: "Modul 4 Bahasa Indonesia Paket C Teks Negosiasi.pdf" },
      { num: 5, title: "Anekdot", file: "Modul 5 Bahasa Indonesia Paket C Anekdot.pdf" },
      { num: 6, title: "Niat Menuju Sukses", file: "Modul 6 Bahasa Indonesia Paket C Niat Menuju Sukses.pdf" },
      { num: 7, title: "Menyibak Peristiwa di Sekitar", file: "Modul 7 Bahasa Indonesia Paket C Menyibak Peristiwa di Sekitar.pdf" },
      { num: 8, title: "Membuat Usulan Yang Jitu", file: "Modul 8 Bahasa Indonesia Paket C Membuat Usulan Yang Jitu.pdf" },
      { num: 9, title: "Ungkap Tuntas Idemu Secara Ilmiyah", file: "Modul 9 Bahasa Indonesia Paket C Ungkap Tuntas Idemu Secara Ilmiyah.pdf" },
      { num: 10, title: "Membedah Kehidupan Sang Tokoh", file: "Modul 10 Bahasa Indonesia Paket C Membedah Kehidupan Sang Tokoh.pdf" },
      { num: 11, title: "Mengupas Tuntas Karya-karya Fiksi dan Nonfiksi", file: "Modul 11 Bahasa Indonesia Paket C Mengupas Tuntas Karya-karya Fiksi dan Nonfiksi.pdf" },
      { num: 12, title: "Promosi Diri", file: "Modul 12 Bahasa Indonesia Paket C Promosi Diri.pdf" },
      { num: 13, title: "Belajar dari Sejarah", file: "Modul 13 Bahasa Indonesia Paket C Belajar dari Sejarah.pdf" },
      { num: 14, title: "Menjadi Penulis itu Asyik", file: "Modul 14 Bahasa Indonesia Paket C Menjadi Penulis itu Asyik.pdf" },
      { num: 15, title: "Berani Menyampaikan Pendapat", file: "Modul 15 Bahasa Indonesia Paket C Berani Menyampaikan Pendapat.pdf" },
      { num: 16, title: "Cerdik Membuat Kritik Piawai Membuat Esai", file: "Modul 16 Bahasa Indonesia Paket C Cerdik Membuat Kritik Piawai Membuat Esai.pdf" },
    ],
  },
  {
    id: "bahasa-inggris",
    title: "Bahasa Inggris",
    description: "Modul Bahasa Inggris untuk Paket C membantu peserta didik menguasai bahasa Inggris dengan materi yang relevan untuk tingkat SMA.",
    modules: [
      { num: 1, title: "Who I Am", file: "Modul 1 Bahasa Inggris Paket C Who I Am.pdf" },
      { num: 2, title: "Thank You I\u2019m Flattered", file: "Modul 2 Bahasa Inggris Paket C Thank You I\u2019m Flattered.pdf" },
      { num: 3, title: "Having Fun at Historical Places", file: "Modul 3 Bahasa Inggris Paket C Having Fun at Historical Places.pdf" },
      { num: 4, title: "Announcement", file: "Modul 4 Bahasa Inggris Paket C Announcement.pdf" },
      { num: 5, title: "Let\u2019s Sing A Song", file: "Modul 5 Bahasa Inggris Paket C Let\u2019s Sing A Song.pdf" },
      { num: 6, title: "Thank It\u2019s Helpful", file: "Modul 6 Bahasa Inggris Paket C Thank It\u2019s Helpful.pdf" },
      { num: 7, title: "I Think You\u2019re Right!", file: "Modul 7 Bahasa Inggris Paket C I Think You\u2019re Right!.pdf" },
      { num: 8, title: "Don\u2019t Worry I\u2019ll Come", file: "Modul 8 Bahasa Inggris Paket C Don\u2019t Worry I\u2019ll Come.pdf" },
      { num: 9, title: "Let Me Know!", file: "Modul 9 Bahasa Inggris Paket C Let Me Know!.pdf" },
      { num: 10, title: "My World", file: "Modul 10 Bahasa Inggris Paket C My World.pdf" },
      { num: 11, title: "With My Pleasure", file: "Modul 11 Bahasa Inggris Paket C With My Pleasure.pdf" },
      { num: 12, title: "It\u2019s A Good Job", file: "Modul 12 Bahasa Inggris Paket C It\u2019s A Good Job.pdf" },
      { num: 13, title: "A Picture Speaks Louder Than a Word", file: "Modul 13 Bahasa Inggris Paket C A Picture Speaks Louder Than a Word.pdf" },
      { num: 14, title: "Bad News Is a Good News", file: "Modul 14 Bahasa Inggris Paket C Bad News Is a Good News.pdf" },
      { num: 15, title: "Manual Tips", file: "Modul 15 Bahasa Inggris Paket C Manual Tips.pdf" },
    ],
  },
  {
    id: "biologi",
    title: "Biologi",
    description: "Modul Biologi untuk Paket C mencakup konsep-konsep penting biologi untuk tingkat SMA, termasuk ekologi, sistem tubuh, dan genetika.",
    modules: [
      { num: 1, title: "Biologi dan Peranannya dalam Kehidupan Manusia", file: "Modul 1 Biologi Paket C Biologi dan Peranannya dalam Kehidupan Manusia.pdf" },
      { num: 2, title: "Mengenal Kekayaan Hayati Indonesia", file: "Modul 2 Biologi Paket C Mengenal Kekayaan Hayati Indonesia.pdf" },
      { num: 3, title: "Mikroorganisme bagi Kehidupan Manusia", file: "Modul 3 Biologi Paket C Mikroorganisme bagi Kehidupan Manusia.pdf" },
      { num: 4, title: "Menelusuri Keanekaragaman Hayati sebagai Penyokong Kehidupan Manusia", file: "Modul 4 Biologi Paket C Menelusuri Keanekaragaman Hayati sebagai Penyokong Kehidupan Manusia.pdf" },
      { num: 5, title: "Harmoni Alam Semesta", file: "Modul 5 Biologi Paket C Harmoni Alam Semesta.pdf" },
      { num: 6, title: "Kecil Tapi Sungguh Mengagumkan", file: "Modul 6 Biologi Paket C Kecil Tapi Sungguh Mengagumkan.pdf" },
      { num: 7, title: "Sistem Gerak dan Sirkulasi", file: "Modul 7 Biologi Paket C Sistem Gerak dan Sirkulasi.pdf" },
      { num: 8, title: "Badan Sehat Jiwa Kuat", file: "Modul 8 Biologi Paket C Badan Sehat Jiwa Kuat.pdf" },
      { num: 9, title: "Tetap Sehat dan Menjaga Kesehatan Sistem Koordinasi", file: "Modul 9 Biologi Paket C Tetap Sehat dan Menjaga Kesehatan Sistem Koordinasi.pdf" },
      { num: 10, title: "Reproduksi dan Hidup Sehat", file: "Modul 10 Biologi Paket C Reproduksi dan Hidup Sehat.pdf" },
      { num: 11, title: "Perjalanan Hidup Makhluk Hidup", file: "Modul 11 Biologi Paket C Perjalanan Hidup Makhluk Hidup.pdf" },
      { num: 12, title: "Perubahan Makanan Menjadi Energi", file: "Modul 12 Biologi Paket C Perubahan Makanan Menjadi Energi.pdf" },
      { num: 13, title: "Cetak Biru Makhluk Hidup", file: "Modul 13 Biologi Paket C Cetak Biru Makhluk Hidup.pdf" },
      { num: 14, title: "Sel Penyusun Makhluk Hidup", file: "Modul 14 Biologi Paket C Sel Penyusun Makhluk Hidup.pdf" },
      { num: 15, title: "Misteri Pewarisan Sifat Makhluk Hidup", file: "Modul 15 Biologi Paket C Misteri Pewarisan Sifat Makhluk Hidup.pdf" },
      { num: 16, title: "Mutasi Genetik dan Teori Evolusi", file: "Modul 16 Biologi Paket C Mutasi Genetik dan Teori Evolusi.pdf" },
      { num: 17, title: "Bioteknologi Untuk Hidup Yang Lebih Baik", file: "Modul 17 Biologi Paket C Bioteknologi Untuk Hidup Yang Lebih Baik.pdf" },
    ],
  },
  {
    id: "ekonomi",
    title: "Ekonomi",
    description: "Modul Ekonomi untuk Paket C mempelajari konsep ekonomi dasar hingga lanjutan, cocok untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Memahami Ekonomi", file: "Modul 1 Ekonomi Paket C Memahami Ekonomi.pdf" },
      { num: 2, title: "Menjadi Konsumen Cerdas", file: "Modul 2 Ekonomi Paket C Menjadi Konsumen Cerdas.pdf" },
      { num: 3, title: "Sejarah Pasca Pensiun", file: "Modul 3 Ekonomi Paket C Sejarah Pasca Pensiun.pdf" },
      { num: 4, title: "Penggerak Ekonomi Negeriku", file: "Modul 4 Ekonomi Paket C Penggerak Ekonomi Negeriku.pdf" },
      { num: 5, title: "Kreatif Mengelola Sumber Daya", file: "Modul 5 Ekonomi Paket C Kreatif Mengelola Sumber Daya.pdf" },
      { num: 6, title: "Pendapatan Nasional dan Kesejahteraan Ekonomi", file: "Modul 6 Ekonomi Paket C Pendapatan Nasional dan Kesejahteraan Ekonomi.pdf" },
      { num: 7, title: "Membangun Ekonomi Nasional", file: "Modul 7 Ekonomi Paket C Membangun Ekonomi Nasional.pdf" },
      { num: 8, title: "Inflasi Yang Merenggut Kemakmuran", file: "Modul 8 Ekonomi Paket C Inflasi Yang Merenggut Kemakmuran.pdf" },
      { num: 9, title: "Anggaran Belanja Antara Perencanaan dan Realisasi", file: "Modul 9 Ekonomi Paket C Anggaran Belanja Antara Perencanaan dan Realisasi.pdf" },
      { num: 10, title: "Menembus Pasar Dunia", file: "Modul 10 Ekonomi Paket C Menembus Pasar Dunia.pdf" },
      { num: 11, title: "Pentingnya Pencatatan Keuangan", file: "Modul 11 Ekonomi Paket C Pentingnya Pencatatan Keuangan.pdf" },
      { num: 12, title: "Catat dan Laporkan Transaksi Jasa 1", file: "Modul 12 Ekonomi Paket C Catat dan Laporkan Transaksi Jasa 1.pdf" },
      { num: 13, title: "Catat dan Laporkan Transaksi Jasa 2", file: "Modul 13 Ekonomi Paket C Catat dan Laporkan Transaksi Jasa 2.pdf" },
      { num: 14, title: "Catat dan Laporkan Transaksi Dagang 1", file: "Modul 14 Ekonomi Paket C Catat dan Laporkan Transaksi Dagang 1.pdf" },
      { num: 15, title: "Catat dan Laporkan Transaksi Dagang 2", file: "Modul 15 Ekonomi Paket C Catat dan Laporkan Transaksi Dagang 2.pdf" },
    ],
  },
  {
    id: "fisika",
    title: "Fisika",
    description: "Modul Fisika untuk Paket C mengajarkan konsep fisika dasar hingga lanjutan, disusun untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Safari Ke Pulau Fisika", file: "Modul 1 Fisika Paket C Safari Ke Pulau Fisika.pdf" },
      { num: 2, title: "Gerak Berbagai Benda di Sekitar Kita", file: "Modul 2 Fisika Paket C Gerak Berbagai Benda di Sekitar Kita.pdf" },
      { num: 3, title: "Tata Surya", file: "Modul 3 Fisika Paket C Tata Surya.pdf" },
      { num: 4, title: "Energi yang Berusaha", file: "Modul 4 Fisika Paket C Energi yang Berusaha.pdf" },
      { num: 5, title: "Antara Bersatu Dan Berpisah", file: "Modul 5 Fisika Paket C Antara Bersatu Dan Berpisah.pdf" },
      { num: 6, title: "Fluida si Muka Seribu", file: "Modul 6 Fisika Paket C Fluida si Muka Seribu.pdf" },
      { num: 7, title: "Misteri Batu Bertumpuk", file: "Modul 7 Fisika Paket C Misteri Batu Bertumpuk.pdf" },
      { num: 8, title: "Aku Benda Elastis", file: "Modul 8 Fisika Paket C Aku Benda Elastis.pdf" },
      { num: 9, title: "Gas Yang Bisa Bekerja", file: "Modul 9 Fisika Paket C Gas Yang Bisa Bekerja.pdf" },
      { num: 10, title: "Hidup Di Tengah Gelombang Bunyi dan Cahaya", file: "Modul 10 Fisika Paket C Hidup Di Tengah Gelombang Bunyi dan Cahaya.pdf" },
      { num: 11, title: "Awas Pemanasan Global Mengancam Kita", file: "Modul 11 Fisika Paket C Awas Pemanasan Global Mengancam Kita.pdf" },
      { num: 12, title: "Tarik Menarik dan Tolak Menolak", file: "Modul 12 Fisika Paket C Tarik Menarik dan Tolak Menolak.pdf" },
      { num: 13, title: "Rahasia diantara Dua Kutub", file: "Modul 13 Fisika Paket C Rahasia diantara Dua Kutub.pdf" },
      { num: 14, title: "Pancaran Gelombang", file: "Modul 14 Fisika Paket C Pancaran Gelombang.pdf" },
      { num: 15, title: "Teori Relativitas Khusus Einstein", file: "Modul 15 Fisika Paket C Teori Relativitas Khusus Einstein.pdf" },
      { num: 16, title: "Dunia di Ujung Jari", file: "Modul 16 Fisika Paket C Dunia di Ujung Jari.pdf" },
      { num: 17, title: "Menjaga Bumi Tetap Lestari", file: "Modul 17 Fisika Paket C Menjaga Bumi Tetap Lestari.pdf" },
    ],
  },
  {
    id: "geografi",
    title: "Geografi",
    description: "Modul Geografi untuk Paket C membahas tentang geografi fisik dan sosial, relevan untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Menenal Geografi untuk Kehidupan", file: "Modul 1 Geografi Paket C Menenal Geografi untuk Kehidupan.pdf" },
      { num: 2, title: "Menjadi Peneliti Geografi", file: "Modul 2 Geografi Paket C Menjadi Peneliti Geografi.pdf" },
      { num: 3, title: "Bumi Tempat Kita Hidup", file: "Modul 3 Geografi Paket C Bumi Tempat Kita Hidup.pdf" },
      { num: 4, title: "Ramah Dengan Alam", file: "Modul 4 Geografi Paket C Ramah Dengan Alam.pdf" },
      { num: 5, title: "Udara Dan Air Sumber Kehidupan", file: "Modul 5 Geografi Paket C Udara Dan Air Sumber Kehidupan.pdf" },
      { num: 6, title: "Negriku Subur dan Makmur", file: "Modul 6 Geografi Paket C Negriku Subur dan Makmur.pdf" },
      { num: 7, title: "Uniknya Flora Fauna Indonesia", file: "Modul 7 Geografi Paket C Uniknya Flora Fauna Indonesia.pdf" },
      { num: 8, title: "Alamku Berlimpah", file: "Modul 8 Geografi Paket C Alamku Berlimpah.pdf" },
      { num: 9, title: "Padat Tidak Merata", file: "Modul 9 Geografi Paket C Padat Tidak Merata.pdf" },
      { num: 10, title: "Bangsa Indonesia Bangsa Yang Berbudaya", file: "Modul 10 Geografi Paket C Bangsa Indonesia Bangsa Yang Berbudaya.pdf" },
      { num: 11, title: "Tata Ruang Kehidupan", file: "Modul 11 Geografi Paket C Tata Ruang Kehidupan.pdf" },
      { num: 12, title: "Menata Wilayah", file: "Modul 12 Geografi Paket C Menata Wilayah.pdf" },
      { num: 13, title: "Interaksi Desa Kota", file: "Modul 13 Geografi Paket C Interaksi Desa Kota.pdf" },
      { num: 14, title: "Memotret Wilayah Sekitar", file: "Modul 14 Geografi Paket C Memotret Wilayah Sekitar.pdf" },
      { num: 15, title: "Menyongsong Indonesia Maju", file: "Modul 15 Geografi Paket C Menyongsong Indonesia Maju.pdf" },
    ],
  },
  {
    id: "kimia",
    title: "Kimia",
    description: "Modul Kimia untuk Paket C mengajarkan konsep kimia dasar hingga lanjutan, disusun untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Dalam Kehidupan", file: "Modul 1 Kimia Paket C Dalam Kehidupan.pdf" },
      { num: 2, title: "Keteraturan Dalam Kimia", file: "Modul 2 Kimia Paket C Keteraturan Dalam Kimia.pdf" },
      { num: 3, title: "Pasangan Atom dan Sifatnya", file: "Modul 3 Kimia Paket C Pasangan Atom dan Sifatnya.pdf" },
      { num: 4, title: "Peranan Elektrolit dalam Tubuh", file: "Modul 4 Kimia Paket C Peranan Elektrolit dalam Tubuh.pdf" },
      { num: 5, title: "Kiat Menghitung Zat Kimia", file: "Modul 5 Kimia Paket C Kiat Menghitung Zat Kimia.pdf" },
      { num: 6, title: "Mengelola Bahan Bakar Fosil Menuju Langit Biru", file: "Modul 6 Kimia Paket C Mengelola Bahan Bakar Fosil Menuju Langit Biru.pdf" },
      { num: 7, title: "Mempertahankan Kualitas Bahan", file: "Modul 7 Kimia Paket C Mempertahankan Kualitas Bahan.pdf" },
      { num: 8, title: "Interaksi Alam Basa dan Kehidupan", file: "Modul 8 Kimia Paket C Interaksi Alam Basa dan Kehidupan.pdf" },
      { num: 9, title: "Kesetimbangan Ion Dalam Larutan", file: "Modul 9 Kimia Paket C Kesetimbangan Ion Dalam Larutan.pdf" },
      { num: 10, title: "Koloid Dalam Kehidupan Sehari-hari", file: "Modul 10 Kimia Paket C Koloid Dalam Kehidupan Sehari-hari.pdf" },
      { num: 11, title: "Amazing Larutan", file: "Modul 11 Kimia Paket C Amazing Larutan.pdf" },
      { num: 12, title: "Ada Redoks di Rumahku", file: "Modul 12 Kimia Paket C Ada Redoks di Rumahku.pdf" },
      { num: 13, title: "Cukup Besi Yang Berkarat", file: "Modul 13 Kimia Paket C Cukup Besi Yang Berkarat.pdf" },
      { num: 14, title: "Setiap Hubungan Perlu Chemistry", file: "Modul 14 Kimia Paket C Setiap Hubungan Perlu Chemistry.pdf" },
      { num: 15, title: "Berpadu dan Bersenyawa", file: "Modul 15 Kimia Paket C Berpadu dan Bersenyawa.pdf" },
    ],
  },
  {
    id: "matematika",
    title: "Matematika",
    description: "Modul Matematika untuk Paket C mengajarkan konsep matematika dasar hingga lanjutan, disusun untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Belanja Cerdas", file: "Modul 1 Matematika Paket C Belanja Cerdas.pdf" },
      { num: 2, title: "Memulai Bisnis", file: "Modul 2 Matematika Paket C Memulai Bisnis.pdf" },
      { num: 3, title: "e-KTP", file: "Modul 3 Matematika Paket C e-KTP.pdf" },
      { num: 4, title: "Bertani", file: "Modul 4 Matematika Paket C Bertani.pdf" },
      { num: 5, title: "Penerapan Trigonometri dalam Kehidupan Sehari-hari", file: "Modul 5 Matematika Paket C Penerapan Trigonometri dalam Pengembangan Ilmu dan Teknologi dalam Kehidupan Sehari-hari.pdf" },
      { num: 6, title: "Berpikir Logis", file: "Modul 6 Matematika Paket C Berpikir Logis.pdf" },
      { num: 7, title: "Mengatur Kebutuhan Sehari-hari Dengan Program Linier", file: "Modul 7 Matematika Paket C Mengatur Kebutuhan Sehari-hari Dengan Menggunakan Program Linier.pdf" },
      { num: 8, title: "Keteraturan Barisan dan Penyajian Data dalam Bentuk Matriks", file: "Modul 8 Matematika Paket C Keteraturan Barisan dan Penyajian Data dalam Bentuk Matriks.pdf" },
      { num: 9, title: "Penerapan Limit dan Turunan dalam Kehidupan Sehari-hari", file: "Modul 9 Matematika Paket C Penerapan Limit dan Turunan dalam Kehidupan Masyarakat Sehari-hari.pdf" },
      { num: 10, title: "Penerapan Integral dalam Kehidupan Sehari-hari", file: "Modul 10 Matematika Paket C Penerapan Integral dalam Kehidupan Masyarakat Sehari-hari.pdf" },
      { num: 11, title: "Jauh Dekat Bisa Didapat", file: "Modul 11 Matematika Paket C Jauh Dekat Bisa Didapat.pdf" },
      { num: 12, title: "Mengolah Data", file: "Modul 12 Matematika Paket C Mengolah Data.pdf" },
      { num: 13, title: "Berjabat Tangan", file: "Modul 13 Matematika Paket C Berjabat Tangan.pdf" },
      { num: 14, title: "Kapan Kesempatan", file: "Modul 14 Matematika Paket C Kapan Kesempatan.pdf" },
    ],
  },
  {
    id: "matematika-peminatan",
    title: "Matematika Peminatan",
    description: "Modul Matematika Peminatan untuk Paket C menyediakan materi lanjutan dan aplikasi matematika yang lebih mendalam, setara SMA.",
    modules: [
      { num: 1, title: "Pinjaman", file: "Modul 1 Matematika Peminatan Paket C Pinjam.pdf" },
      { num: 2, title: "Tatanan Rumah", file: "Modul 2 Matematika Peminatan Paket C Tatanan Rumah.pdf" },
      { num: 3, title: "Arsitektur Modern", file: "Modul 3 Matematika Peminatan Paket C Arsitektur Modern.pdf" },
      { num: 4, title: "Martabak Manis", file: "Modul 4 Matematika Peminatan Paket C Martabak Manis.pdf" },
      { num: 5, title: "Penerapan Polinomial dalam Kehidupan Sehari-hari", file: "Modul 5 Matematika Peminatan Paket C Penerapan Polinomial dalam Pengembangan Ilmu dan Teknologi Sehari-hari.pdf" },
      { num: 6, title: "Pengaturan Keuangan Keluarga", file: "Modul 6 Matematika Peminatan Paket C Pengaturan Keuangan Keluarga.pdf" },
      { num: 7, title: "Kart Kredit", file: "Modul 7 Matematika Peminatan Paket C Kart Kredit.pdf" },
      { num: 8, title: "Bunga Bank", file: "Modul 8 Matematika Peminatan Paket C Bunga Bank.pdf" },
      { num: 9, title: "Sungai di Desaku", file: "Modul 9 Matematika Peminatan Paket C Sungai di Desaku.pdf" },
      { num: 10, title: "Bersepeda", file: "Modul 10 Matematika Peminatan Paket C Bersepeda.pdf" },
      { num: 11, title: "Mendekati Tapi Tak Sampai", file: "Modul 11 Matematika Peminatan Paket C Mendekati Tapi Tak Sampai.pdf" },
      { num: 12, title: "Indah dan Kokohnya Negriku", file: "Modul 12 Matematika Peminatan Paket C Indah dan Kokohnya Negriku.pdf" },
      { num: 13, title: "Berani Menjawab Tantangan", file: "Modul 13 Matematika Peminatan Paket C Berani Menjawab Tantangan.pdf" },
      { num: 14, title: "Berdagang Buah", file: "Modul 14 Matematika Peminatan Paket C Berdagang Buah.pdf" },
      { num: 15, title: "Sehat Ayamku Sehat Badanku", file: "Modul 15 Matematika Peminatan Paket C Sehat Ayamku Sehat Badanku.pdf" },
    ],
  },
  {
    id: "olahraga",
    title: "Olahraga",
    description: "Modul Olahraga untuk Paket C mencakup berbagai materi aktivitas fisik dan kesehatan untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Aksi Cerdas Mencetak Gol", file: "Modul 1 Olahraga Paket C Aksi Cerdas Mencetak Gol.pdf" },
      { num: 2, title: "Raih Kemenangan", file: "Modul 2 Olahraga Paket C Raih Kemenangan.pdf" },
      { num: 3, title: "Berlari Berprestasi", file: "Modul 3 Olahraga Paket C Berlari Berprestasi.pdf" },
      { num: 4, title: "Berlatih Mandiri Lindung Diri", file: "Modul 4 Olahraga Paket C Berlatih Mandiri Lindung Diri.pdf" },
      { num: 5, title: "Fit and Fun", file: "Modul 5 Olahraga Paket C Fit and Fun.pdf" },
      { num: 6, title: "Atraksi Indah Senam Lantai", file: "Modul 6 Olahraga Paket C Atraksi Indah Senam Lantai.pdf" },
      { num: 7, title: "Semangat Irama Kehidupan", file: "Modul 7 Olahraga Paket C Semangat Irama Kehidupan.pdf" },
      { num: 8, title: "Sejuta Manfaat Berenang", file: "Modul 8 Olahraga Paket C Sejuta Manfaat Berenang.pdf" },
      { num: 9, title: "Mensana in Corpore Sano", file: "Modul 9 Olahraga Paket C Mensana in Corpore Sano.pdf" },
      { num: 10, title: "Say No To Drugs", file: "Modul 10 Olahraga Paket C Say No To Drugs.pdf" },
      { num: 11, title: "Meraih Kebugaran pada Permainan Bola", file: "Modul 11 Olahraga Paket C Meraih Kebugaran pada Permainan Bola.pdf" },
      { num: 12, title: "Mengejar Prestasi", file: "Modul 12 Olahraga Paket C Mengejar Prestasi.pdf" },
      { num: 13, title: "Jurus Menuju", file: "Modul 13 Olahraga Paket C Jurus Menuju.pdf" },
      { num: 14, title: "Bugar Dengan Gerak", file: "Modul 14 Olahraga Paket C Bugar Dengan Gerak.pdf" },
      { num: 15, title: "Penyelamatan", file: "Modul 15 Olahraga Paket C Penyelamatan.pdf" },
      { num: 16, title: "Pahlawan", file: "Modul 16 Olahraga Paket C Pahlawan.pdf" },
    ],
  },
  {
    id: "ppkn",
    title: "PPKn",
    description: "Modul PPKn untuk Paket C mengajarkan nilai-nilai Pancasila, keberagaman, dan kehidupan bernegara yang relevan untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Etika Roda Pemerintahan", file: "Modul 1 PPKn Paket C Etika Roda Pemerintahan.pdf" },
      { num: 2, title: "Negeri Elok Amat Kucinta", file: "Modul 2 PPKn Paket C Negeri Elok Amat Kucinta.pdf" },
      { num: 3, title: "Wajah Demokrasi Kita", file: "Modul 3 PPKn Paket C Wajah Demokrasi Kita.pdf" },
      { num: 4, title: "Harmonisasi antara Pusat dan Daerah", file: "Modul 4 PPKn Paket C Harmonisasi antara Pusat dan Daerah.pdf" },
      { num: 5, title: "Kita Menjadi Satu", file: "Modul 5 PPKn Paket C Kita Menjadi Satu.pdf" },
      { num: 6, title: "STOP Pelanggaran HAM", file: "Modul 6 PPKn Paket C STOP Pelanggaran HAM.pdf" },
      { num: 7, title: "Linimasa Demokrasi", file: "Modul 7 PPKn Paket C Linimasa Demokrasi.pdf" },
      { num: 8, title: "Neraca Keadilan", file: "Modul 8 PPKn Paket C Neraca Keadilan.pdf" },
      { num: 9, title: "Menebar Asa di Kancah Dunia", file: "Modul 9 PPKn Paket C Menebar Asa di Kancah Dunia.pdf" },
      { num: 10, title: "Meredekan Gelombang dan Badai", file: "Modul 10 PPKn Paket C Meredekan Gelombang dan Badai.pdf" },
      { num: 11, title: "Nusantara ya Indonesia!", file: "Modul 11 PPKn Paket C Nusantara ya Indonesia!.pdf" },
      { num: 12, title: "Pancasila Dalam Kehidupan", file: "Modul 12 PPKn Paket C Pancasila Dalam Kehidupan.pdf" },
      { num: 13, title: "Tegakkan Keadilan dan Kedamaian di NKRI", file: "Modul 13 PPKn Paket C Tegakkan Keadilan dan Kedamaian di NKRI.pdf" },
      { num: 14, title: "Maju Dalam Keragaman", file: "Modul 14 PPKn Paket C Maju Dalam Keragaman.pdf" },
      { num: 15, title: "Dinamika Dalam Menuju Harmoni", file: "Modul 15 PPKn Paket C Dinamika Dalam Menuju Harmoni.pdf" },
    ],
  },
  {
    id: "prakarya",
    title: "Prakarya",
    description: "Modul Prakarya untuk Paket C mengembangkan kreativitas dan keterampilan praktis peserta didik, setara SMA.",
    modules: [
      { num: 1, title: "Berani Berwirausaha", file: "Modul 1 Prakarya Paket C Berani Berwirausaha.pdf" },
      { num: 2, title: "Jeli Melihat Peluang", file: "Modul 2 Prakarya Paket C Jeli Melihat Peluang.pdf" },
      { num: 3, title: "Lezat dan Aman untuk Dikonsumsi", file: "Modul 3 Prakarya Paket C Lezat dan Aman untuk Dikonsumsi.pdf" },
      { num: 4, title: "Lezat dan Aman untuk Dikonsumsi Berkarya Kreatif", file: "Modul 4 Prakarya Paket C Lezat dan Aman untuk Dikonsumsi Berkarya Kreatif.pdf" },
      { num: 5, title: "Laris Manis", file: "Modul 5 Prakarya Paket C Laris Manis.pdf" },
      { num: 6, title: "Budidaya Pembenihan Ikan Mulai Bisnis", file: "Modul 6 Prakarya Paket C Budidaya Pembenihan Ikan Mulai Bisnis.pdf" },
      { num: 7, title: "Prospek Cerah Pembenihan Ikan Konsumsi", file: "Modul 7 Prakarya Paket C Prospek Cerah Pembenihan Ikan Konsumsi.pdf" },
      { num: 8, title: "Bisnis Asyik Ikan Cantik", file: "Modul 8 Prakarya Paket C Bisnis Asyik Ikan Cantik.pdf" },
      { num: 9, title: "Budidaya Pembenihan Ikan Taksiran Harga Jual", file: "Modul 9 Prakarya Paket C Budidaya Pembenihan Ikan Taksiran Harga Jual.pdf" },
      { num: 10, title: "Budidaya Pembenihan Ikan Tergiur Pasar", file: "Modul 10 Prakarya Paket C Budidaya Pembenihan Ikan Tergiur Pasar.pdf" },
      { num: 11, title: "Budidaya Pembenihan Ikan Berhasil!", file: "Modul 11 Prakarya Paket C Budidaya Pembenihan Ikan Berhasil!.pdf" },
      { num: 12, title: "Menaksir Peluang Usaha Limbah Kayu", file: "Modul 12 Prakarya Paket C Menaksir Peluang Usaha Limbah Kayu.pdf" },
      { num: 13, title: "Menuai Laba dari Limbah Kayu", file: "Modul 13 Prakarya Paket C Menuai Laba dari Limbah Kayu.pdf" },
      { num: 14, title: "Produk Kerajinan Kayu Masuk Pasar Global", file: "Modul 14 Prakarya Paket C Produk Kerajinan Kayu Masuk Pasar Global.pdf" },
      { num: 15, title: "Banjir Order Kerajinan Limbah Kayu", file: "Modul 15 Prakarya Paket C Banjir Order Kerajinan Limbah Kayu.pdf" },
      { num: 16, title: "Tips Pebisnis Unggul Kerajinan Limbah Kayu", file: "Modul 16 Prakarya Paket C Tips Pebisnis Unggul Kerajinan Limbah Kayu.pdf" },
    ],
  },
  {
    id: "sejarah-indonesia",
    title: "Sejarah Indonesia",
    description: "Modul Sejarah Indonesia untuk Paket C membahas tentang sejarah bangsa Indonesia secara komprehensif, relevan untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Menelusuri Konsep Sejarah", file: "Modul 1 Sejarah Indonesia Paket C Menelusuri Konsep Sejarah.pdf" },
      { num: 2, title: "Rekam Jejak Peradaban Indonesia", file: "Modul 2 Sejarah Indonesia Paket C Rekam Jejak Peradaban Indonesia.pdf" },
      { num: 3, title: "Silang Budaya Lokal dan Hindu Budha", file: "Modul 3 Sejarah Indonesia Paket C Silang Budaya Lokal dan Hindu Budha.pdf" },
      { num: 4, title: "Islam Nusantara", file: "Modul 4 Sejarah Indonesia Paket C Islam Nusantara.pdf" },
      { num: 5, title: "Kejayaan Islam di Nusantara", file: "Modul 5 Sejarah Indonesia Paket C Kejayaan Islam di Nusantara.pdf" },
      { num: 6, title: "Magnet Indonesia bagi Bangsa Eropa", file: "Modul 6 Sejarah Indonesia Paket C Magnet Indonesia bagi Bangsa Eropa.pdf" },
      { num: 7, title: "Heroisme Masa Lalu dan Masa Kini", file: "Modul 7 Sejarah Indonesia Paket C Heroisme Masa Lalu dan Masa Kini.pdf" },
      { num: 8, title: "Stop Kami Tak Mau Dijajah Lagi", file: "Modul 8 Sejarah Indonesia Paket C Stop Kami Tak Mau Dijajah Lagi.pdf" },
      { num: 9, title: "Indonesia Merdeka", file: "Modul 9 Sejarah Indonesia Paket C Indonesia Merdeka.pdf" },
      { num: 10, title: "Kemerdekaan Harus Dipertahankan", file: "Modul 10 Sejarah Indonesia Paket C Kemerdekaan Harus Dipertahankan.pdf" },
      { num: 11, title: "Demi Kehormatan Negara", file: "Modul 11 Sejarah Indonesia Paket C Demi Kehormatan Negara.pdf" },
      { num: 12, title: "Dinamisnya Kehidupan Bangsaku", file: "Modul 12 Sejarah Indonesia Paket C Dinamisnya Kehidupan Bangsaku.pdf" },
      { num: 13, title: "Langkah Tegap Pemuda", file: "Modul 13 Sejarah Indonesia Paket C Langkah Tegap Pemuda.pdf" },
      { num: 14, title: "Menjalin Persahabatan Dunia", file: "Modul 14 Sejarah Indonesia Paket C Menjalin Persahabatan Dunia.pdf" },
      { num: 15, title: "Menyongsong Era Kemajuan", file: "Modul 15 Sejarah Indonesia Paket C Menyongsong Era Kemajuan.pdf" },
    ],
  },
  {
    id: "sejarah-peminatan",
    title: "Sejarah Peminatan",
    description: "Modul Sejarah Peminatan untuk Paket C menyediakan materi sejarah lanjutan dan perspektif yang lebih mendalam, setara SMA.",
    modules: [
      { num: 1, title: "Dari Mana Masa Lalu", file: "Modul 1 Sejarah Peminatan Paket C Dari Mana Masa Lalu.pdf" },
      { num: 2, title: "Menyusuri Peristiwa", file: "Modul 2 Sejarah Peminatan Paket C Menyusuri Peristiwa.pdf" },
      { num: 3, title: "Napak Tilas Manusia Indonesia", file: "Modul 3 Sejarah Peminatan Paket C Napak Tilas Manusia Indonesia.pdf" },
      { num: 4, title: "Jejak Peradaban Dunia dalam Konteks Masa Kini", file: "Modul 4 Sejarah Peminatan Paket C Jejak Peradaban Dunia dalam Konteks Masa Kini.pdf" },
      { num: 5, title: "Reportase Sejarah", file: "Modul 5 Sejarah Peminatan Paket C Reportase Sejarah.pdf" },
      { num: 6, title: "Jayalah Maritimku Jayalah Indonesiaku", file: "Modul 6 Sejarah Peminatan Paket C Jayalah Maritimku Jayalah Indonesiaku.pdf" },
      { num: 7, title: "Merancang Masa Depan yang Gemilang", file: "Modul 7 Sejarah Peminatan Paket C Merancang Masa Depan yang Gemilang.pdf" },
      { num: 8, title: "Semangat Melawan Penjajah di Asia Afrika", file: "Modul 8 Sejarah Peminatan Paket C Semangat Melawan Penjajah di Asia Afrika.pdf" },
      { num: 9, title: "Galang Rasa Nasionalisme", file: "Modul 9 Sejarah Peminatan Paket C Galang Rasa Nasionalisme.pdf" },
      { num: 10, title: "Perjuangan Meraih Kemerdekaan", file: "Modul 10 Sejarah Peminatan Paket C Perjuangan Meraih Kemerdekaan.pdf" },
      { num: 11, title: "Lahirnya Macan ASIA", file: "Modul 11 Sejarah Peminatan Paket C Lahirnya Macan ASIA.pdf" },
      { num: 12, title: "Kemajuan Di Era Global", file: "Modul 12 Sejarah Peminatan Paket C Kemajuan Di Era Global.pdf" },
      { num: 13, title: "Merajut Yang Terkoyak", file: "Modul 13 Sejarah Peminatan Paket C Merajut Yang Terkoyak.pdf" },
      { num: 14, title: "Jalinan Organisasi Internasional", file: "Modul 14 Sejarah Peminatan Paket C Jalinan Organisasi Internasional.pdf" },
      { num: 15, title: "Dunia Diambang Batas", file: "Modul 15 Sejarah Peminatan Paket C Dunia Diambang Batas.pdf" },
    ],
  },
  {
    id: "seni-budaya",
    title: "Seni Budaya",
    description: "Modul Seni Budaya untuk Paket C meliputi berbagai aspek seni dan budaya, dirancang untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Keragaman Musik", file: "Modul 1 Seni Budaya Paket C Keragaman Musik.pdf" },
      { num: 2, title: "Kehidupan Sosial Mendayu melalui Musik Tradisional", file: "Modul 2 Seni Budaya Paket C Kehidupan Sosial Mendayu melalui Musik Tradisional.pdf" },
      { num: 3, title: "Musik adalah Hidupku", file: "Modul 3 Seni Budaya Paket C Musik adalah Hidupku.pdf" },
      { num: 4, title: "Harmoni dalam Musik Tradisi", file: "Modul 4 Seni Budaya Paket C Harmoni dalam Musik Tradisi.pdf" },
      { num: 5, title: "Kolaborasi Pertunjukkan Seni Musik Tradisi", file: "Modul 5 Seni Budaya Paket C Kolaborasi Pertunjukkan Seni Musik Tradisi.pdf" },
      { num: 6, title: "Berkenalan dengan Teater", file: "Modul 6 Seni Budaya Paket C Berkenalan dengan Teater.pdf" },
      { num: 7, title: "Aku Calon Aktor", file: "Modul 7 Seni Budaya Paket C Aku Calon Aktor.pdf" },
      { num: 8, title: "Bermain Drama Itu Mengasyikkan", file: "Modul 8 Seni Budaya Paket C Bermain Drama Itu Mengasyikkan.pdf" },
      { num: 9, title: "Naskah Drama dalam Pementasan Teater Modern", file: "Modul 9 Seni Budaya Paket C Naskah Drama dalam Pementasan Teater Modern.pdf" },
      { num: 10, title: "Ayo Kita Bermain Drama", file: "Modul 10 Seni Budaya Paket C Ayo Kita Bermain Drama.pdf" },
      { num: 11, title: "Prinsip Karya Dua Dimensi", file: "Modul 11 Seni Budaya Paket C Prinsip Karya Dua Dimensi.pdf" },
      { num: 12, title: "Serba Serbi Karya Tiga Dimensi", file: "Modul 12 Seni Budaya Paket C Serba Serbi Karya Tiga Dimensi.pdf" },
      { num: 13, title: "Pameran Seni Rupa", file: "Modul 13 Seni Budaya Paket C Pameran Seni Rupa.pdf" },
      { num: 14, title: "Analisa Karya Seni Rupa Dua Dimensi", file: "Modul 14 Seni Budaya Paket C Analisa Karya Seni Rupa Dua Dimensi.pdf" },
      { num: 15, title: "Analisa Karya Seni Rupa Tiga Dimensi", file: "Modul 15 Seni Budaya Paket C Analisa Karya Seni Rupa Tiga Dimensi.pdf" },
    ],
  },
  {
    id: "sosiologi",
    title: "Sosiologi",
    description: "Modul Sosiologi untuk Paket C mempelajari interaksi sosial, struktur masyarakat, dan perubahan sosial, relevan untuk siswa setara SMA.",
    modules: [
      { num: 1, title: "Ada Apa dengan Sosiologi", file: "Modul 1 Sosiologi Paket C Ada Apa dengan Sosiologi.pdf" },
      { num: 2, title: "Budaya Musik", file: "Modul 2 Sosiologi Paket C Budaya Musik.pdf" },
      { num: 3, title: "Menjauhkan yang Dekat Mendekatkan yang Jauh", file: "Modul 3 Sosiologi Paket C Menjauhkan yang Dekat Mendekatkan yang Jauh.pdf" },
      { num: 4, title: "Indahnya Pelangi Masyarakat Indonesia", file: "Modul 4 Sosiologi Paket C Indahnya Pelangi Masyarakat Indonesia.pdf" },
      { num: 5, title: "Meneliti itu Mudah", file: "Modul 5 Sosiologi Paket C Meneliti itu Mudah.pdf" },
      { num: 6, title: "Keunikan Mencari Teman", file: "Modul 6 Sosiologi Paket C Keunikan Mencari Teman.pdf" },
      { num: 7, title: "Menjadi Dokter Sosiologi", file: "Modul 7 Sosiologi Paket C Menjadi Dokter Sosiologi.pdf" },
      { num: 8, title: "Orkestra Kehidupan Sosial", file: "Modul 8 Sosiologi Paket C Orkestra Kehidupan Sosial.pdf" },
      { num: 9, title: "Badai Pasti Berlalu", file: "Modul 9 Sosiologi Paket C Badai Pasti Berlalu.pdf" },
      { num: 10, title: "Bersatu Kita Teguh Bercerai Kita Runtuh", file: "Modul 10 Sosiologi Paket C Bersatu Kita Teguh Bercerai Kita Runtuh.pdf" },
      { num: 11, title: "Warna Warni Kehidupan", file: "Modul 11 Sosiologi Paket C Warna Warni Kehidupan.pdf" },
      { num: 12, title: "Antara Harapan dan Kenyataan", file: "Modul 12 Sosiologi Paket C Antara Harapan dan Kenyataan.pdf" },
      { num: 13, title: "Bertahan Atau Hancur", file: "Modul 13 Sosiologi Paket C Bertahan Atau Hancur.pdf" },
      { num: 14, title: "Kenali Dirimu", file: "Modul 14 Sosiologi Paket C Kenali Dirimu.pdf" },
    ],
  },
];

const totalModules = subjects.reduce((sum, sub) => sum + sub.modules.length, 0);

export default function PaketCModulPage() {
  return (
    <PageShell
      title="Download Modul Paket C"
      description={`eModul Pendidikan Kesetaraan Setara SMA/MA \u2014 ${totalModules} modul dari 16 mata pelajaran. Disediakan gratis oleh Kemdikbud.`}
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
