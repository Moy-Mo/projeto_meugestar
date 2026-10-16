import Link from "next/link";
import { notFound } from "next/navigation";
import { getPerfilAtual } from "@/lib/dal";
import { NOME_DO_PAPEL } from "@/lib/papeis";
import TelaConta from "@/components/conta/TelaConta";
import { FormAceitarConvite } from "@/components/forms/FormsVinculos";
import Callout from "@/components/ui/Callout";

export const metadata = { title: "Convite", robots: { index: false } };

/** Link que a gestante envia ao familiar: /convite/ABCD2345 */
export default async function ConvitePage({ params }) {
  const { codigo: bruto } = await params;
  const codigo = String(bruto).toUpperCase();
  if (!/^[A-Z2-9]{8}$/.test(codigo)) notFound();

  const perfil = await getPerfilAtual();

  return (
    <TelaConta
      titulo="Você foi convidada(o) para acompanhar uma gestação"
      subtitulo="Com o Meu Gestar você acompanha as semanas, a data provável do parto, as consultas e os lembretes."
      gestante={2}
    >
      {!perfil && (
        <div className="space-y-3">
          <Link
            href={`/cadastro/familiar?codigo=${codigo}`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-rosa-600 px-6 font-bold text-white hover:bg-rosa-700"
          >
            Criar minha conta de familiar
          </Link>
          <Link
            href={`/entrar?voltar=/convite/${codigo}`}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-rosa-300 bg-superficie px-6 font-bold text-rosa-700 hover:bg-rosa-50"
          >
            Já tenho conta de familiar
          </Link>
        </div>
      )}

      {perfil?.papel === "familiar" && <FormAceitarConvite codigo={codigo} />}

      {perfil && perfil.papel !== "familiar" && (
        <Callout variant="warning" title="Este convite é para uma conta de familiar">
          Você entrou com uma conta de {NOME_DO_PAPEL[perfil.papel]?.toLowerCase()}. Para
          aceitar, saia da conta e crie uma conta de familiar.
        </Callout>
      )}
    </TelaConta>
  );
}
