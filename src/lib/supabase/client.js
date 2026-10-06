import { createBrowserClient } from "@supabase/ssr";
import { supabaseKey, supabaseUrl } from "./config";

// Cliente para Client Components ("use client").
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}
