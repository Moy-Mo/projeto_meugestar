"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { caminhoAnonimo } from "@/lib/contador";

/**
 * Contador de acessos (pedido da equipe): soma 1 por página vista, por dia.
 * Não guarda quem acessou — só a página (sem identificadores) e o dia.
 */
// Última página contada: evita contar duas vezes a mesma visita (em desenvolvimento
// o React roda os efeitos duas vezes). Ir de A para B e voltar para A conta de novo.
let ultimaContada = null;

export default function ContadorAcessos() {
  const caminho = usePathname();

  useEffect(() => {
    if (!isSupabaseConfigured || !caminho || caminho === ultimaContada) return;
    ultimaContada = caminho;
    createClient()
      .rpc("contar_acesso", { p_caminho: caminhoAnonimo(caminho) })
      .then(() => {}, () => {}); // contador nunca pode atrapalhar a navegação
  }, [caminho]);

  return null;
}
