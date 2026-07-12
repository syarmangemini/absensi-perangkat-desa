import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'

export default function PlaceholderPage({ title, icon, message }) {
  return (
    <div className="bg-surface pb-24 text-on-surface">
      <TopAppBar />
      <main className="mx-auto mt-16 flex max-w-2xl flex-col items-center justify-center px-margin-mobile">
        <section className="flex w-full flex-col items-center gap-4 py-xl text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-container">
            <Icon name={icon} className="text-primary text-[40px]" />
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
