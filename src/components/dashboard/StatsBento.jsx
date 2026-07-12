import Icon from '../Icon'

const BAR_HEIGHTS = [40, 60, 50, 80, 100]

function SmallStat({ icon, iconClass, iconBg, label, value, unit }) {
  return (
    <div className="tonal-layer rounded-xl p-md">
      <div className="mb-1 flex items-center gap-2">
        <Icon name={icon} className={`text-[16px] ${iconBg} ${iconClass} rounded-full p-1`} />
        <p className="font-label-md text-label-md text-outline">{label}</p>
      </div>
      <p className="font-headline-md text-headline-md text-on-surface">
        {value} <span className="font-normal text-label-md text-outline">{unit}</span>
      </p>
    </div>
  )
}

export default function StatsBento({ stats }) {
  return (
    <section>
      <div className="mb-md flex items-center justify-between">
        <h4 className="font-headline-sm text-headline-sm">Statistik Bulan Ini</h4>
        <button className="font-label-lg text-primary transition-all hover:underline">
          Detail
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="tonal-layer col-span-2 flex items-end justify-between rounded-xl p-md">
          <div>
            <p className="font-label-md text-label-md text-outline">Total Hadir</p>
            <p className="font-display-lg text-display-lg text-primary">
              {stats.totalHadir} <span className="font-normal text-label-lg text-outline">Hari</span>
            </p>
          </div>
          <div className="flex h-12 w-24 items-end gap-1">
            {BAR_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className={`w-3 rounded-t-sm ${i === BAR_HEIGHTS.length - 1 ? 'bg-primary' : 'bg-primary/20'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <SmallStat
          icon="medical_services"
          iconClass="text-on-secondary-container"
          iconBg="bg-secondary-container"
          label="Sakit"
          value={stats.sakit}
          unit="Kali"
        />
        <SmallStat
          icon="assignment"
          iconClass="text-white text-on-tertiary-container"
          iconBg="bg-tertiary-container"
          label="Izin"
          value={stats.izin}
          unit="Kali"
        />
        <SmallStat
          icon="business_center"
          iconClass="text-primary"
          iconBg="bg-primary-fixed"
          label="Dinas"
          value={stats.dinas}
          unit="Hari"
        />
        <SmallStat
          icon="cancel"
          iconClass="text-error"
          iconBg="bg-error-container"
          label="Alpa"
          value={stats.alpa}
          unit="Hari"
        />
      </div>
    </section>
  )
}
