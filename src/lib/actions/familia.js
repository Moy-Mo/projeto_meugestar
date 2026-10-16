"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";

/* Ações do familiar / acompanhante. */

export async function aceitarConvite(_estado, formData) {
  await exigirPapel(["familiar"], "/familia");
  const codigo = String(formData.get("codigo") ?? "").trim().toUpperCase();
  if (!/^[A-Z2-9]{8}$/.test(codigo)) {
    return { erro: "O código tem 8 letras e números. Confira.", valores: { codigo } };
  }

  const supabase = await createClient();
  const { data: nome, error } = await supabase.rpc("aceitar_convite", { p_codigo: codigo });
  if (error) {
    return { erro: "Convite inválido, vencido ou já usado. Peça um novo para a gestante.", valores: { codigo } };
  }

  revalidatePath("/familia");
  return { sucesso: `Pronto! Agora você acompanha a gestação de ${nome}.` };
}
