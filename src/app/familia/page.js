import { LogOut, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";
import { hoje } from "@/lib/datas";
import { resumoDaGestacao } from "@/lib/gestacao";
import { calcularLembretes } from "@/lib/lembretes";
import { sair } from "@/lib/actions/conta";
import BotaoSair from "@/components/conta/BotaoSair";
import { MeusLembretes, MinhaGestacao } from "@/components/caderneta/Resumo";
import { FormAceitarConvite } from "@/components/forms/FormsVinculos";
import Expandable from "@/components/ui/Expandable";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Acompanhar gestação" };

export default async function FamiliaPage() {
  const perfil = await exigirPapel(["familiar"], "/familia");
  const supabase = await createClient();
  // Só um resumo (sem exames, documentos ou anotações) — ver resumo_familiar() na migração 0003.
  const { data: gestantes } = await supabase.rpc("resumo_familiar");
  const dataDeHoje = hoje();

  return (
    <div className="space-y-8 lg:mx-auto lg:max-w-4xl">
      <PageHeader
        icon={Users}
        title={`Olá, ${perfil.nome.split(" ")[0]}!`}
        subtitle="Aqui você acompanha a gestação de quem te convidou."
        ilustracao={2}
      />

      {(gestantes ?? []).length === 0 && (
        <section className="space-y-3 rounded-cartao bg-rosa-50 p-5">
          <h2 className="text-lg font-extrabold text-rosa-800">Você ainda não acompanha nenhuma gestação</h2>
          <p>Peça para a gestante criar um convite em &quot;Minha conta&quot; e digite o código abaixo.</p>
          <FormAceitarConvite />
        </section>
      )}

      {(gestantes ?? []).map((g, i) => {
        // Exames ficam de fora: o familiar não vê exames (decisão da equipe).
        const caderneta = { gestacao: g.gestacao, consultas: g.consultas, vacinas: g.vacinas, exames: [] };
        return (
          <section key={g.gestante_id} aria-label={`Gestação de ${g.nome}`} className="space-y-6">
            <div className="space-y-6 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:space-y-0">
              <MinhaGestacao
                nome={g.nome}
                resumo={resumoDaGestacao(g.gestacao, dataDeHoje)}
                altoRisco={g.gestacao?.alto_risco}
                daGestante={false}
              />
              <MeusLembretes
                id={`lembretes-${i}`}
                titulo={`Lembretes de ${g.nome.split(" ")[0]}`}
                lembretes={calcularLembretes(caderneta, dataDeHoje).filter((l) => l.id !== "sem-dum")}
                soLinksDoGuia
              />
            </div>
          </section>
        );
      })}

      {(gestantes ?? []).length > 0 && (
        <Expandable title="Tenho outro código de convite">
          <FormAceitarConvite />
        </Expandable>
      )}

      <BotaoSair acao={sair}>
        <LogOut aria-hidden="true" className="size-5" />
        Sair da conta
      </BotaoSair>
    </div>
  );
}
