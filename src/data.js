export const profile = {
  name: 'Budi',
  role: 'Sekretaris Desa',
  village: 'Desa Sukamaju',
}

export const profileDetail = {
  name: 'Budi Santoso, S.Sos.',
  nip: '19850412 201101 1 003',
  status: 'Aktif',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAeyGYz1lp_I9Uml2bRsKnodB2Lh1VazQZyfIHWg08zYv-ZKA0y6BRwDGopO7uqRLvNE1lN88rmMou_ngJarUA8Jqwes4G0AuTmqIfLTrrKOB0Y4VRPEManisYjsBXU_CzxzLvDEaImvaw534hkoPVl1eCEGf4qodch6-e2r7zkmYg-JR-wtV6Eb3YWA41y7gjEa25WMSWR1Y-bF11XoQj5-iGaJ0Z4-F47W3TYk6Z4onecrFHt6HhEgk6nPMIeJq_K9pbVzW6zmQ',
  position: 'Sekretaris Desa (Sekdes)',
  unit: 'Kantor Desa Sukamaju',
  phone: '+62 812-3456-7890',
  address: 'Jl. Melati No. 45, Desa Sukamaju, Kec. Ceria, Kab. Sejahtera',
  appVersion: 'v2.4.0',
}

export const attendance = {
  status: 'Sudah Presensi',
  clockIn: '07:45',
}

export const stats = {
  totalHadir: 22,
  sakit: 1,
  izin: 2,
  dinas: 4,
  alpa: 0,
}

// ---- Riwayat Presensi ----
// status: 'hadir' | 'izin' | 'alpha' | null (libur/tidak ada data)
function buildDays(year, monthIndex, overrides = {}) {
  const total = new Date(year, monthIndex + 1, 0).getDate()
  const days = []
  for (let d = 1; d <= total; d++) {
    const dow = new Date(year, monthIndex, d).getDay()
    const isWeekend = dow === 0 || dow === 6
    if (overrides[d]) {
      days.push({ day: d, ...overrides[d] })
    } else if (isWeekend) {
      days.push({ day: d, status: null })
    } else {
      days.push({ day: d, status: 'hadir', login: '07:55', logout: '16:05' })
    }
  }
  return days
}

export const historyMonths = [
  {
    key: '2023-10',
    label: 'Oktober 2023',
    year: 2023,
    monthIndex: 9,
    highlightDay: null,
    days: buildDays(2023, 9, {
      12: { status: 'izin', note: 'Sakit (Surat Dokter)' },
      20: { status: 'alpha' },
      25: { status: 'hadir', login: '08:10', logout: '16:00' },
    }),
  },
  {
    key: '2023-11',
    label: 'November 2023',
    year: 2023,
    monthIndex: 10,
    highlightDay: 15,
    days: buildDays(2023, 10, {
      7: { status: 'izin', note: 'Dinas Luar (Rapat Kecamatan)' },
      10: { status: 'alpha' },
      15: { status: 'hadir', login: '07:55', logout: '16:05' },
      13: { status: 'izin', note: 'Dinas Luar (Rapat Kecamatan)' },
      14: { status: 'alpha' },
    }),
  },
  {
    key: '2023-12',
    label: 'Desember 2023',
    year: 2023,
    monthIndex: 11,
    highlightDay: null,
    days: buildDays(2023, 11, {
      5: { status: 'izin', note: 'Cuti Tahunan' },
      18: { status: 'alpha' },
      24: { status: 'hadir', login: '08:00', logout: '14:00' },
    }),
  },
]

export const announcements = [
  {
    icon: 'groups',
    iconBg: 'bg-tertiary-container',
    iconClass: 'text-white',
    title: 'Rapat Mingguan Perangkat',
    desc: 'Evaluasi program kerja bulan Oktober dan persiapan musrenbang...',
    date: '15 Okt • 09:00 WIB',
    badge: 'Baru',
  },
  {
    icon: 'volunteer_activism',
    iconBg: 'bg-secondary-container',
    iconClass: 'text-on-secondary-container',
    title: 'Kerja Bakti Lingkungan',
    desc: 'Pembersihan saluran irigasi bersama warga RW 04 dan RW 05...',
    date: 'Minggu, 18 Okt • 07:00 WIB',
  },
]
