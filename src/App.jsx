import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Presensi from './pages/Presensi'
import Riwayat from './pages/Riwayat'
import Profil from './pages/Profil'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/presensi" element={<Presensi />} />
      <Route path="/riwayat" element={<Riwayat />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  )
}
