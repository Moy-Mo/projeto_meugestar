import { notFound } from "next/navigation";
import { CalendarDays, FlaskConical, Phone, ScanLine, Stethoscope, Syringe } from "lucide-react";
import { exigirPapel, getCadernetaDaPaciente } from "@/lib/dal";
import { diasEntre, formatarData, hoje } from "@/lib/datas";
import { formatarCNS, formatarCPF, formatarTelefone } from "@/lib/documentos";
import { resumoDaGestacao } from "@/lib/gestacao";
import { calcularLembretes } from "@/lib/lembretes";
import {
  adicionarRegistroPaciente,
  atualizarGestacaoPaciente,
  registrarConsulta,
  removerRegistroPaciente,
} from "@/lib/actions/ubs";
import ListaRegistros from "@/components/caderneta/ListaRegistros";
import { MeusLembretes, MinhaGestacao } from "@/components/caderneta/Resumo";
import { FormGestacao, FormRegistro } from "@/components/forms/FormsCaderneta";
import { FormConsulta } from "@/components/ubs/FormConsulta";
import Callout from "@/components/ui/Callout";
import Expandable from "@/components/ui/Expandable";
import PageHeader from "@/components/ui/PageHeader";

export const metadata = { title: "Caderneta da paciente", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

export default async function PacientePage({ params }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const profissional = await exigirPapel(["profissional"], "/ubs");
  if (profissional.status_profissional !== "aprovado") notFound();
  // O banco só devolve se a gestante autorizou a UBS deste profissional (senão: 404).
  const c = await getCadernetaDaPaciente(id);

  const dataDeHoje = hoje();
  const resumo = resumoDaGestacao(c.gestacao, dataDeHoje);
  const dum = resumo?.dum ?? c.gestacao?.dum;
  const idade = c.perfil.data_nascimento
    ? Math.floor(diasEntre(c.perfil.data_nascimento, dataDeHoje) / 365.25)
    : null;

  const examesPorConsulta = {};
  for (const e of c.exames) if (e.consulta_id) (examesPorConsulta[e.consulta_id] ??= []).push(e);

  // O profissional só apaga o que ele mesmo registrou (o banco confere de novo).
  const doProfissional = (r) => r.registrado_por === profissional.id;
  const remover = removerRegistroPaciente.bind(null, id);
  const comum = { dum, dataDeHoje, podeApagar: doProfissional, acaoRemover: remover };

  return (
    <div className="space-y-8">
      <PageHeader backHref="/ubs" backLabel="Painel da UBS" icon={Stethoscope} title={c.perfil.nome} />

      <dl className="grid gap-3 rounded-cartao border border-borda bg-superficie p-4 shadow-cartao sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-sm font-bold text-texto-suave">CPF</dt>
          <dd>{c.perfil.cpf ? formatarCPF(c.perfil.cpf) : "—"}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-texto-suave">Cartão SUS</dt>
          <dd>{c.perfil.cns ? formatarCNS(c.perfil.cns) : "—"}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-texto-suave">Nascimento</dt>
          <dd>
            {c.perfil.data_nascimento ? `${formatarData(c.perfil.data_nascimento)} (${idade} anos)` : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-texto-suave">Telefone</dt>
          <dd>
            {c.perfil.telefone ? (
              <a href={`tel:${c.perfil.telefone}`} className="inline-flex items-center gap-1 font-bold text-rosa-700 underline">
                <Phone aria-hidden="true" className="size-4" />
                {formatarTelefone(c.perfil.telefone)}
              </a>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>

      <div className="space-y-6 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:space-y-0">
        <MinhaGestacao
          nome={c.perfil.nome.split(" ")[0]}
          resumo={resumo}
          altoRisco={c.gestacao?.alto_risco}
          daGestante={false}
        />
        <MeusLembretes titulo="Pendências" lembretes={calcularLembretes(c, dataDeHoje)} soLinksDoGuia />
      </div>

      <Secao id="nova-consulta" titulo="Registrar consulta" icone={Stethoscope}>
        <div className="rounded-cartao border-2 border-rosa-200 bg-superficie p-4 shadow-cartao lg:p-6">
          <FormConsulta acao={registrarConsulta.bind(null, id)} />
        </div>
      </Secao>

      <Secao id="consultas" titulo={`Consultas (${c.consultas.length})`} icone={CalendarDays}>
        <ListaRegistros tipo="consultas" lista={c.consultas} examesPorConsulta={examesPorConsulta} {...comum} />
      </Secao>

      <Secao id="exames" titulo={`Exames (${c.exames.length})`} icone={FlaskConical}>
        <FormRegistro tipo="exames" acao={adicionarRegistroPaciente.bind(null, id, "exames")} />
        <ListaRegistros tipo="exames" lista={c.exames} {...comum} />
      </Secao>

      <Secao id="vacinas" titulo={`Vacinas (${c.vacinas.length})`} icone={Syringe}>
        <FormRegistro tipo="vacinas" acao={adicionarRegistroPaciente.bind(null, id, "vacinas")} />
        <ListaRegistros tipo="vacinas" lista={c.vacinas} {...comum} />
      </Secao>

      <Secao id="ultrassons" titulo={`Ultrassons (${c.ultrassons.length})`} icone={ScanLine}>
        <FormRegistro tipo="ultrassons" acao={adicionarRegistroPaciente.bind(null, id, "ultrassons")} />
        <ListaRegistros tipo="ultrassons" lista={c.ultrassons} {...comum} />
      </Secao>

      <Expandable title="Dados da gestação (DUM, DPP do ultrassom, alto risco)">
        <FormGestacao gestacao={c.gestacao} acao={atualizarGestacaoPaciente.bind(null, id)} daGestante={false} />
      </Expandable>

      <Callout title="Sigilo">
        A gestante pode ver que você abriu a caderneta dela e pode retirar a autorização da UBS a
        qualquer momento.
      </Callout>
    </div>
  );
}
