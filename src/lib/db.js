import { supabase, CURRENT_USER_ID } from './supabase'

// Ambil profil perangkat desa
export async function getProfile(id = CURRENT_USER_ID) {
  const { data, error } = await supabase
    .from('perangkat_desa')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
}

// Ambil daftar pengumuman (terbaru duluan)
export async function getPengumuman(limit = 10) {
  const { data, error } = await supabase
    .from('pengumuman')
    .select('*')
    .order('tanggal', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

// Ambil presensi satu bulan untuk user tertentu
export async function getPresensiBulan(userId = CURRENT_USER_ID, year, monthIndex) {
  const start = `${year}-${String(monthIndex + 1).padStart(2, '0')}-01`
  const end = `${year}-${String(monthIndex + 1).padStart(2, '0')}-31`
  const { data, error } = await supabase
    .from('presensi')
    .select('tanggal, status, jam_masuk, jam_pulang, keterangan')
    .eq('perangkat_id', userId)
    .gte('tanggal', start)
    .lte('tanggal', end)
    .order('tanggal', { ascending: true })
  if (error) throw error
  return data || []
}

// Ambil presensi pada tanggal tertentu (default: hari ini)
export async function getTodayPresensi(userId = CURRENT_USER_ID, tanggal) {
  const tgl = tanggal || new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('presensi')
    .select('*')
    .eq('perangkat_id', userId)
    .eq('tanggal', tgl)
    .maybeSingle()
  if (error) throw error
  return data
}

// Agregat statistik dari bulan terakhir yang memiliki data presensi
export async function getPresensiStats(userId = CURRENT_USER_ID) {
  const { data, error } = await supabase
    .from('presensi')
    .select('tanggal, status')
    .eq('perangkat_id', userId)
    .order('tanggal', { ascending: false })
  if (error) throw error
  if (!data || !data.length) return null

  const latestMonth = data[0].tanggal.slice(0, 7) // 'YYYY-MM'
  const monthRows = data.filter((r) => r.tanggal.slice(0, 7) === latestMonth)
  const counts = { hadir: 0, izin: 0, alpha: 0, sakit: 0, dinas: 0 }
  monthRows.forEach((r) => {
    if (counts[r.status] != null) counts[r.status] += 1
  })
  const [y, m] = latestMonth.split('-').map(Number)
  const monthLabel = new Date(y, m - 1, 1).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  })
  return { monthLabel, counts }
}

// Catat / perbarui presensi (upsert per user+tanggal)
export async function insertPresensi({
  userId = CURRENT_USER_ID,
  tanggal,
  status = 'hadir',
  jamMasuk,
  jamPulang = null,
  keterangan = null,
  lokasi = null,
  fotoUrl = null,
}) {
  const { data, error } = await supabase
    .from('presensi')
    .upsert(
      {
        perangkat_id: userId,
        tanggal,
        status,
        jam_masuk: jamMasuk,
        jam_pulang: jamPulang,
        keterangan,
        lokasi,
        foto_url: fotoUrl,
      },
      { onConflict: 'perangkat_id,tanggal' }
    )
    .select()
    .single()
  if (error) throw error
  return data
}
