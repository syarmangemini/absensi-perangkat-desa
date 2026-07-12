import { useMemo, useState } from 'react'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { historyMonths } from '../data'

const STATUS_LABEL = { hadir: 'Hadir', izin: 'Izin', alpha: 'Alpha' }

function dateLabel(year, monthIndex, day) {
  return new Date(year, monthIndex, day).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function countStatus(days) {
  return days.reduce(
    (acc, d) => {
      if (d.status) acc[d.status] = (acc[d.status] || 0) + 1
      return acc
    },
    { hadir: 0, izin: 0, alpha: 0 }
  )
}

// Build a Monday-first calendar grid including leading/trailing adjacent-month days
function buildCalendar(month) {
  const { year, monthIndex, days, highlightDay } = month
  const firstDow = new Date(year, monthIndex, 1).getDay() // 0 Sun .. 6 Sat
  const offset = (firstDow + 6) % 7 // Monday-start offset
  const prevTotal = new Date(year, monthIndex, 0).getDate()
  const total = days.length

  const cells = []
  for (let i = 0; i < offset; i++) {
    cells.push({ day: prevTotal - offset + 1 + i, other: true, status: null })
  }
  days.forEach((d) => cells.push({ ...d, other: false, highlight: d.day === highlightDay }))
  const trailing = (7 - (cells.length % 7)) % 7
  for (let i = 1; i <= trailing; i++) cells.push({ day: i, other: true, status: null })
  return cells
}

function LogItem({ month, record }) {
  const { year, monthIndex } = month
  const { status, login, logout, note } = record
  const styles = {
    hadir: {
      strip: 'bg-secondary',
      badge: 'bg-secondary-container text-on-secondary-container',
      detail: (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-on-surface-variant">
            <Icon name="login" className="text-[16px]" />
            <span className="font-label-md text-label-md">{login}</span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <Icon name="logout" className="text-[16px]" />
            <span className="font-label-md text-label-md">{logout}</span>
          </div>
        </div>
      ),
    },
    alpha: {
      strip: 'bg-error',
      badge: 'bg-error-container text-on-error-container',
      detail: (
        <div className="flex items-center gap-1 text-error">
          <Icon name="error" className="text-[16px]" />
          <span className="font-label-md text-label-md">Tidak ada catatan</span>
        </div>
      ),
    },
    izin: {
      strip: 'bg-amber-500',
      badge: 'bg-amber-100 text-amber-800',
      detail: (
        <div className="flex items-center gap-1 text-on-surface-variant">
          <Icon name="description" className="text-[16px]" />
          <span className="font-label-md text-label-md">{note || 'Izin'}</span>
        </div>
      ),
    },
  }[status]

  return (
    <div className="relative flex items-center justify-between overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-md shadow-sm transition-transform active:scale-[0.98]">
      <div className={`status-strip ${styles.strip}`} />
      <div className="flex flex-col gap-1 pl-2">
        <span className="font-label-lg text-label-lg text-on-surface">
          {dateLabel(year, monthIndex, record.day)}
        </span>
        {styles.detail}
      </div>
      <span
        className={`rounded-full px-3 py-1 font-label-md text-label-md ${styles.badge}`}
      >
        {STATUS_LABEL[status]}
      </span>
    </div>
  )
}

export default function Riwayat() {
  const [selectedKey, setSelectedKey] = useState(historyMonths[1].key)

  const month = useMemo(
    () => historyMonths.find((m) => m.key === selectedKey) || historyMonths[0],
    [selectedKey]
  )
  const cells = useMemo(() => buildCalendar(month), [month])
  const counts = useMemo(() => countStatus(month.days), [month])
  const logs = useMemo(
    () => month.days.filter((d) => d.status).slice().reverse().slice(0, 8),
    [month]
  )

  function downloadRecap() {
    const rows = [['Tanggal', 'Status', 'Masuk', 'Pulang', 'Keterangan']]
    month.days.forEach((d) => {
      if (!d.status) return
      rows.push([
        dateLabel(month.year, month.monthIndex, d.day),
        STATUS_LABEL[d.status],
        d.login || '',
        d.logout || '',
        d.note || '',
      ])
    })
    const csv = rows.map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rekap-presensi-${month.key}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mb-20 bg-surface text-on-surface">
      <TopAppBar />
      <main className="mx-auto max-w-2xl space-y-6 px-margin-mobile pt-20">
        {/* Header & Filter */}
        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                Riwayat Presensi
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Pantau kedisiplinan Anda
              </p>
            </div>
            <button
              onClick={downloadRecap}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-label-lg text-label-lg text-on-primary shadow-md transition-transform active:scale-95"
            >
              <Icon name="download" className="text-[18px]" />
              Rekap Bulanan
            </button>
          </div>
          <div className="relative">
            <select
              value={selectedKey}
              onChange={(e) => setSelectedKey(e.target.value)}
              className="w-full appearance-none rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 font-label-lg text-label-lg outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {historyMonths.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
            <Icon
              name="expand_more"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            />
          </div>
        </section>

        {/* Calendar Bento Card */}
        <section className="glass-card rounded-xl p-md shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{month.label}</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-secondary" />
                <span className="font-label-md text-[10px] text-on-surface-variant">Hadir</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="font-label-md text-[10px] text-on-surface-variant">Izin</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-error" />
                <span className="font-label-md text-[10px] text-on-surface-variant">Alpha</span>
              </div>
            </div>
          </div>

          <div className="calendar-grid mb-2">
            {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map((d, i) => (
              <div key={i} className="py-2 text-center font-label-md text-label-md text-outline">
                {d}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {cells.map((c, i) => {
              const tint = {
                hadir: 'bg-secondary-container/20',
                izin: 'bg-amber-100',
                alpha: 'bg-error-container/40',
              }[c.status]
              const dot = {
                hadir: 'bg-secondary',
                izin: 'bg-amber-500',
                alpha: 'bg-error',
              }[c.status]
              return (
                <div
                  key={i}
                  className={`calendar-day font-body-md ${
                    c.other ? 'opacity-20' : 'text-on-surface'
                  } ${tint || ''} rounded-lg`}
                >
                  {c.day}
                  {dot && <div className={`calendar-dot ${dot}`} />}
                  {c.highlight && <div className="calendar-dot bg-white" />}
                </div>
              )
            })}
          </div>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
            <span className="block font-label-md text-label-md text-on-surface-variant">Hadir</span>
            <span className="font-headline-sm text-headline-sm text-secondary">
              {counts.hadir} Hari
            </span>
          </div>
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
            <span className="block font-label-md text-label-md text-on-surface-variant">Izin</span>
            <span className="font-headline-sm text-headline-sm text-amber-600">
              {counts.izin} Hari
            </span>
          </div>
          <div className="rounded-xl border border-outline-variant/30 bg-surface-container-low p-3">
            <span className="block font-label-md text-label-md text-on-surface-variant">Alpha</span>
            <span className="font-headline-sm text-headline-sm text-error">
              {counts.alpha} Hari
            </span>
          </div>
        </section>

        {/* Recent Logs */}
        <section className="space-y-3 pb-8">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Log Terbaru</h3>
          {logs.map((record) => (
            <LogItem key={record.day} month={month} record={record} />
          ))}
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
