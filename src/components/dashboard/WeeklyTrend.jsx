const DAYS = [
  { day: 'Sen', value: 70 },
  { day: 'Sel', value: 85 },
  { day: 'Rab', value: 60 },
  { day: 'Kam', value: 95 },
  { day: 'Jum', value: 80, highlight: true },
]

export default function WeeklyTrend() {
  return (
    <section className="tonal-layer rounded-xl p-md">
      <h4 className="mb-4 font-label-lg text-label-lg">Tren Kehadiran Mingguan</h4>
      <div className="flex h-32 items-end justify-between gap-2 px-2">
        {DAYS.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-lg transition-all hover:bg-primary ${
                d.highlight ? 'bg-primary' : 'bg-primary-container'
              }`}
              style={{ height: `${d.value}%` }}
            />
            <span
              className={`font-label-md text-label-md ${
                d.highlight ? 'font-bold text-primary' : 'text-outline'
              }`}
            >
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
