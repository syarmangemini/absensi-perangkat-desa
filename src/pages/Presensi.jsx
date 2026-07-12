import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopAppBar from '../components/TopAppBar'
import BottomNav from '../components/BottomNav'
import Icon from '../components/Icon'
import { insertPresensi } from '../lib/db'

const MAP_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAqz7uLBPBvOqUC5MZpfEAi3gzoZO1kA67DvehazqEqcMNj5wtDEWzeEYRbtpxsfzg7XAPe1MgzvihX-mcjw7vFgfNr4ZokCKVh12tOHEBCG080k91wcmSnBuPhCqMA-FvcI8t_HTNxtZKPpSOM6xCX0PnlP-n9bT8MdrIAY91-GgnwM7Q30i3-nlQU8_PUu6XLw7ZPYAMUuesqIr21ev9LIKCFc92KY_Bg0ey-OnUJ5atNS2CE2c7s3R4ltWi-PGI8gg04bg75aQ'

const CAMERA_FALLBACK =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBb8PoKJI0mwKz0eSY70pfQAUx-WvQMT2AUqmzKFmlcRdcopKTBH4M5oA9QuA-7pseCllj0eTnVrmTR6mBBXc3djiN4sSAS2nZRUfODB-7NG_iahJNfdt4WyAvdWRAammhXGyjnVV-OzyTCck7Bq_Ei4F5YcxK113OT7vf_KutKqyGgjYjp3w_N0iZzoN0keb0B5AY9YANqmiErsJlCTY98Rk8p__9w7Hhfhlqqe9G6WaYA_i4EtOiZa1_4z7wEnB9tVU9BbeKRmQ'

function formatTime(date) {
  return date.toLocaleTimeString('id-ID', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

function formatDate(date) {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Presensi() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [now, setNow] = useState(new Date())
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [checkIn, setCheckIn] = useState('--:--')
  const [checkOut, setCheckOut] = useState('--:--')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Camera (real webcam with fallback)
  useEffect(() => {
    let cancelled = false
    async function startCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error('no-camera')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setCameraReady(true)
      } catch {
        setCameraError(true)
      }
    }
    startCamera()
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  function retake() {
    setDone(false)
    setCheckIn('--:--')
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    setCameraReady(false)
    setCameraError(false)
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'user' } })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) videoRef.current.srcObject = stream
        setCameraReady(true)
      })
      .catch(() => setCameraError(true))
  }

  function handleSubmit() {
    if (done) return
    setSubmitting(true)
    const current = new Date()
    const time = formatTime(current)
    const tanggal = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`
    // Simulate a short verification delay, then persist to Supabase
    setTimeout(() => {
      insertPresensi({
        tanggal,
        status: 'hadir',
        jamMasuk: time.slice(0, 5),
        lokasi: 'Kantor Desa Sukamaju, Kec. Maju Jaya',
      })
        .catch((err) => console.warn('Gagal menyimpan presensi:', err))
        .finally(() => {
          setCheckIn(time)
          setSubmitting(false)
          setDone(true)
          // Return to dashboard and reflect the recorded check-in time
          setTimeout(() => navigate('/', { state: { checkIn: time } }), 1500)
        })
    }, 800)
  }

  return (
    <div className="bg-background min-h-screen pb-24 text-on-background">
      <TopAppBar />
      <main className="mx-auto max-w-md space-y-6 px-margin-mobile pt-20">
        {/* Time & Date */}
        <section className="space-y-1 text-center">
          <div className="font-display-lg text-display-lg tracking-tight text-primary">
            {formatTime(now)}
          </div>
          <div className="font-label-lg text-label-lg text-on-surface-variant">
            {formatDate(now)}
          </div>
        </section>

        {/* Attendance Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface-container-low p-4 shadow-sm">
            <Icon name="login" className="mb-1 text-secondary" />
            <span className="font-label-md text-label-md text-on-surface-variant">Masuk</span>
            <span className="font-headline-sm text-headline-sm text-primary">{checkIn}</span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-outline-variant/30 bg-surface-container-low p-4 shadow-sm">
            <Icon name="logout" className="mb-1 text-outline" />
            <span className="font-label-md text-label-md text-on-surface-variant">Pulang</span>
            <span className="font-headline-sm text-headline-sm text-primary">{checkOut}</span>
          </div>
        </div>

        {/* GPS & Radius Status */}
        <div className="space-y-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-md shadow-[0_2px_8px_rgba(26,95,122,0.04)]">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-secondary">
                <Icon name="location_on" filled className="text-[18px]" />
                <span className="font-label-lg text-label-lg font-bold">Lokasi Terdeteksi</span>
              </div>
              <p className="pl-6 font-body-md text-body-md text-on-surface-variant">
                Kantor Desa Sukamaju, Kec. Maju Jaya
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-secondary-container/30 px-3 py-1 text-on-secondary-container">
              <Icon name="check_circle" className="text-[14px]" />
              <span className="font-label-md text-label-md">Dalam Radius</span>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-32 w-full overflow-hidden rounded-lg border border-outline-variant/40">
            <div className="absolute inset-0 flex items-center justify-center bg-surface-dim">
              <div
                className="h-full w-full bg-cover bg-center grayscale-[0.2]"
                style={{ backgroundImage: `url('${MAP_IMG}')` }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full border-2 border-white bg-primary">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Camera Verification */}
        <div className="space-y-3 rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-md shadow-[0_2px_8px_rgba(26,95,122,0.04)]">
          <div className="flex items-center gap-2">
            <Icon name="photo_camera" className="text-primary" />
            <span className="font-label-lg text-label-lg">Verifikasi Wajah</span>
          </div>
          <div className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-outline-variant transition-all hover:border-primary">
            {cameraReady ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full -scale-x-100 object-cover"
              />
            ) : (
              <img
                id="camera-preview"
                className="h-full w-full object-cover"
                src={CAMERA_FALLBACK}
                alt="Pratinjau verifikasi wajah"
              />
            )}
            <div className="camera-overlay pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-6 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  retake()
                }}
                className="flex items-center gap-2 rounded-full bg-white/90 px-6 py-2 font-label-lg text-primary shadow-lg backdrop-blur-sm"
              >
                <Icon name="refresh" />
                Ambil Ulang
              </button>
            </div>
            {/* Scanning Effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] animate-[scan_3s_ease-in-out_infinite] bg-secondary-container/50 shadow-[0_0_15px_#85f1ed]" />
          </div>
          <p className="text-center font-label-md text-label-md text-on-surface-variant">
            {cameraError
              ? 'Kamera tidak tersedia, gunakan foto contoh di atas.'
              : 'Pastikan wajah berada di dalam area kotak dan pencahayaan cukup.'}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || done}
          className={`mb-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl font-headline-sm shadow-lg transition-transform duration-100 active:scale-95 ${
            done
              ? 'bg-secondary text-on-secondary'
              : 'bg-primary text-on-primary hover:bg-primary-container'
          } ${submitting ? 'opacity-70' : ''}`}
        >
          <Icon name="fingerprint" filled={done} />
          {done ? 'Presensi Tercatat' : submitting ? 'Memverifikasi...' : 'Absen Masuk'}
        </button>
      </main>
      <BottomNav />
    </div>
  )
}
