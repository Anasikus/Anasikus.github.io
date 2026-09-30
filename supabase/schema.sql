-- Таблица отзывов и правила доступа к ней.
-- Выполните этот файл целиком в Supabase: SQL Editor -> New query -> вставить -> Run.
--
-- Как это устроено:
--   1. Любой посетитель сайта может ДОБАВИТЬ отзыв (INSERT).
--      Триггер ниже принудительно ставит ему status = 'pending',
--      что бы ни прислал браузер, — обойти модерацию через код
--      страницы (например через консоль разработчика) нельзя.
--   2. Любой посетитель может ЧИТАТЬ только отзывы со
--      status = 'approved' — то, что вы одобрили.
--   3. Читать/менять/удалять ЛЮБЫЕ отзывы (включая ожидающие
--      проверки) может только тот, кто вошёл в Supabase под
--      admin-логином — см. supabase/README.md, шаг 3.
--
-- Замените почту ниже на ту, под которой будете заходить в
-- /admin на сайте (можно оставить как есть, если это она).

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  rating smallint not null check (rating between 1 and 5),
  text text not null check (char_length(trim(text)) between 1 and 1000),
  project_id text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected'))
);

alter table public.reviews enable row level security;

-- 1. Отправить отзыв может кто угодно.
drop policy if exists "public can insert reviews" on public.reviews;
create policy "public can insert reviews"
  on public.reviews
  for insert
  to anon
  with check (true);

-- 2. Читать может кто угодно, но только одобренные отзывы.
drop policy if exists "public can read approved reviews" on public.reviews;
create policy "public can read approved reviews"
  on public.reviews
  for select
  to anon
  using (status = 'approved');

-- 3. Админ (вошедший в Supabase Auth под своей почтой) видит,
-- меняет статус и удаляет любые отзывы — это и есть модерация.
drop policy if exists "admin can read all reviews" on public.reviews;
create policy "admin can read all reviews"
  on public.reviews
  for select
  to authenticated
  using (auth.jwt() ->> 'email' = 'nastyadavydova20@gmail.com');

drop policy if exists "admin can update reviews" on public.reviews;
create policy "admin can update reviews"
  on public.reviews
  for update
  to authenticated
  using (auth.jwt() ->> 'email' = 'nastyadavydova20@gmail.com')
  with check (auth.jwt() ->> 'email' = 'nastyadavydova20@gmail.com');

drop policy if exists "admin can delete reviews" on public.reviews;
create policy "admin can delete reviews"
  on public.reviews
  for delete
  to authenticated
  using (auth.jwt() ->> 'email' = 'nastyadavydova20@gmail.com');

-- Принудительно "pending" на каждую новую запись — главная защита
-- от того, что кто-то пришлёт отзыв сразу со статусом "approved".
create or replace function public.reviews_force_pending()
returns trigger
language plpgsql
as $$
begin
  new.status := 'pending';
  return new;
end;
$$;

drop trigger if exists reviews_force_pending_on_insert on public.reviews;
create trigger reviews_force_pending_on_insert
  before insert on public.reviews
  for each row
  execute function public.reviews_force_pending();
