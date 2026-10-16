"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import Badge from "@/components/ui/Badge";

/*
 * Checklist que a gestante pode marcar. O que ela marca fica sempre neste
 * aparelho (localStorage) e, se ela estiver logada, também na conta
 * (tabela checklist_marcados) — assim aparece em qualquer aparelho.
 * Guarda os textos marcados (e não a posição), para não embaralhar se a lista mudar.
 */
const PREFIX = "mg-checklist:";
const CHANGE_EVENT = "mg-checklist-change";

function read(key) {
  try {
    return localStorage.getItem(PREFIX + key) ?? "[]";
  } catch {
    return "[]";
  }
}

function lerItens(key) {
  try {
    return new Set(JSON.parse(read(key)));
  } catch {
    return new Set();
  }
}

function write(key, itens) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify([...itens]));
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Apaga deste aparelho todos os checklists (usado ao sair da conta). */
export function limparChecklistsLocais() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {}
}

/** Usuária logada? (lê a sessão guardada no navegador; o banco confere de novo com RLS). */
async function usuarioLogado() {
  if (!isSupabaseConfigured) return null;
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ? { supabase, userId: session.user.id } : null;
}

/** Junta o que está no aparelho com o que está na conta, e salva nos dois. */
async function sincronizar(id) {
  const conta = await usuarioLogado();
  if (!conta) return;
  const { data, error } = await conta.supabase
    .from("checklist_marcados")
    .select("item")
    .eq("checklist_id", id);
  if (error) return;

  const naConta = new Set(data.map((r) => r.item));
  const noAparelho = lerItens(id);
  const soNoAparelho = [...noAparelho].filter((item) => !naConta.has(item));
  if (soNoAparelho.length > 0) {
    await conta.supabase
      .from("checklist_marcados")
      .upsert(soNoAparelho.map((item) => ({ user_id: conta.userId, checklist_id: id, item })));
  }
  write(id, new Set([...naConta, ...noAparelho]));
}

async function salvarNaConta(id, item, marcado) {
  const conta = await usuarioLogado();
  if (!conta) return;
  const tabela = conta.supabase.from("checklist_marcados");
  if (marcado) await tabela.upsert({ user_id: conta.userId, checklist_id: id, item });
  else await tabela.delete().eq("checklist_id", id).eq("item", item);
}

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export default function InteractiveChecklist({ id, title, badge, items }) {
  const headingId = useId();
  // No servidor e na primeira pintura nada vem marcado; depois o navegador lê o que foi salvo.
  const raw = useSyncExternalStore(subscribe, () => read(id), () => "[]");
  let checked;
  try {
    checked = new Set(JSON.parse(raw));
  } catch {
    checked = new Set();
  }
  const done = items.filter((item) => checked.has(item)).length;

  useEffect(() => {
    sincronizar(id);
  }, [id]);

  function toggle(item) {
    const next = new Set(checked);
    const marcado = !next.has(item);
    if (marcado) next.add(item);
    else next.delete(item);
    write(id, next);
    salvarNaConta(id, item, marcado);
  }

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-cartao border border-borda bg-superficie p-4 shadow-cartao"
    >
      {badge && (
        <div className="mb-1">
          <Badge type={badge} />
        </div>
      )}
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="text-lg font-extrabold text-rosa-800">
          {title}
        </h2>
        <span className="shrink-0 text-sm font-bold text-texto-suave">
          {done} de {items.length}
        </span>
      </div>
      <ul className="space-y-1">
        {items.map((item) => {
          const isChecked = checked.has(item);
          return (
            <li key={item}>
              <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-rosa-50">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rosa-600 ${isChecked ? "border-rosa-600 bg-rosa-600 text-white" : "border-rosa-300 bg-superficie"}`}
                >
                  {isChecked && <Check className="size-4" strokeWidth={3} />}
                </span>
                <span className={isChecked ? "text-texto-suave line-through" : ""}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
