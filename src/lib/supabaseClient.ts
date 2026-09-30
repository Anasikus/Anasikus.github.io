import { PostgrestClient } from "@supabase/postgrest-js";

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

/*
 * Только PostgREST (таблицы) — этим и ограничивается работа с
 * отзывами на публичной странице. Вход через Supabase Auth нужен
 * только на /admin, поэтому он вынесен в отдельный файл
 * (lib/supabaseAuth.ts): его код (GoTrueClient — самая тяжёлая
 * часть supabase-js) не должен попадать в основной бандл сайта
 * и грузиться всем посетителям ради страницы, которую открываю
 * только я.
 */
const postgrest = isSupabaseConfigured
  ? new PostgrestClient(`${SUPABASE_URL}/rest/v1`, {
      headers: {
        apikey: SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
  : null;

/*
 * Вызывается со страницы /admin при входе/выходе — подставляет
 * токен вошедшего администратора в запросы к таблицам, иначе
 * Supabase не даст ему увидеть отзывы на проверке (см.
 * supabase/schema.sql). Без вызова используется анонимный ключ.
 */
export const setAccessToken = (
  token: string | null
) => {
  postgrest?.headers.set(
    "Authorization",
    `Bearer ${token ?? SUPABASE_ANON_KEY}`
  );
};

export const supabase = postgrest
  ? { from: postgrest.from.bind(postgrest) }
  : null;
