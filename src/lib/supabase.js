import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Verifica se as variáveis estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase não configurado. Analytics desabilitado.')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper para verificar se o Supabase está disponível
export const isSupabaseEnabled = () => supabase !== null
