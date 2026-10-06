export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Aceita a chave nova (publishable) ou a anon key antiga.
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Permite rodar o app (conteúdo público) antes de o projeto Supabase estar configurado.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
