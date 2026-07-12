import Icon from '../Icon'

export default function AttendanceStatusCard({ status, clockIn }) {
  const stripClass = 'status-strip-success'
  return (
    <div
      className={`tonal-layer relative flex items-center justify-between overflow-hidden rounded-xl p-md ${stripClass}`}
    >
      <div className="relative z-10">
        <p className="font-label-md text-label-md uppercase tracking-wider text-outline">
          Status Hari Ini
        </p>
        <h3 className="mt-1 font-headline-sm text-headline-sm text-secondary">{status}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Icon name="schedule" className="text-on-surface-variant text-[18px]" />
          <p className="font-body-md text-body-md text-on-surface-variant">
            Masuk: {clockIn} WIB
          </p>
        </div>
      </div>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container float-anim">
        <Icon
          name="verified_user"
          filled
          className="text-display-lg text-on-secondary-container"
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 opacity-5">
        <Icon name="fingerprint" className="text-[120px]" />
      </div>
    </div>
  )
}
