import { GoTrueClient } from "@supabase/auth-js";

import {
  isSupabaseConfigured,
  setAccessToken,
} from "./supabaseClient";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

/*
 * Вход для /admin. Импортируется только оттуда: страница уже
 * подгружается отдельным файлом по клику (см. routes.tsx), а
 * значит GoTrueClient — самая тяжёлая часть здешнего Supabase —
 * никогда не попадёт в бандл, который скачивают обычные
 * посетители сайта.
 */
export const auth = isSupabaseConfigured
  ? new GoTrueClient({
      url: `${SUPABASE_URL}/auth/v1`,
      headers: {
        apikey: SUPABASE_ANON_KEY as string,
      },
      storageKey: "portfolio-admin-auth",
    })
  : null;

auth?.onAuthStateChange((_event, session) => {
  setAccessToken(session?.access_token ?? null);
});
