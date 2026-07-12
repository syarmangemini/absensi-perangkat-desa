import Icon from '../Icon'

export default function Announcements({ items }) {
  return (
    <section>
      <div className="mb-md flex items-center justify-between">
        <h4 className="font-headline-sm text-headline-sm">Pengumuman Desa</h4>
        <button className="font-label-lg text-primary">Lihat Semua</button>
      </div>
      <div className="space-y-md">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="tonal-layer group flex items-start gap-md rounded-xl p-md transition-transform hover:scale-[1.01]"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
            >
              <Icon name={item.icon} className={item.iconClass} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h5 className="font-label-lg text-label-lg text-on-surface transition-colors group-hover:text-primary">
                  {item.title}
                </h5>
                {item.badge && (
                  <span className="shrink-0 font-label-md text-label-md text-outline">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="line-clamp-1 font-body-md text-body-md text-on-surface-variant">
                {item.desc}
              </p>
              <p className="mt-2 font-label-md text-label-md text-outline">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
