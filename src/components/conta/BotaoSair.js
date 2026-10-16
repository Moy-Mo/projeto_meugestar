"use client";

import { limparChecklistsLocais } from "@/components/content/InteractiveChecklist";

/**
 * Sair da conta. Antes de sair, apaga deste aparelho os itens de checklist que
 * vieram da conta — o celular pode ser compartilhado com outras pessoas.
 */
export default function BotaoSair({ acao, children }) {
  return (
    <form action={acao} onSubmit={limparChecklistsLocais}>
      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-rosa-300 bg-superficie px-6 font-bold text-rosa-700 hover:bg-rosa-50"
      >
        {children}
      </button>
    </form>
  );
}
