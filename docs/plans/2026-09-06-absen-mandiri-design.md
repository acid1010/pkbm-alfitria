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
| Data | Reuse tabel `Attendance` — kolom baru `selfieUrl`, `checkInAt`; baris self check-in = HADIR |
| Anti-duplikat | Unique `(studentId, classId, date)` yang sudah ada; check-in kedua ditolak |
| DB | Supabase Postgres — tanpa demo mode, query Prisma langsung |
| Selfie | Supabase Storage, bucket privat `selfies`, akses via signed URL 1 jam |
| Retensi | Purge otomatis 30 hari (objek storage dihapus, `selfieUrl` di-null, baris absensi tetap) |
| Waktu | Store UTC; "hari ini" dihitung di WIB (Asia/Jakarta); tampilan WIB |
| Window | 24 jam, catat waktu aktual tanpa aturan jam masuk |
| Status | HADIR saja — izin/sakit tetap urusan guru (fitur guru terpisah) |
| Anti-abuse | Rate limit per-IP (`lib/rate-limit.ts`), validasi file JPG/PNG ≤5MB |
| Guru | Halaman `/guru/absensi` read-only: pilih kelas + tanggal → status, jam, thumbnail selfie |

## Alur

1. Siswa pilih kelas (dropdown, dari DB)
2. Server action `getSiswaByKelas(classId)` → daftar nama siswa kelas itu
3. Siswa pilih nama → ambil selfie (`<input type="file" accept="image/*" capture="user">` — kamera depan native, tanpa getUserMedia)
4. Server action `absenAction`: validasi → hitung tanggal WIB → cek duplikat → unggah selfie ke Storage → upsert `Attendance` HADIR + `checkInAt` + `selfieUrl`
5. Layar sukses: nama + jam WIB + tombol "Absen untuk siswa lain" (mode kiosk)

## ERD (perubahan saja)

```
Attendance {
  ...yang sudah ada
  selfieUrl  String?   // path di bucket Supabase, bukan signed URL
  checkInAt  DateTime? // UTC saat check-in
}
```

Relasi tidak berubah: Class → Student (classId) → Attendance (studentId, classId).

## Komponen

- `app/absensi/page.tsx` — server component, muat daftar kelas, metadata `robots: noindex`
- `app/absensi/absen-form.tsx` — client component wizard 3 langkah
- `app/absensi/actions.ts` — `getSiswaByKelas`, `absenAction`
- `lib/supabase.ts` — singleton admin client (service role, server-only)
- `app/(guru)/guru/absensi/page.tsx` — rewrite rekap read-only (`searchParams`: classId, date)

## Purge 30 hari

Sekali per hari WIB, dipicu request `absenAction` pertama (state modul, tanpa cron):
cari baris `selfieUrl != null && checkInAt < now-30d` → hapus objek storage → `selfieUrl = null`.

## Setup

`.env.local`: `DATABASE_URL` (Supabase pooler :6543, `pgbouncer=true`),
`DIRECT_URL` (:5432 untuk migrate), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
Lalu `npm run db:migrate && npm run db:seed` (opsional).

## Di luar cakupan

Input manual guru (HADIR/IZIN/SAKIT/ALPHA), verifikasi wajah, izin/sakit dari
halaman publik, notifikasi.
