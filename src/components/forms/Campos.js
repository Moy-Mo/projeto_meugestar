"use client";

import { useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { CircleCheck, Eye, EyeOff, LoaderCircle, TriangleAlert } from "lucide-react";

const estiloEntrada =
  "min-h-12 w-full rounded-xl border-2 bg-superficie px-4 py-2 text-texto placeholder:text-texto-suave/70 focus:border-rosa-500 focus:outline-none aria-[invalid=true]:border-alerta-600";

/**
 * Campo de formulário: rótulo + entrada + dica + erro.
 * O erro e a dica ficam ligados à entrada por aria-describedby.
 */
export function Campo({
  nome,
  rotulo,
  tipo = "text",
  obrigatorio = false,
  dica,
  erro,
  valor,
  sufixo,
  lista,
  min,
  max,
  passo,
  maxLength,
  autoComplete,
  inputMode,
}) {
  const id = useId();
  const idDica = `${id}-dica`;
  const idErro = `${id}-erro`;
  const descritores = [dica && idDica, erro && idErro].filter(Boolean).join(" ") || undefined;

  const props = {
    id,
    name: nome,
    defaultValue: valor ?? "",
    required: obrigatorio,
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": descritores,
    maxLength,
    autoComplete,
    className: `${estiloEntrada} ${erro ? "border-alerta-600" : "border-borda"}`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-bold">
        {rotulo}
        {!obrigatorio && <span className="font-normal text-texto-suave"> (opcional)</span>}
      </label>
      {tipo === "textarea" ? (
        <textarea {...props} rows={3} />
      ) : (
        <div className="flex items-center gap-2">
          <input
            {...props}
            type={tipo}
            list={lista}
            min={min}
            max={max}
            step={passo ?? (tipo === "number" ? "1" : undefined)}
            inputMode={inputMode ?? (tipo === "number" ? "decimal" : undefined)}
          />
          {sufixo && <span className="shrink-0 text-texto-suave">{sufixo}</span>}
        </div>
      )}
      {dica && (
        <p id={idDica} className="mt-1 text-sm text-texto-suave">
          {dica}
        </p>
      )}
      {erro && (
        <p id={idErro} className="mt-1 flex items-start gap-1.5 text-sm font-bold text-alerta-700">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {erro}
        </p>
      )}
    </div>
  );
}

/** Senha com botão para mostrar/esconder (ajuda quem digita no celular). */
export function CampoSenha({ nome = "senha", rotulo = "Senha", erro, dica, autoComplete = "current-password" }) {
  const id = useId();
  const [visivel, setVisivel] = useState(false);
  const idErro = `${id}-erro`;
  const idDica = `${id}-dica`;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-bold">
        {rotulo}
      </label>
      <div className="relative">
        <input
          id={id}
          name={nome}
          type={visivel ? "text" : "password"}
          required
          autoComplete={autoComplete}
          aria-invalid={erro ? true : undefined}
          aria-describedby={[dica && idDica, erro && idErro].filter(Boolean).join(" ") || undefined}
          className={`${estiloEntrada} pr-14 ${erro ? "border-alerta-600" : "border-borda"}`}
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Esconder a senha" : "Mostrar a senha"}
          aria-pressed={visivel}
          className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-rosa-700 hover:bg-rosa-50"
        >
          {visivel ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
        </button>
      </div>
      {dica && (
        <p id={idDica} className="mt-1 text-sm text-texto-suave">
          {dica}
        </p>
      )}
      {erro && (
        <p id={idErro} className="mt-1 flex items-start gap-1.5 text-sm font-bold text-alerta-700">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {erro}
        </p>
      )}
    </div>
  );
}

/** Botão de enviar que mostra "Salvando…" enquanto o servidor responde. */
export function BotaoEnviar({ children, carregando = "Aguarde…", variante = "primario" }) {
  const { pending } = useFormStatus();
  const cores =
    variante === "perigo"
      ? "bg-alerta-600 hover:bg-alerta-700 text-white"
      : "bg-rosa-600 hover:bg-rosa-700 text-white";
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-bold transition-colors disabled:cursor-wait disabled:opacity-70 ${cores}`}
    >
      {pending && <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />}
      {pending ? carregando : children}
    </button>
  );
}

/** Mensagem do resultado do envio (sucesso, erro geral ou aviso de campos com erro). */
export function Aviso({ estado }) {
  const erro =
    estado?.erro ??
    (estado?.erros && Object.keys(estado.erros).length > 0 ? "Confira os campos marcados em vermelho." : null);
  if (erro) {
    return (
      <p role="alert" className="flex gap-2 rounded-xl border-2 border-alerta-200 bg-alerta-50 p-3 font-bold text-alerta-700">
        <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        {erro}
      </p>
    );
  }
  if (estado?.sucesso) {
    return (
      <p role="status" className="flex gap-2 rounded-xl border-2 border-sucesso-200 bg-sucesso-50 p-3 font-bold text-sucesso-700">
        <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        {estado.sucesso}
      </p>
    );
  }
  return null;
}
