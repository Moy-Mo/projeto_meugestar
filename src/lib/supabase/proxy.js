import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "./config";

// Renova a sessão do Supabase a cada requisição e devolve os cookies atualizados.
export async function updateSession(request) {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headers ?? {}).forEach(([key, value]) =>
          response.headers.set(key, value),
        );
      },
    },
  });

  // Não coloque código entre createServerClient e getClaims: isso causa
  // sessões que expiram sem motivo aparente.
  const { data } = await supabase.auth.getClaims();
  const logada = Boolean(data?.claims);

  // Checagem otimista (só a sessão no cookie). As páginas conferem de novo no
  // servidor (src/lib/dal.js) e o banco protege os dados com RLS.
  const caminho = request.nextUrl.pathname;
  const exigeLogin =
    caminho.startsWith("/caderneta/") || caminho === "/conta" || caminho === "/redefinir-senha";
  const soParaVisitantes = caminho === "/entrar" || caminho === "/cadastro";

  if (exigeLogin && !logada) {
    const url = new URL("/entrar", request.url);
    url.searchParams.set("voltar", caminho);
    return redirecionarMantendoCookies(url, response);
  }
  if (soParaVisitantes && logada) {
    return redirecionarMantendoCookies(new URL("/caderneta", request.url), response);
  }

  return response;
}

// O redirecionamento precisa levar os cookies de sessão que o Supabase acabou de renovar.
function redirecionarMantendoCookies(url, response) {
  const redirecionamento = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => redirecionamento.cookies.set(cookie));
  return redirecionamento;
}
