import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Ignora arquivos estáticos e imagens.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
