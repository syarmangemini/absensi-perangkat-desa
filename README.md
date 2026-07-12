# Absensi Perangkat Desa

Aplikasi web dashboard presensi untuk perangkat desa, dibangun dengan **React + Vite**, **Tailwind CSS**, dan **Supabase** sebagai backend/database. Desain terinspirasi dari Material 3 (tonal layers, warna `primary`/`secondary`/`tertiary`).

## Fitur
- Dashboard utama: status presensi harian, statistik bulanan (bento grid), tren kehadiran mingguan, dan pengumuman desa (diambil dari tabel `pengumuman`).
- Presensi: verifikasi wajah via kamera, lalu menyimpan kehadiran ke tabel `presensi` di Supabase.
- Riwayat: kalender + log presensi per bulan, diambil dari tabel `presensi` (tombol "Rekap Bulanan" mengunduh CSV).
- Profil perangkat desa (data dari tabel `perangkat_desa`).
- Navigasi bawah (BottomNav) dengan routing: Beranda, Presensi, Riwayat, Profil.
- Tema gelap (dark mode) siap pakai via class `dark`.

## Struktur
```
src/
  components/        UI bersama (TopAppBar, BottomNav, Icon, PlaceholderPage)
  components/dashboard/  Kartu-kartu dashboard
  lib/               supabase.js (client) & db.js (akses data)
  pages/             Dashboard, Presensi, Riwayat, Profil
  data.js            Data contoh (fallback saat DB kosong)
  App.jsx, main.jsx  Router & entry point
supabase/schema.sql  Skema tabel + RLS + seed data
tailwind.config.js   Tema warna & tipografi sesuai desain
```

## Setup Supabase
1. Buat project di https://supabase.com.
2. Buka **SQL Editor**, jalankan isi `supabase/schema.sql` (membuat tabel `perangkat_desa`, `presensi`, `pengumuman`, RLS, dan seed data demo).
3. Salin `.env.example` menjadi `.env` dan isi `VITE_SUPABASE_URL` serta `VITE_SUPABASE_ANON_KEY` (dari Project Settings > API).

## Cara menjalankan
```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

Build produksi:
```bash
npm run build
npm run preview
```
