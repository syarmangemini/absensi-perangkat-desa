-- ============================================================
--  Schema Presensi Perangkat Desa (Supabase / Postgres)
--  Jalankan seluruh isi file ini di: Supabase Dashboard
--  > SQL Editor > New query > Run
-- ============================================================

-- ID demo perangkat yang digunakan sebagai CURRENT_USER_ID di frontend
-- (harus sama dengan nilai di src/lib/supabase.js)
-- '00000000-0000-0000-0000-000000000001'

-- ------------------------------------------------------------
-- 1. Tabel perangkat_desa (profil perangkat desa)
-- ------------------------------------------------------------
create table if not exists public.perangkat_desa (
  id uuid primary key default gen_random_uuid(),
  nip text,
  nama text not null,
  jabatan text,
  unit_kerja text,
  telepon text,
  alamat text,
  status_kepegawaian text default 'Aktif',
  foto_url text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- 2. Tabel presensi (rekam kehadiran harian)
-- ------------------------------------------------------------
create table if not exists public.presensi (
  id uuid primary key default gen_random_uuid(),
  perangkat_id uuid not null references public.perangkat_desa(id) on delete cascade,
  tanggal date not null,
  status text not null check (status in ('hadir','izin','alpha','sakit','dinas')),
  jam_masuk time,
  jam_pulang time,
  keterangan text,
  lokasi text,
  foto_url text,
  created_at timestamptz default now(),
  unique (perangkat_id, tanggal)
);

create index if not exists idx_presensi_user_tanggal
  on public.presensi (perangkat_id, tanggal);

-- ------------------------------------------------------------
-- 3. Tabel pengumuman (pengumuman desa)
-- ------------------------------------------------------------
create table if not exists public.pengumuman (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  isi text,
  tanggal date,
  kategori text,   -- 'rapat' | 'sosial' | 'umum'
  badge text,      -- mis. 'Baru'
  created_at timestamptz default now()
);

create index if not exists idx_pengumuman_tanggal
  on public.pengumuman (tanggal desc);

-- ============================================================
--  Row Level Security
--  (anon key dipakai di client, sehingga dibuka untuk baca publik
--   dan insert presensi demi keperluan demo)
-- ============================================================
alter table public.perangkat_desa enable row level security;
alter table public.presensi      enable row level security;
alter table public.pengumuman    enable row level security;

-- Baca publik
drop policy if exists "publik_baca_perangkat" on public.perangkat_desa;
create policy "publik_baca_perangkat" on public.perangkat_desa
  for select using (true);

drop policy if exists "publik_baca_presensi" on public.presensi;
create policy "publik_baca_presensi" on public.presensi
  for select using (true);

drop policy if exists "publik_baca_pengumuman" on public.pengumuman;
create policy "publik_baca_pengumuman" on public.pengumuman
  for select using (true);

-- Insert presensi (demo, tanpa auth)
drop policy if exists "publik_insert_presensi" on public.presensi;
create policy "publik_insert_presensi" on public.presensi
  for insert with check (true);

-- ============================================================
--  Seed Data
-- ============================================================

-- Profil demo (Budi Santoso)
insert into public.perangkat_desa (id, nip, nama, jabatan, unit_kerja, telepon, alamat, status_kepegawaian)
values (
  '00000000-0000-0000-0000-000000000001',
  '19850412 201101 1 003',
  'Budi Santoso, S.Sos.',
  'Sekretaris Desa (Sekdes)',
  'Kantor Desa Sukamaju',
  '+62 812-3456-7890',
  'Jl. Melati No. 45, Desa Sukamaju, Kec. Ceria, Kab. Sejahtera',
  'Aktif'
)
on conflict (id) do nothing;

-- Presensi November 2023 (weekday = hadir, kecuali override)
insert into public.presensi (perangkat_id, tanggal, status, jam_masuk, jam_pulang)
select '00000000-0000-0000-0000-000000000001'::uuid, d::date, 'hadir', '07:55', '16:05'
from generate_series('2023-11-01'::date, '2023-11-30'::date, '1 day') as d
where extract(dow from d) not in (0, 6)
on conflict (perangkat_id, tanggal) do nothing;

update public.presensi
  set status = 'izin', keterangan = 'Dinas Luar (Rapat Kecamatan)'
  where perangkat_id = '00000000-0000-0000-0000-000000000001'::uuid and tanggal = '2023-11-07';

update public.presensi
  set status = 'alpha', jam_masuk = null, jam_pulang = null
  where perangkat_id = '00000000-0000-0000-0000-000000000001'::uuid and tanggal = '2023-11-10';

-- Presensi Oktober 2023
insert into public.presensi (perangkat_id, tanggal, status, jam_masuk, jam_pulang, keterangan)
select '00000000-0000-0000-0000-000000000001'::uuid, d::date, 'hadir', '07:55', '16:05', null
from generate_series('2023-10-01'::date, '2023-10-31'::date, '1 day') as d
where extract(dow from d) not in (0, 6)
on conflict (perangkat_id, tanggal) do nothing;

update public.presensi
  set status = 'izin', keterangan = 'Sakit (Surat Dokter)'
  where perangkat_id = '00000000-0000-0000-0000-000000000001'::uuid and tanggal = '2023-10-12';

update public.presensi
  set status = 'alpha', jam_masuk = null, jam_pulang = null
  where perangkat_id = '00000000-0000-0000-0000-000000000001'::uuid and tanggal = '2023-10-20';

-- Presensi Desember 2023
insert into public.presensi (perangkat_id, tanggal, status, jam_masuk, jam_pulang, keterangan)
select '00000000-0000-0000-0000-000000000001'::uuid, d::date, 'hadir', '07:55', '16:05', null
from generate_series('2023-12-01'::date, '2023-12-31'::date, '1 day') as d
where extract(dow from d) not in (0, 6)
on conflict (perangkat_id, tanggal) do nothing;

update public.presensi
  set status = 'izin', keterangan = 'Cuti Tahunan'
  where perangkat_id = '00000000-0000-0000-0000-000000000001'::uuid and tanggal = '2023-12-05';

update public.presensi
  set status = 'alpha', jam_masuk = null, jam_pulang = null
  where perangkat_id = '00000000-0000-0000-0000-000000000001'::uuid and tanggal = '2023-12-18';

-- Pengumuman
insert into public.pengumuman (judul, isi, tanggal, kategori, badge)
values
  ('Rapat Mingguan Perangkat', 'Evaluasi program kerja bulan Oktober dan persiapan musrenbang.', '2023-10-15', 'rapat', 'Baru'),
  ('Kerja Bakti Lingkungan', 'Pembersihan saluran irigasi bersama warga RW 04 dan RW 05.', '2023-10-18', 'sosial', null)
on conflict do nothing;
