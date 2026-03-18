export const demoPrograms = [
  { name: "Paket A-1", grade: 7, year: "2025/2026" },
  { name: "Paket B-1", grade: 9, year: "2025/2026" },
  { name: "Paket C-1", grade: 12, year: "2025/2026" },
];

export const demoNews = [
  {
    id: "demo-news-1",
    title: "Pembukaan PPDB Tahun Ajaran 2026",
    slug: "pembukaan-ppdb-2026",
    content: "Pendaftaran peserta didik baru telah resmi dibuka. Silakan lengkapi formulir PPDB online melalui portal ini.",
    publishedAt: new Date("2026-03-01T08:00:00.000Z"),
  },
  {
    id: "demo-news-2",
    title: "Jadwal Ujian Semester Genap",
    slug: "jadwal-ujian-semester-genap",
    content: "Pelaksanaan ujian semester genap dimulai pekan depan. Peserta didik diminta mempersiapkan diri sesuai jadwal masing-masing.",
    publishedAt: new Date("2026-03-10T08:00:00.000Z"),
  },
];

export const demoPpdbRows = [
  {
    id: "demo-ppdb-1",
    registrationNumber: "PPDB-2026-0001",
    name: "Pendaftar Demo 1",
    phone: "08211000001",
    status: "PENDING" as const,
    createdAt: new Date("2026-03-01T08:00:00.000Z"),
    birthdate: new Date("2000-01-01T08:00:00.000Z"),
    address: "Alamat Demo 1",
    documents: [],
  },
  {
    id: "demo-ppdb-2",
    registrationNumber: "PPDB-2026-0002",
    name: "Pendaftar Demo 2",
    phone: "08211000002",
    status: "APPROVED" as const,
    createdAt: new Date("2026-03-02T08:00:00.000Z"),
    birthdate: new Date("2000-02-02T08:00:00.000Z"),
    address: "Alamat Demo 2",
    documents: [],
  },
];
