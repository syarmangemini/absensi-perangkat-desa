import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import AttendanceStatusCard from '../components/dashboard/AttendanceStatusCard'
import StatsBento from '../components/dashboard/StatsBento'
import WeeklyTrend from '../components/dashboard/WeeklyTrend'
import Announcements from '../components/dashboard/Announcements'
import { profile, attendance, stats, announcements } from '../data'
import { getPengumuman } from '../lib/db'

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
  const clockIn = recorded || attendance.clockIn
  const status = recorded ? 'Sudah Presensi' : attendance.status

  const [items, setItems] = useState(announcements)

  useEffect(() => {
    let active = true
    getPengumuman()
      .then((rows) => {
        if (active && rows.length) setItems(rows.map(mapPengumuman))
      })
      .catch(() => {
        /* fall back to static data */
      })
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
            Halo, {profile.name}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {profile.role} • {profile.village}
          </p>
        </section>

        <AttendanceStatusCard status={status} clockIn={clockIn} />

        <StatsBento stats={stats} />

        <WeeklyTrend />

        <Announcements items={items} />
      </main>
      <BottomNav />
    </div>
  )
}
