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
  await supabase.auth.getClaims();

  return response;
}
