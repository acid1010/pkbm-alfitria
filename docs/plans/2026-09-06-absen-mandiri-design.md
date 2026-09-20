# Absen Mandiri Siswa — Design

Tanggal: 2026-09-06 · Status: disetujui

## Ringkasan

Siswa absen kehadiran (HADIR) sendiri tanpa login: pilih kelas → pilih nama →
selfie → tercatat dengan waktu server. Halaman publik `/absensi` untuk kiosk/QR
code di sekolah, plus rekap read-only di portal guru.

## Keputusan

| Topik | Keputusan |
|---|---|
| Lokasi | Halaman publik `/absensi`, di luar route group terproteksi |
| Data | Tabel `Attendance` untuk murid dan `TeacherAttendance` untuk guru; selfie/check-in tetap tercatat sebagai HADIR |
| Anti-duplikat | Unique `(studentId, classId, date)` yang sudah ada; check-in kedua ditolak |
| DB | PostgreSQL — tanpa demo mode, query Prisma langsung |
| Selfie | Filesystem privat pada `SELFIE_UPLOAD_DIR`, akses via route guru terautentikasi |
| Retensi | Purge otomatis 30 hari (berkas selfie dihapus, `selfieUrl` di-null, baris absensi tetap) |
| Waktu | Store UTC; "hari ini" dihitung di WIB (Asia/Jakarta); tampilan WIB |
| Window | 24 jam, catat waktu aktual tanpa aturan jam masuk |
| Status | HADIR saja — izin/sakit tetap urusan guru (fitur guru terpisah) |
| Anti-abuse | Rate limit per-IP (`lib/rate-limit.ts`), validasi file JPG/PNG ≤5MB |
| Guru | Halaman `/guru/absensi` read-only: pilih kelas + tanggal → status, jam, thumbnail selfie |
| Kiosk | `/absensi/murid` untuk murid dan `/absensi/guru` untuk guru |
| Akses selfie | Guru hanya selfie kelasnya; admin semua selfie melalui `/admin/absensi` |

## Alur

1. Siswa pilih kelas (dropdown, dari DB)
2. Server action `getSiswaByKelas(classId)` → daftar nama siswa kelas itu
3. Siswa pilih nama → ambil selfie (`<input type="file" accept="image/*" capture="user">` — kamera depan native, tanpa getUserMedia)
4. Server action `absenAction`: validasi → hitung tanggal WIB → cek duplikat → simpan selfie ke filesystem privat → upsert `Attendance` HADIR + `checkInAt` + `selfieUrl`
5. Layar sukses: nama + jam WIB + tombol "Absen untuk siswa lain" (mode kiosk)

## ERD (perubahan saja)

```
Attendance {
  ...yang sudah ada
  selfieUrl  String?   // path relatif di SELFIE_UPLOAD_DIR
  checkInAt  DateTime? // UTC saat check-in
}

TeacherAttendance {
  teacherId String
  date      DateTime
  status    AttendanceStatus // HADIR dari kiosk guru
  selfieUrl String?
  checkInAt DateTime?
}
```

Relasi tidak berubah: Class → Student (classId) → Attendance (studentId, classId).

## Komponen

- `app/absensi/page.tsx` — server component, muat daftar kelas, metadata `robots: noindex`
- `app/absensi/absen-form.tsx` — client component wizard 3 langkah
- `app/absensi/actions.ts` — `getSiswaByKelas`, `absenAction`
- `lib/selfie-storage.ts` — private filesystem storage helper
- `app/(guru)/guru/absensi/page.tsx` — rewrite rekap read-only (`searchParams`: classId, date)

## Purge 30 hari

Sekali per hari WIB, dipicu request `absenAction` pertama (state modul, tanpa cron):
cari baris `selfieUrl != null && checkInAt < now-30d` → hapus berkas lokal → `selfieUrl = null`.

## Setup

`.env.local`: `DATABASE_URL`, `DIRECT_URL`, dan `SELFIE_UPLOAD_DIR`.
Pada VPS, arahkan `SELFIE_UPLOAD_DIR` ke direktori persisten di luar public web root.
Lalu `npm run db:migrate && npm run db:seed` (opsional).

## Di luar cakupan

Input manual guru (HADIR/IZIN/SAKIT/ALPHA), verifikasi wajah, izin/sakit dari
halaman publik, notifikasi.
