"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * "Entrar" ou o atalho para a conta, no cabeçalho. Roda no navegador para que as
 * páginas de conteúdo continuem estáticas (rápidas) — elas não leem cookies.
 */
export default function BotaoConta() {
  // undefined = ainda verificando (não mostra nada, para não "piscar").
  const [nome, setNome] = useState(undefined);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    const atualizar = (session) =>
      setNome(session ? (session.user.user_metadata?.nome ?? "").split(" ")[0] || "Minha conta" : null);
    supabase.auth.getSession().then(({ data }) => atualizar(data.session));
    const { data } = supabase.auth.onAuthStateChange((_evento, session) => atualizar(session));
    return () => data.subscription.unsubscribe();
  }, []);

  if (nome === undefined) return <span className="size-12" aria-hidden="true" />;

  if (nome === null) {
    return (
      <Link
        href="/entrar"
        className="inline-flex min-h-12 items-center gap-1.5 rounded-full px-3 font-bold text-rosa-700 hover:bg-rosa-100"
      >
        <UserRound aria-hidden="true" className="size-5" />
        Entrar
      </Link>
    );
  }

  return (
    <Link
      href="/caderneta"
      aria-label={`Minha caderneta (${nome})`}
      className="inline-flex min-h-12 items-center gap-2 rounded-full px-1.5 font-bold text-rosa-700 hover:bg-rosa-100 lg:pr-3"
    >
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-full bg-rosa-600 text-white"
      >
        {nome[0]?.toUpperCase()}
      </span>
      <span className="hidden lg:inline">{nome}</span>
    </Link>
  );
}
