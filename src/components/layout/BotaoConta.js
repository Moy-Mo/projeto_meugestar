"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// Onde cada papel "mora" no app (igual a PAINEL_DO_PAPEL em src/lib/dal.js, que é só do servidor).
const PAINEL = { gestante: "/caderneta", profissional: "/ubs", familiar: "/familia", admin: "/admin" };

/**
 * "Entrar" ou o atalho para a conta, no cabeçalho. Roda no navegador para que as
 * páginas de conteúdo continuem estáticas (rápidas) — elas não leem cookies.
 */
export default function BotaoConta() {
  // undefined = ainda verificando (não mostra nada, para não "piscar").
  const [nome, setNome] = useState(undefined);
  const [foto, setFoto] = useState(null);
  const [destino, setDestino] = useState("/caderneta");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    const atualizar = async (session) => {
      setNome(session ? (session.user.user_metadata?.nome ?? "").split(" ")[0] || "Minha conta" : null);
      if (!session) return setFoto(null);
      // Foto privada: pede um link temporário (as regras do Storage só liberam a da própria usuária).
      const { data: perfil } = await supabase
        .from("perfis")
        .select("papel, foto_path")
        .eq("id", session.user.id)
        .maybeSingle();
      setDestino(PAINEL[perfil?.papel] ?? "/caderneta");
      if (!perfil?.foto_path) return setFoto(null);
      const { data: link } = await supabase.storage.from("fotos-perfil").createSignedUrl(perfil.foto_path, 3600);
      setFoto(link?.signedUrl ?? null);
    };
    supabase.auth.getSession().then(({ data }) => atualizar(data.session));
    // Consultar o banco DENTRO deste callback pode travar a sessão (aviso do Supabase):
    // por isso a consulta vai para depois, com setTimeout.
    const { data } = supabase.auth.onAuthStateChange((_evento, session) => {
      setTimeout(() => atualizar(session), 0);
    });
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
      href={destino}
      aria-label={`Minha área (${nome})`}
      className="inline-flex min-h-12 items-center gap-2 rounded-full px-1.5 font-bold text-rosa-700 hover:bg-rosa-100 lg:pr-3"
    >
      {foto ? (
        // eslint-disable-next-line @next/next/no-img-element -- link temporário do Storage privado
        <img src={foto} alt="" className="size-9 rounded-full object-cover ring-2 ring-rosa-200" />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-full bg-rosa-600 text-white"
        >
          {nome[0]?.toUpperCase()}
        </span>
      )}
      <span className="hidden lg:inline">{nome}</span>
    </Link>
  );
}
