-- MANAVÉ initial schema ------------------------------------------------------
-- All writes happen server-side (Cloudflare Pages Functions) with the service
-- role key, which bypasses RLS. The anon key can only read approved reviews and
-- locations. leads / contact_requests are not readable or writable by anon.

create extension if not exists pgcrypto;

-- leads ----------------------------------------------------------------------
create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  first_name       text not null check (char_length(first_name) between 1 and 80),
  last_name        text not null check (char_length(last_name) between 1 and 80),
  email            text not null check (email = lower(email) and char_length(email) <= 254),
  phone            text check (phone is null or char_length(phone) between 7 and 30),
  discovery_source text not null check (discovery_source in
                     ('Retail Store','Resort','Duty-Free','Friend / Family','Social Media','Event / Tasting','Other')),
  created_at       timestamptz not null default now(),
  constraint leads_email_key unique (email)
);
create index leads_created_at_idx on public.leads (created_at desc);

-- contact_requests -----------------------------------------------------------
create table public.contact_requests (
  id           uuid primary key default gen_random_uuid(),
  name         text not null check (char_length(name) between 1 and 120),
  email        text not null check (char_length(email) <= 254),
  company      text check (company is null or char_length(company) <= 160),
  inquiry_type text not null check (inquiry_type in ('General','Retail','Distribution','Resort','Media')),
  message      text not null check (char_length(message) between 10 and 4000),
  created_at   timestamptz not null default now()
);
create index contact_requests_created_at_idx on public.contact_requests (created_at desc);

-- reviews --------------------------------------------------------------------
create table public.reviews (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 80),
  location   text check (location is null or char_length(location) <= 80),
  expression text not null check (expression in ('Blanco','Coffee','Passion Fruit','Piña Colada')),
  rating     smallint not null check (rating between 1 and 5),
  review     text not null check (char_length(review) between 10 and 2000),
  approved   boolean not null default false,
  created_at timestamptz not null default now()
);
create index reviews_approved_idx on public.reviews (approved, created_at desc);

-- locations ------------------------------------------------------------------
create table public.locations (
  id            uuid primary key default gen_random_uuid(),
  location_name text not null,
  location_type text not null check (location_type in ('retail','resort','duty-free','bar-restaurant','region')),
  city          text,
  state         text,
  country       text not null default 'USA',
  coming_soon   boolean not null default true
);
create index locations_geo_idx on public.locations (country, state, city);

-- Row Level Security ---------------------------------------------------------
alter table public.leads             enable row level security;
alter table public.contact_requests  enable row level security;
alter table public.reviews           enable row level security;
alter table public.locations         enable row level security;

-- No policies on leads / contact_requests: anon + authenticated have no access.
-- Service role bypasses RLS.

create policy "Public can read approved reviews"
  on public.reviews for select to anon, authenticated
  using (approved = true);

create policy "Public can read locations"
  on public.locations for select to anon, authenticated
  using (true);

-- Belt and braces: remove default table grants for anon/authenticated where not needed.
revoke all on public.leads, public.contact_requests from anon, authenticated;
revoke all on public.reviews, public.locations from anon, authenticated;
grant select on public.reviews to anon, authenticated; -- RLS limits rows to approved = true
grant select on public.locations to anon, authenticated;
