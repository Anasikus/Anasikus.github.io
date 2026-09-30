import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

/*
 * Пока в .env не прописаны VITE_SUPABASE_* (см. .env.example и
 * supabase/README.md), клиент не создаётся — раздел "Отзывы" и
 * страница /admin сами скрываются, вместо тихих ошибок в консоли.
 */
export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_ANON_KEY
);

export const supabase = isSupabaseConfigured
  ? createClient(
      SUPABASE_URL as string,
      SUPABASE_ANON_KEY as string
    )
  : null;
