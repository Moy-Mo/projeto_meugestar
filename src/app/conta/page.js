import Link from "next/link";
import { Building2, Eye, LogOut, ShieldCheck, UserRound, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel, getCaderneta, listarUbs } from "@/lib/dal";
import { sair } from "@/lib/actions/conta";
import { FormExcluirConta, FormPerfil } from "@/components/forms/FormsConta";
import { FormUbsAutorizacao, GerenciarFamiliares } from "@/components/forms/FormsVinculos";
import BotaoSair from "@/components/conta/BotaoSair";
import Expandable from "@/components/ui/Expandable";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Minha conta" };

const DATA_HORA = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Porto_Velho",
});

function Secao({ id, titulo, icone: Icone, children }) {
  return (
    <section aria-labelledby={id} className="space-y-3">
      <h2 id={id} className="flex items-center gap-2 text-xl font-extrabold text-rosa-800">
        <Icone aria-hidden="true" className="size-6 text-rosa-600" />
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default async function ContaPage() {
  const gestante = await exigirPapel(["gestante"], "/conta");
  const { perfil, fotoUrl } = await getCaderneta();
  const supabase = await createClient();
  const [listaUbs, { data: convites }, { data: acessos }] = await Promise.all([
    listarUbs(),
    supabase
      .from("convites_familiares")
      .select("id, codigo, apelido, expira_em, familiar_id, familiar_nome, aceito_em")
      // Aceitos, ou ainda dentro do prazo de 7 dias.
      .or(`familiar_id.not.is.null,expira_em.gt.${new Date().toISOString()}`)
      .order("criado_em", { ascending: false }),
    supabase
      .from("acessos_caderneta")
      .select("id, profissional_nome, em")
      .order("em", { ascending: false })
      .limit(20),
  ]);

  return (
    <div className="space-y-10 lg:mx-auto lg:max-w-3xl">
      <PageHeader backHref="/caderneta" backLabel="Minha caderneta" icon={UserRound} title="Minha conta" />

      <Secao id="meus-dados" titulo="Meus dados" icone={UserRound}>
        <p className="text-texto-suave">
          E-mail da conta: <strong className="text-texto">{gestante.email}</strong>
        </p>
        <div className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
          <FormPerfil perfil={perfil} fotoUrl={fotoUrl} />
        </div>
      </Secao>

      <Secao id="minha-ubs" titulo="Minha UBS" icone={Building2}>
        <p>
          Se você autorizar, a equipe da sua UBS pode ver sua caderneta e registrar consultas, exames
          e vacinas nela. Você pode retirar a autorização quando quiser.
        </p>
        <div className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
          <FormUbsAutorizacao listaUbs={listaUbs} perfil={perfil} />
        </div>
      </Secao>

      <Secao id="familiares" titulo="Familiares e acompanhantes" icone={Users}>
        <p>
          Convide quem você quiser para acompanhar sua gestação. A pessoa vê só um resumo (semanas,
          data provável do parto, consultas e lembretes) — não vê exames nem seus documentos.
        </p>
        <div className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao">
          <GerenciarFamiliares convites={convites ?? []} />
        </div>
      </Secao>

      <Secao id="acessos" titulo="Quem da UBS abriu minha caderneta" icone={Eye}>
        {(acessos ?? []).length === 0 ? (
          <p className="text-texto-suave">Ninguém da UBS abriu sua caderneta até agora.</p>
        ) : (
          <ul className="divide-y divide-borda rounded-cartao border border-borda bg-superficie">
            {acessos.map((a) => (
              <li key={a.id} className="flex justify-between gap-3 p-3 text-sm">
                <span>{a.profissional_nome ?? "Profissional"}</span>
                <span className="shrink-0 text-texto-suave">{DATA_HORA.format(new Date(a.em))}</span>
              </li>
            ))}
          </ul>
        )}
      </Secao>

      <BotaoSair acao={sair}>
        <LogOut aria-hidden="true" className="size-5" />
        Sair da conta
      </BotaoSair>

      <Secao id="privacidade" titulo="Privacidade" icone={ShieldCheck}>
        <p>
          <Link href="/privacidade" className="font-bold text-rosa-700 underline">
            Veja como usamos e protegemos seus dados
          </Link>
          .
        </p>
        <Expandable title="Excluir minha conta e meus dados">
          <FormExcluirConta />
        </Expandable>
      </Secao>
    </div>
  );
}
