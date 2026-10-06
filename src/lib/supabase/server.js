import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseKey, supabaseUrl } from "./config";

// Cliente para Server Components, Server Functions e Route Handlers.
// Crie um novo a cada requisição — nunca reutilize entre usuários.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Chamado de um Server Component: não dá para gravar cookies aqui.
          // O proxy (src/proxy.js) já renova a sessão a cada requisição.
        }
      },
    },
  });
}
