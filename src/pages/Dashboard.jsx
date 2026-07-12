import { useLocation } from 'react-router-dom'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import AttendanceStatusCard from '../components/dashboard/AttendanceStatusCard'
import StatsBento from '../components/dashboard/StatsBento'
import WeeklyTrend from '../components/dashboard/WeeklyTrend'
import Announcements from '../components/dashboard/Announcements'
import { profile, attendance, stats, announcements } from '../data'

export default function Dashboard() {
  const location = useLocation()
  const recorded = location.state?.checkIn
  const clockIn = recorded || attendance.clockIn
  const status = recorded ? 'Sudah Presensi' : attendance.status

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

        <Announcements items={announcements} />
      </main>
      <BottomNav />
    </div>
  )
}
