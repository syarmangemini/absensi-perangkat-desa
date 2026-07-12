import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import AttendanceStatusCard from '../components/dashboard/AttendanceStatusCard'
import StatsBento from '../components/dashboard/StatsBento'
import WeeklyTrend from '../components/dashboard/WeeklyTrend'
import Announcements from '../components/dashboard/Announcements'
import { profile, attendance, stats, announcements } from '../data'
import { getPengumuman, getProfile, getTodayPresensi, getPresensiStats } from '../lib/db'

const ICON_BY_CATEGORY = {
  rapat: { icon: 'groups', iconBg: 'bg-tertiary-container', iconClass: 'text-white' },
  sosial: { icon: 'volunteer_activism', iconBg: 'bg-secondary-container', iconClass: 'text-on-secondary-container' },
  umum: { icon: 'campaign', iconBg: 'bg-primary-fixed', iconClass: 'text-primary' },
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']

function formatTanggal(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

function mapPengumuman(p) {
  const style = ICON_BY_CATEGORY[p.kategori] || ICON_BY_CATEGORY.umum
  return {
    icon: style.icon,
    iconBg: style.iconBg,
    iconClass: style.iconClass,
    title: p.judul,
    desc: p.isi,
    date: formatTanggal(p.tanggal),
    badge: p.badge || undefined,
  }
}

export default function Dashboard() {
  const location = useLocation()
  const recorded = location.state?.checkIn

  const [name, setName] = useState(profile.name)
  const [today, setToday] = useState({
    status: recorded ? 'Sudah Presensi' : attendance.status,
    clockIn: recorded || attendance.clockIn,
  })
  const [statsData, setStatsData] = useState(stats)
  const [items, setItems] = useState(announcements)

  useEffect(() => {
    let active = true

    getProfile()
      .then((row) => {
        if (active && row?.nama) setName(row.nama)
      })
      .catch(() => {})

    getTodayPresensi()
      .then((row) => {
        if (!active) return
        if (row) {
          setToday({
            status: row.status === 'hadir' ? 'Sudah Presensi' : 'Belum Presensi',
            clockIn: row.jam_masuk || '--:--',
          })
        }
      })
      .catch(() => {})

    getPresensiStats()
      .then((res) => {
        if (!active || !res) return
        setStatsData({
          totalHadir: res.counts.hadir,
          sakit: res.counts.sakit,
          izin: res.counts.izin,
          dinas: res.counts.dinas,
          alpa: res.counts.alpha,
        })
      })
      .catch(() => {})

    getPengumuman()
      .then((rows) => {
        if (active && rows.length) setItems(rows.map(mapPengumuman))
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="bg-surface pb-24 text-on-surface">
      <TopAppBar />
      <main className="mx-auto mt-16 max-w-2xl space-y-lg px-margin-mobile">
        <section className="py-md">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Halo, {name}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {profile.role} • {profile.village}
          </p>
        </section>

        <AttendanceStatusCard status={today.status} clockIn={today.clockIn} />

        <StatsBento stats={statsData} />

        <WeeklyTrend />

        <Announcements items={items} />
      </main>
      <BottomNav />
    </div>
  )
}
