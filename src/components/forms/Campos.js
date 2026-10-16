"use client";

import { useEffect, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { Camera, CircleCheck, Eye, EyeOff, LoaderCircle, TriangleAlert, X } from "lucide-react";
import { formatarCNS, formatarCPF, formatarTelefone } from "@/lib/documentos";

const MASCARAS = { cpf: formatarCPF, cns: formatarCNS, telefone: formatarTelefone };

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
  mascara,
}) {
  const id = useId();
  const formatar = MASCARAS[mascara];
  const idDica = `${id}-dica`;
  const idErro = `${id}-erro`;
  const descritores = [dica && idDica, erro && idErro].filter(Boolean).join(" ") || undefined;

  const props = {
    id,
    name: nome,
    defaultValue: formatar && valor ? formatar(valor) : (valor ?? ""),
    // Formata enquanto digita (ex.: 529.982.247-25); o servidor guarda só os dígitos.
    onInput: formatar ? (e) => (e.currentTarget.value = formatar(e.currentTarget.value)) : undefined,
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
            inputMode={inputMode ?? (tipo === "number" ? "decimal" : formatar ? "numeric" : undefined)}
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

/** Lista de opções (ex.: escolher a UBS). `opcoes`: [{ valor, rotulo }]. */
export function CampoSelecao({ nome, rotulo, opcoes, obrigatorio = false, valor, erro, dica, vazio = "Escolha…" }) {
  const id = useId();
  const idDica = `${id}-dica`;
  const idErro = `${id}-erro`;
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-bold">
        {rotulo}
        {!obrigatorio && <span className="font-normal text-texto-suave"> (opcional)</span>}
      </label>
      <select
        id={id}
        name={nome}
        defaultValue={valor ?? ""}
        required={obrigatorio}
        aria-invalid={erro ? true : undefined}
        aria-describedby={[dica && idDica, erro && idErro].filter(Boolean).join(" ") || undefined}
        className={`${estiloEntrada} ${erro ? "border-alerta-600" : "border-borda"}`}
      >
        <option value="">{vazio}</option>
        {opcoes.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.rotulo}
          </option>
        ))}
      </select>
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

/** Caixa de marcar com texto ao lado (ex.: autorizar a UBS). */
export function CampoMarcar({ nome, children, marcado = false, erro }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-xl border-2 border-borda bg-superficie p-3">
        <input
          id={id}
          type="checkbox"
          name={nome}
          value="sim"
          defaultChecked={marcado}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
          className="mt-1 size-6 shrink-0 accent-rosa-600"
        />
        <span>{children}</span>
      </label>
      {erro && (
        <p id={`${id}-erro`} className="mt-1 text-sm font-bold text-alerta-700">
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

const LADO_FOTO = 512;

/**
 * Reduz a foto no próprio celular (quadrada, 512 px, JPEG) antes de enviar:
 * fica leve para internet fraca. Devolve null se o navegador não conseguir.
 */
async function reduzirFoto(arquivo) {
  try {
    const bitmap = await createImageBitmap(arquivo, { imageOrientation: "from-image" });
    const lado = Math.min(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = LADO_FOTO;
    canvas
      .getContext("2d")
      .drawImage(bitmap, (bitmap.width - lado) / 2, (bitmap.height - lado) / 2, lado, lado, 0, 0, LADO_FOTO, LADO_FOTO);
    const blob = await new Promise((ok) => canvas.toBlob(ok, "image/jpeg", 0.85));
    return blob ? new File([blob], "foto.jpg", { type: "image/jpeg" }) : null;
  } catch {
    return null;
  }
}

/** Foto de perfil: escolher da galeria ou tirar com a câmera, com prévia redonda. */
export function CampoFoto({ nome = "foto", rotulo = "Sua foto", fotoAtual, erro }) {
  const id = useId();
  const [previa, setPrevia] = useState(fotoAtual ?? null);
  const [aviso, setAviso] = useState(null);

  // O React limpa o formulário depois de cada envio (inclusive o arquivo escolhido):
  // a prévia volta junto, para não mostrar uma foto que não será enviada.
  useEffect(() => {
    const formulario = document.getElementById(id)?.form;
    if (!formulario) return;
    const aoLimpar = () => setPrevia(fotoAtual ?? null);
    formulario.addEventListener("reset", aoLimpar);
    return () => formulario.removeEventListener("reset", aoLimpar);
  }, [id, fotoAtual]);

  async function escolher(e) {
    const input = e.currentTarget;
    const original = input.files?.[0];
    setAviso(null);
    if (!original) return;
    if (!original.type.startsWith("image/")) {
      input.value = "";
      setAviso("Escolha uma foto (imagem).");
      return;
    }
    const reduzida = await reduzirFoto(original);
    if (reduzida) {
      // Troca o arquivo do campo pela versão reduzida.
      const lista = new DataTransfer();
      lista.items.add(reduzida);
      input.files = lista.files;
    }
    setPrevia(URL.createObjectURL(reduzida ?? original));
  }

  function remover() {
    const input = document.getElementById(id);
    if (input) input.value = "";
    setPrevia(fotoAtual ?? null);
  }

  const mensagem = aviso ?? erro;
  return (
    <div>
      <p className="mb-2 font-bold">
        {rotulo} <span className="font-normal text-texto-suave">(opcional)</span>
      </p>
      <div className="flex items-center gap-4">
        <span className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-rosa-100 text-rosa-600 ring-4 ring-superficie">
          {previa ? (
            // eslint-disable-next-line @next/next/no-img-element -- prévia local (blob:) ou link temporário do Storage
            <img src={previa} alt="Prévia da sua foto" className="size-full object-cover" />
          ) : (
            <Camera aria-hidden="true" className="size-8" />
          )}
        </span>
        <div className="flex flex-wrap gap-2">
          <label
            htmlFor={id}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border-2 border-rosa-300 bg-superficie px-4 font-bold text-rosa-700 focus-within:outline-3 focus-within:outline-rosa-600 hover:bg-rosa-50"
          >
            <Camera aria-hidden="true" className="size-5" />
            {previa ? "Trocar foto" : "Escolher foto"}
            <input
              id={id}
              name={nome}
              type="file"
              accept="image/*"
              onChange={escolher}
              aria-invalid={mensagem ? true : undefined}
              aria-describedby={mensagem ? `${id}-erro` : undefined}
              className="sr-only"
            />
          </label>
          {previa && previa !== fotoAtual && (
            <button
              type="button"
              onClick={remover}
              className="inline-flex min-h-12 items-center gap-1 rounded-full px-3 font-bold text-texto-suave hover:bg-rosa-50"
            >
              <X aria-hidden="true" className="size-5" />
              Desfazer
            </button>
          )}
        </div>
      </div>
      {mensagem && (
        <p id={`${id}-erro`} className="mt-1 text-sm font-bold text-alerta-700">
          {mensagem}
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
