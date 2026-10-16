import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/*
 * Volta dos links enviados por e-mail pelo Supabase (ex.: "esqueci minha senha").
 * Troca o código por uma sessão e segue para `next`.
 */
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/caderneta";
  const destino = next.startsWith("/") && !next.startsWith("//") ? next : "/caderneta";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${destino}`);
  }

  // Link vencido, já usado ou aberto em outro aparelho.
  return NextResponse.redirect(`${origin}/recuperar-senha?link-invalido=1`);
}
