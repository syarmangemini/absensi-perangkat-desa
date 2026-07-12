import { NavLink } from 'react-router-dom'
import Icon from './Icon'

const NAV_ITEMS = [
  { to: '/', label: 'Beranda', icon: 'dashboard', end: true },
  { to: '/presensi', label: 'Presensi', icon: 'fingerprint' },
  { to: '/riwayat', label: 'Riwayat', icon: 'history' },
  { to: '/profil', label: 'Profil', icon: 'person' },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around border-t border-outline-variant bg-surface px-sm py-xs dark:border-outline dark:bg-background">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center rounded-xl px-4 py-1 active:scale-90 transition-transform duration-200 ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container dark:bg-secondary dark:text-on-secondary'
                : 'text-on-surface-variant hover:bg-surface-container-low dark:text-outline dark:hover:bg-surface-container-highest'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} filled={isActive} />
              <span className="font-label-md text-label-md">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
