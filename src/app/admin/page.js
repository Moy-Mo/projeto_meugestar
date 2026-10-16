import { Building2, ChartColumn, LogOut, ShieldCheck, UserCog } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { exigirPapel } from "@/lib/dal";
import { formatarData } from "@/lib/datas";
import { formatarTelefone } from "@/lib/documentos";
import { STATUS_PROFISSIONAL } from "@/lib/papeis";
import { sair } from "@/lib/actions/conta";
import { BotaoAtivarUbs, BotoesAprovacao, FormNovaUbs } from "@/components/admin/AcoesAdmin";
import BotaoSair from "@/components/conta/BotaoSair";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Painel admin", robots: { index: false } };

const numero = (n) => Number(n ?? 0).toLocaleString("pt-BR");

function Numero({ rotulo, valor, destaque = false }) {
  return (
    <div className={`rounded-cartao p-4 ${destaque ? "bg-rosa-600 text-white" : "border border-borda bg-superficie"}`}>
      <p className={`text-sm font-bold ${destaque ? "text-white/90" : "text-texto-suave"}`}>{rotulo}</p>
      <p className="mt-1 text-3xl font-extrabold">{numero(valor)}</p>
    </div>
  );
}

function Secao({ id, titulo, icone: Icone, children }) {
  return (
    <section aria-labelledby={id} className="space-y-4">
      <h2 id={id} className="flex items-center gap-2 text-xl font-extrabold text-rosa-800">
        <Icone aria-hidden="true" className="size-6 text-rosa-600" />
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default async function AdminPage() {
  await exigirPapel(["admin"], "/admin");
  const supabase = await createClient();
  const [{ data: e }, { data: profissionais }, { data: listaUbs }] = await Promise.all([
    supabase.rpc("estatisticas_admin"),
    supabase.rpc("listar_profissionais"),
    supabase.from("ubs").select("id, nome, bairro, ativa").order("nome"),
  ]);
  const est = e ?? {};
  const porDia = est.por_dia ?? [];
  const maiorDia = Math.max(1, ...porDia.map((d) => d.total));
  const pendentes = (profissionais ?? []).filter((p) => p.status_profissional === "pendente").length;

  return (
    <div className="space-y-10">
      <PageHeader icon={ShieldCheck} title="Painel admin" subtitle="Gestão do Meu Gestar." />

      <Secao id="acessos" titulo="Acessos ao site" icone={ChartColumn}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Numero rotulo="Hoje" valor={est.acessos_hoje} destaque />
          <Numero rotulo="Últimos 30 dias" valor={est.acessos_30_dias} />
          <Numero rotulo="Desde o início" valor={est.acessos_total} />
        </div>

        {porDia.length > 0 && (
          <figure className="rounded-cartao border border-borda bg-superficie p-4">
            <figcaption className="mb-3 font-bold">Páginas vistas por dia (últimos 30 dias)</figcaption>
            <div className="flex h-40 items-end gap-1" role="img" aria-label={`Acessos por dia; maior valor: ${numero(maiorDia)}`}>
              {porDia.map((d) => (
                <div
                  key={d.dia}
                  title={`${formatarData(d.dia)}: ${numero(d.total)}`}
                  className="min-w-1 flex-1 rounded-t bg-rosa-400 hover:bg-rosa-600"
                  style={{ height: `${Math.max(4, (d.total / maiorDia) * 100)}%` }}
                />
              ))}
            </div>
          </figure>
        )}

        {(est.mais_vistas ?? []).length > 0 && (
          <div className="rounded-cartao border border-borda bg-superficie p-4">
            <p className="mb-2 font-bold">Páginas mais vistas (30 dias)</p>
            <ol className="space-y-1">
              {est.mais_vistas.map((p) => (
                <li key={p.caminho} className="flex justify-between gap-4 text-sm">
                  <span className="truncate">{p.caminho}</span>
                  <span className="font-bold">{numero(p.total)}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Numero rotulo="Gestantes cadastradas" valor={est.gestantes} />
          <Numero rotulo="Autorizaram a UBS" valor={est.gestantes_autorizaram_ubs} />
          <Numero rotulo="Familiares" valor={est.familiares} />
          <Numero rotulo="Profissionais aprovados" valor={est.profissionais_aprovados} />
        </div>
      </Secao>

      <Secao id="profissionais" titulo={`Profissionais${pendentes ? ` (${pendentes} aguardando)` : ""}`} icone={UserCog}>
        {(profissionais ?? []).length === 0 ? (
          <p className="text-texto-suave">Nenhum profissional cadastrado ainda.</p>
        ) : (
          <ul className="space-y-3">
            {profissionais.map((p) => (
              <li
                key={p.id}
                className={`rounded-cartao border-2 bg-superficie p-4 ${p.status_profissional === "pendente" ? "border-rosa-300" : "border-borda"}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-extrabold">{p.nome}</p>
                    <p className="text-sm text-texto-suave">
                      {p.profissao} · {p.registro_conselho} · {p.ubs_nome ?? "sem UBS"}
                    </p>
                    <p className="text-sm text-texto-suave">
                      {p.email}
                      {p.telefone && ` · ${formatarTelefone(p.telefone)}`} · desde {formatarData(p.criado_em?.slice(0, 10))}
                    </p>
                    <p className="mt-1 text-sm font-bold">{STATUS_PROFISSIONAL[p.status_profissional]}</p>
                  </div>
                  <BotoesAprovacao id={p.id} nome={p.nome} status={p.status_profissional} />
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="text-sm text-texto-suave">
          Antes de aprovar, confira o registro no conselho (COREN/CRM) e se a pessoa trabalha na UBS
          informada.
        </p>
      </Secao>

      <Secao id="ubs" titulo="UBS e USF" icone={Building2}>
        <div className="rounded-cartao border border-borda bg-superficie p-4">
          <FormNovaUbs />
        </div>
        <ul className="divide-y divide-borda rounded-cartao border border-borda bg-superficie">
          {(listaUbs ?? []).map((u) => (
            <li key={u.id} className="flex items-center justify-between gap-3 p-3">
              <span className={u.ativa ? "" : "text-texto-suave line-through"}>
                <strong>{u.nome}</strong>
                {u.bairro && ` — ${u.bairro}`}
              </span>
              <BotaoAtivarUbs id={u.id} ativa={u.ativa} nome={u.nome} />
            </li>
          ))}
        </ul>
      </Secao>

      <BotaoSair acao={sair}>
        <LogOut aria-hidden="true" className="size-5" />
        Sair da conta
      </BotaoSair>
    </div>
  );
}
