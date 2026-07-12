import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { profileDetail } from '../data'
import { getProfile } from '../lib/db'

export default function Profil() {
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [p, setP] = useState(null) // data dari tabel perangkat_desa
  const [avatar, setAvatar] = useState(profileDetail.avatar)
  const [dark, setDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  )

  // Muat profil dari Supabase (fallback ke data statis)
  useEffect(() => {
    let active = true
    getProfile()
      .then((row) => {
        if (!active || !row) return
        setP(row)
        setAvatar(row.foto_url || profileDetail.avatar)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const view = {
    name: p?.nama ?? profileDetail.name,
    nip: p?.nip ?? profileDetail.nip,
    status: p?.status_kepegawaian ?? profileDetail.status,
    position: p?.jabatan ?? profileDetail.position,
    unit: p?.unit_kerja ?? profileDetail.unit,
    phone: p?.telepon ?? profileDetail.phone,
    address: p?.alamat ?? profileDetail.address,
  }

  // Apply / remove `dark` class on <html>
  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }, [dark])

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (file) setAvatar(URL.createObjectURL(file))
  }

  return (
    <div className="bg-background min-h-screen pb-24 text-on-background">
      <TopAppBar />
      <main className="mx-auto max-w-2xl space-y-lg px-margin-mobile pt-20">
        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-lg elevation-l1">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center space-y-md text-center">
            <div className="relative">
              <div className="overflow-hidden rounded-full border-4 border-surface bg-primary-container p-1 shadow-md">
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={avatar}
                  alt="Foto profil perangkat desa"
                />
              </div>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label="Ubah foto profil"
                className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-on-primary shadow-lg tap-scale transition-transform"
              >
                <Icon name="photo_camera" className="text-[18px]" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {view.name}
              </h2>
              <p className="font-label-md text-label-md text-outline">
                NIP: {view.nip}
              </p>
              <div className="mt-sm inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-on-secondary-container">
                <Icon name="verified" filled className="text-[14px]" />
                <span className="font-label-md text-label-md">
                  Status Kepegawaian: {view.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Personal & Employment Data */}
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <div className="elevation-l1 space-y-md rounded-xl border-l-[6px] border-secondary bg-surface-container-lowest p-md">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="badge" />
              <h3 className="font-label-lg text-label-lg">Detail Jabatan</h3>
            </div>
            <div className="space-y-sm">
              <div>
                <p className="font-label-md text-label-md text-outline">Jabatan</p>
                <p className="font-body-md text-body-md font-semibold">
                  {view.position}
                </p>
              </div>
              <div>
                <p className="font-label-md text-label-md text-outline">Unit Kerja</p>
                <p className="font-body-md text-body-md font-semibold">{view.unit}</p>
              </div>
            </div>
          </div>

          <div className="elevation-l1 space-y-md rounded-xl bg-surface-container-lowest p-md">
            <div className="flex items-center gap-2 text-primary">
              <Icon name="contact_phone" />
              <h3 className="font-label-lg text-label-lg">Kontak</h3>
            </div>
            <div className="space-y-sm">
              <div className="flex items-center gap-3">
                <Icon name="phone" className="text-outline text-[20px]" />
                <p className="font-body-md text-body-md">{view.phone}</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="location_on" className="text-outline text-[20px]" />
                <p className="font-body-md text-body-md">{view.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <section className="elevation-l1 overflow-hidden rounded-xl bg-surface-container-lowest">
          <div className="border-b border-outline-variant p-md">
            <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-primary">
              Pengaturan Aplikasi
            </h3>
          </div>
          <div className="divide-y divide-outline-variant">
            <button
              type="button"
              className="tap-scale group flex w-full items-center justify-between p-md transition-colors hover:bg-surface-container-low"
            >
              <div className="flex items-center gap-4">
                <Icon name="lock_reset" className="text-outline group-hover:text-primary" />
                <span className="font-body-md text-body-md">Ubah Kata Sandi</span>
              </div>
              <Icon name="chevron_right" className="text-outline-variant" />
            </button>

            <div className="flex w-full items-center justify-between p-md">
              <div className="flex items-center gap-4">
                <Icon name="contrast" className="text-outline" />
                <span className="font-body-md text-body-md">Mode Gelap</span>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={dark}
                  onChange={(e) => setDark(e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full bg-outline-variant peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
              </label>
            </div>

            <button
              type="button"
              className="tap-scale group flex w-full items-center justify-between p-md transition-colors hover:bg-surface-container-low"
            >
              <div className="flex items-center gap-4">
                <Icon name="info" className="text-outline group-hover:text-primary" />
                <span className="font-body-md text-body-md">Tentang Aplikasi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-outline">
                  {profileDetail.appVersion}
                </span>
                <Icon name="chevron_right" className="text-outline-variant" />
              </div>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <div className="pb-xl pt-sm">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="tap-scale flex h-[56px] w-full items-center justify-center gap-3 rounded-xl border-2 border-error bg-white font-label-lg text-error transition-all hover:bg-error/5 active:bg-error/10"
          >
            <Icon name="logout" />
            Keluar dari Akun
          </button>
          <p className="mt-md text-center font-label-md text-label-md text-outline">
            © 2024 Desa Mandiri. Sistem Kepegawaian Terintegrasi.
          </p>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
