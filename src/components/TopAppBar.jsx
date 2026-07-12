import Icon from './Icon'

const PROFILE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCkgM6HtdhJz5TmZnRkBv2lPiSTuPknTzz7hfSifwlG0g215vIF-kSQHkg8tnjsFVGqfSXrFCw7B2qObpdkxwiAujqwWf817B8jEzjI31ovFy_SpH1088101vmOZUUoIc9AaK2CtWkFx4r1AfJctV-Yg_r5P3h48BSdo5VpyLugsjqo5tNGtR7Wq_JqwmtQXvxJQcpOIlmvYhrUIfr94W8KCU7tJVNy0pNzQFkUvxknmgXRtb6gCIcMobM4iniLeC0gQ20MzrEzEA'

export default function TopAppBar({ title = 'Desa Mandiri' }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-between bg-surface px-margin-mobile shadow-sm dark:bg-background">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary-container">
          <img
            className="h-full w-full object-cover"
            src={PROFILE_IMG}
            alt="Foto profil Sekretaris Desa"
          />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
          {title}
        </h1>
      </div>
      <button
        className="material-symbols-outlined rounded-full p-2 text-primary transition-colors duration-100 hover:bg-surface-container active:scale-95 dark:text-primary-fixed dark:hover:bg-surface-container-high"
        aria-label="Notifikasi"
      >
        notifications
      </button>
    </header>
  )
}
