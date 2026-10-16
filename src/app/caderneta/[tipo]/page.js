import { notFound } from "next/navigation";
import { exigirPapel, getCaderneta } from "@/lib/dal";
import { hoje } from "@/lib/datas";
import { resumoDaGestacao } from "@/lib/gestacao";
import { registros } from "@/lib/caderneta-config";
import { adicionarRegistro } from "@/lib/actions/caderneta";
import { ContentIcon } from "@/content/icons";
import ListaRegistros from "@/components/caderneta/ListaRegistros";
import { FormRegistro } from "@/components/forms/FormsCaderneta";
import Callout from "@/components/ui/Callout";

export async function generateMetadata({ params }) {
  const { tipo } = await params;
  return { title: registros[tipo]?.titulo ?? "Caderneta" };
}

export default async function RegistrosPage({ params }) {
  const { tipo } = await params;
  const config = Object.hasOwn(registros, tipo) ? registros[tipo] : null;
  if (!config) notFound();

  const perfil = await exigirPapel(["gestante"], `/caderneta/${tipo}`);
  const caderneta = await getCaderneta();
  const dataDeHoje = hoje();
  // DUM "efetiva" (considera a DPP do ultrassom), para mostrar as semanas em cada registro.
  const dum = resumoDaGestacao(caderneta.gestacao, dataDeHoje)?.dum ?? caderneta.gestacao?.dum;
  // Exames são registrados pela equipe da UBS (decisão da equipe do projeto).
  const soEquipe = tipo === "exames";

  const examesPorConsulta = {};
  if (tipo === "consultas") {
    for (const e of caderneta.exames) {
      if (e.consulta_id) (examesPorConsulta[e.consulta_id] ??= []).push(e);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rosa-100 text-rosa-700"
        >
          <ContentIcon name={config.icone} className="size-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-rosa-800">{config.titulo}</h1>
          <p className="mt-1 text-texto-suave">
            {soEquipe
              ? "Seus exames são registrados pela equipe da sua UBS, a cada consulta. Aqui você acompanha os pedidos e os resultados."
              : config.intro}
          </p>
        </div>
      </div>

      {soEquipe ? (
        !caderneta.perfil?.autoriza_ubs && (
          <Callout title="Quer que seus exames apareçam aqui?">
            Em &quot;Minha conta&quot;, escolha sua UBS e autorize a equipe a registrar na sua caderneta.
          </Callout>
        )
      ) : (
        <FormRegistro tipo={tipo} acao={adicionarRegistro.bind(null, tipo)} />
      )}

      <ListaRegistros
        tipo={tipo}
        lista={caderneta[tipo]}
        dum={dum}
        dataDeHoje={dataDeHoje}
        local={caderneta.perfil?.ubs_cadastrada?.nome ?? caderneta.perfil?.ubs}
        examesPorConsulta={examesPorConsulta}
        // A gestante apaga o que é dela; exames, só os que ela mesma anotou antes desta versão.
        podeApagar={(r) => !soEquipe || !r.registrado_por || r.registrado_por === perfil.id}
        comAgenda
        vazio={
          soEquipe
            ? "Nenhum exame registrado ainda."
            : `Nenhum registro ainda. Toque em "Adicionar ${config.singular}" para começar.`
        }
      />
    </div>
  );
}
