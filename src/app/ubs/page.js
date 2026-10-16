import { Clock, LogOut, Stethoscope, UserX } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";
import { formatarData, hoje } from "@/lib/datas";
import { formatarCPF } from "@/lib/documentos";
import { formatarIGCurta, resumoDaGestacao } from "@/lib/gestacao";
import { sair } from "@/lib/actions/conta";
import BotaoSair from "@/components/conta/BotaoSair";
import ListaPacientes from "@/components/ubs/ListaPacientes";
import Callout from "@/components/ui/Callout";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Painel da UBS", robots: { index: false } };

export default async function PainelUbsPage() {
  const perfil = await exigirPapel(["profissional"], "/ubs");
  const nomeUbs = perfil.ubs?.nome ?? "sua UBS";

  const cabecalho = (
    <PageHeader
      icon={Stethoscope}
      title="Painel da UBS"
      subtitle={`${perfil.nome} · ${perfil.profissao ?? "Profissional"} · ${nomeUbs}`}
    />
  );

  if (perfil.status_profissional !== "aprovado") {
    const recusado = perfil.status_profissional === "recusado";
    return (
      <div className="space-y-6 lg:mx-auto lg:max-w-3xl">
        {cabecalho}
        <Callout
          variant={recusado ? "danger" : "info"}
          icon={recusado ? UserX : Clock}
          title={recusado ? "Cadastro não aprovado" : "Cadastro aguardando aprovação"}
        >
          {recusado
            ? "A administração não aprovou este cadastro. Fale com a coordenação do projeto."
            : "A administração do Meu Gestar vai conferir seus dados. Depois da aprovação, as gestantes da sua UBS que autorizarem aparecem aqui."}
        </Callout>
        <BotaoSair acao={sair}>
          <LogOut aria-hidden="true" className="size-5" />
          Sair da conta
        </BotaoSair>
      </div>
    );
  }

  // O banco (RLS) só devolve as gestantes que autorizaram a UBS deste profissional.
  const supabase = await createClient();
  const { data: perfis } = await supabase
    .from("perfis")
    .select("id, nome, cpf, cns")
    .eq("papel", "gestante")
    .order("nome");
  const ids = (perfis ?? []).map((p) => p.id);
  const { data: gestacoes } = ids.length
    ? await supabase.from("gestacoes").select("user_id, dum, dpp_ultrassom, alto_risco").in("user_id", ids)
    : { data: [] };

  const dataDeHoje = hoje();
  const pacientes = (perfis ?? []).map((p) => {
    const gestacao = gestacoes?.find((g) => g.user_id === p.id);
    const resumo = resumoDaGestacao(gestacao, dataDeHoje);
    return {
      id: p.id,
      nome: p.nome,
      cpf: p.cpf,
      cns: p.cns,
      cpfFormatado: p.cpf ? formatarCPF(p.cpf) : "",
      igTexto: resumo ? `${formatarIGCurta(resumo.ig)} de gestação` : null,
      dppTexto: resumo ? formatarData(resumo.dpp) : null,
      altoRisco: Boolean(gestacao?.alto_risco),
    };
  });

  return (
    <div className="space-y-6">
      {cabecalho}
      <section aria-labelledby="pacientes" className="space-y-3">
        <h2 id="pacientes" className="text-xl font-extrabold text-rosa-800">
          Gestantes da UBS ({pacientes.length})
        </h2>
        {pacientes.length === 0 ? (
          <Callout title="Nenhuma gestante ainda">
            Aparecem aqui as gestantes de {nomeUbs} que, no app, escolheram esta UBS e autorizaram a
            equipe. Peça para elas ativarem em &quot;Minha conta&quot;.
          </Callout>
        ) : (
          <ListaPacientes pacientes={pacientes} />
        )}
      </section>
      <BotaoSair acao={sair}>
        <LogOut aria-hidden="true" className="size-5" />
        Sair da conta
      </BotaoSair>
    </div>
  );
}
