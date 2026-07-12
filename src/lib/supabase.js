import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Variabel VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi. ' +
      'Salin .env.example menjadi .env dan isi dengan kredensial Supabase.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ID perangkat desa yang sedang login (demo). Ganti dengan hasil auth nyata nanti.
export const CURRENT_USER_ID = '00000000-0000-0000-0000-000000000001'
