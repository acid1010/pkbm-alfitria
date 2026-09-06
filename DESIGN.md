# DESIGN.md — PKBM Al-Fitria

Desain sistem portal PKBM Al-Fitria, didokumentasikan dari kode yang ada.
Semua teks antarmuka berbahasa Indonesia. Landasan: Tailwind CSS 3 + shadcn/ui + CVA.

## 1. Brand Identity

| Aspek | Nilai |
|---|---|
| Nama | PKBM Al-Fitria |
| Karakter | Formal-ramah, akademik, terpercaya (sekolah kesetaraan) |
| Perasaan | Navy profesional + aksen emas hangat, latar terang bersih |
| Logo | `/logo.png`, `/logo.jpeg` (juga dipakai sebagai OG image fallback) |
| Bahasa | Indonesia (seluruh UI) |

## 2. Color Tokens

Didefinisikan di `tailwind.config.ts` sebagai skala kustom.

### `oxford` — warna primer (navy)

| Token | Hex | Penggunaan umum di kode |
|---|---|---|
| oxford-50 | `#f4f6f9` | Latar konten portal (`bg-oxford-50`), section terang |
| oxford-100 | `#e3e8f1` | Latar kartu/section sekunder |
| oxford-200 | `#cbd5e5` | Border tipis pada tema navy |
| oxford-300 | `#a3b8d3` | Teks sekunder di atas latar gelap (subtitle hero) |
| oxford-400 | `#7594bc` | Dekorasi blur/glow |
| oxford-500 | `#5376a4` | Aksen sedang |
| oxford-700 | `#354c6f` | Teks heading di latar terang |
| oxford-800 | `#2e415d` | Teks kuat di latar terang |
| oxford-900 | `#0c1a30` | Header gelap, sidebar |
| oxford-950 | `#060d1a` | Hero/header paling gelap (PageShell, landing hero) |

### `gold` — warna aksen

| Token | Hex | Penggunaan umum di kode |
|---|---|---|
| gold-50 | `#fdfaef` | Titik akhir gradient latar body |
| gold-200 | `#f6e4a6` | Badge/border aksen lembut |
| gold-300 | `#f0d170` | Aksen bar gradient, teks highlight di latar gelap |
| gold-400 | `#eabc41` | Ikon aksen, hover |
| gold-500 | `#e0a31e` | Aksen utama: CTA sekunder, garis bawah header, glow dekoratif (`gold-500/5`) |
| gold-600 | `#c38015` | Teks aksen di latar terang (kontras) |

### Netral & status (Tailwind bawaan)

- `slate` — teks utama (`text-slate-800`), border global (`border-slate-200`), varian tombol default shadcn
- `red-600/700` — status destruktif/error
- `emerald`/`green` — status sukses/HADIR/APPROVED (badge)
- `amber`/`yellow` — status pending/peringatan
- `indigo` — selection highlight (`selection:bg-indigo-100 selection:text-indigo-900`)

### Latar & gradien

- Body: `linear-gradient(135deg, #f4f6f9 0%, #f8fafc 50%, #fdfaef 100%)` (oxford-50 → slate-50 → gold-50) di `app/globals.css`
- Halaman portal: `bg-oxford-50/50`
- Header gelap: `bg-oxford-950` + glow dekoratif blur besar (`bg-gold-500/5`, `bg-oxford-400/10`)

## 3. Typography

Dimuat via `next/font/google` di `app/layout.tsx`, diekspos sebagai CSS variable.

| Role | Font | Variable | Class Tailwind | Gaya khas |
|---|---|---|---|---|
| Body / UI | Plus Jakarta Sans | `--font-sans` | `font-sans` (default) | `antialiased`, `text-slate-800` |
| Heading / display | Playfair Display | `--font-heading` | `font-heading` | `font-bold tracking-tight`, ukuran 4xl–6xl |

Skala yang dipakai:

- H1 hero: `font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight`
- Subtitle hero: `text-lg text-oxford-300 font-medium leading-relaxed`
- Judul kartu: `font-heading text-xl` / `text-2xl font-semibold`
- Body: `text-base` / `leading-relaxed` untuk paragraf panjang

Catatan: `@fontsource/lora` dan `@fontsource/outfit` terpasang di `package.json` tetapi **tidak dipakai** — jangan gunakan untuk konsistensi (kandidat dihapus).

## 4. Radius, Shadow & Spacing

Statistik pemakaian aktual di kode (paling umum dulu):

| Token | Pemakaian |
|---|---|
| `rounded-2xl` | Kartu konten, panel, gambar galeri (dominan) |
| `rounded-full` | Avatar, badge, pill, ikon bulat |
| `rounded-xl` | Kartu kecil, input area |
| `rounded-md` | Tombol (shadcn default) |
| `rounded-lg` | Elemen antara |

Shadow: `shadow-sm` (kartu default) → `shadow-md`/`shadow-lg` (hover/hero) → `shadow-xl/2xl` (modal, elemen mengambang).

Spacing halaman:

- Kontainer: `container mx-auto px-6 lg:px-12 max-w-[1200px]` (halaman publik)
- Portal (admin/guru/siswa): `max-w-7xl` + `px-4 py-8 lg:px-8`, navbar atas + sidebar kiri (`md:flex-row`)
- Section vertikal: `py-16 lg:py-24`, header PageShell `py-20 md:py-28`

## 5. Animasi (app/globals.css)

Keyframes kustom + utilitas: `animate-fade-in-up` (0.7s, translateY 24px), `animate-fade-in`, `animate-slide-in-left/right`, `animate-float` (4s loop), `animate-pulse-soft`. Delay stagger: `.delay-100`–`.delay-700`. Semua dinonaktifkan lewat `prefers-reduced-motion: reduce`.

## 6. Komponen

### Primitif shadcn/ui (`components/ui/`)

`button`, `card`, `dialog`, `form`, `input`, `select`, `table`, `badge`, `tabs`, `toast`/`toaster` + `use-toast` (dari `sonner`-style API Radix).

Tombol (CVA, `components/ui/button.tsx`):

- Varian: `default` (slate-900), `secondary`, `outline`, `ghost`, `destructive`
- Ukuran: `default` (h-9), `sm`, `lg`, `icon`
- `asChild` via Radix Slot

Catatan: varian tombol masih bawaan shadcn (slate), **bukan** oxford/gold — halaman publik menimpa warna lewat `className` (mis. `bg-gold-500 hover:bg-gold-600` atau oxford). Pertahankan pola ini sampai varian brand ditambahkan.

### Komponen aplikasi (`components/shared/`)

| Komponen | Fungsi |
|---|---|
| `PageShell` | Hero header gelap (oxford-950 + glow + bar gold) + area konten; wajib untuk halaman publik |
| `Navbar` | Navigasi atas |
| `Sidebar` | Menu portal dengan `items` + `title` (admin/guru/siswa) |
| `Footer` | Footer situs |
| `DataTable` | Wrapper `@tanstack/react-table` |
| `StatCard` | Kartu statistik dashboard |
| `StructuredData` | JSON-LD (Organization, FAQ, Article) |

### Ikon

`lucide-react` — stroke default, ukuran 16–24px, dibungkus kontainer `rounded-full` bila perlu latar.

## 7. Pola Layout Halaman

1. **Publik**: `(public)/layout.tsx` → Navbar + konten + Footer. Halaman memakai `PageShell` untuk header gelap bertema.
2. **Portal** (admin/guru/siswa): layout role-guarded → Navbar global + `<Sidebar title="Portal X" items={menu} currentPath="/prefix">` + konten di `bg-oxford-50`.
3. **Auth**: layar tunggu terpusat, branding navy/gold.

Aturan: judul halaman portal memakai `font-heading`; data padat (tabel) tetap `font-sans`.

## 8. Aksesibilitas

- `scroll-behavior: smooth` + fallback `auto` untuk reduced-motion
- Semua animasi dimatikan saat `prefers-reduced-motion`
- Fokus ring pada tombol (`focus-visible:ring-1`)
- Kontras: teks di atas oxford-950 memakai putih/oxford-300; teks aksen di latar terang minimal gold-600

## 9. Kapan Menambah Apa

- Elemen baru di halaman publik → ikuti `PageShell` + kartu `rounded-2xl shadow-sm`
- Elemen portal → kartu `rounded-xl/2xl` di atas `bg-oxford-50/50`, tabel via `DataTable`
- Aksi utama → tombol oxford/gold via className override; aksi sehari-hari → varian shadcn default
- Jangan menambah font/depensi gaya baru; pakai skala oxford/gold yang ada
