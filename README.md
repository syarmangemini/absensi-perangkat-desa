# Absensi Perangkat Desa

Aplikasi web dashboard presensi untuk perangkat desa, dibangun dengan **React + Vite** dan **Tailwind CSS**. Desain terinspirasi dari Material 3 (tonal layers, warna `primary`/`secondary`/`tertiary`).

## Fitur
- Dashboard utama: status presensi harian, statistik bulanan (bento grid), tren kehadiran mingguan, dan pengumuman desa.
- Navigasi bawah (BottomNav) dengan routing: Beranda, Presensi, Riwayat, Profil.
- Tema gelap (dark mode) siap pakai via class `dark`.

## Struktur
```
src/
  components/        UI bersama (TopAppBar, BottomNav, Icon, PlaceholderPage)
  components/dashboard/  Kartu-kartu dashboard
  pages/             Dashboard, Presensi, Riwayat, Profil
  data.js            Data contoh (mock)
  App.jsx, main.jsx  Router & entry point
tailwind.config.js   Tema warna & tipografi sesuai desain
```

## Cara menjalankan
Pastikan Node.js sudah terpasang, lalu:

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
