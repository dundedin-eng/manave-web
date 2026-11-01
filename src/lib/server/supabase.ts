import type { Env } from "./env";

/** Minimal PostgREST client (fetch-only, edge-safe). */
function base(env: Env) {
  return `${env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, "")}/rest/v1`;
}

export async function insertRow(
  env: Env,
  table: string,
  row: Record<string, unknown>,
  opts: { upsertOn?: string } = {},
): Promise<void> {
  const url = `${base(env)}/${table}${opts.upsertOn ? `?on_conflict=${opts.upsertOn}` : ""}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      prefer: `return=minimal${opts.upsertOn ? ",resolution=merge-duplicates" : ""}`,
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error(`Supabase insert into ${table} failed: ${res.status} ${await res.text()}`);
}

/** Public reads use the anon key and are limited by Row Level Security. */
export async function selectPublic<T>(env: Env, table: string, query: string): Promise<T[]> {
  const res = await fetch(`${base(env)}/${table}?${query}`, {
    headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` },
  });
  if (!res.ok) throw new Error(`Supabase select ${table} failed: ${res.status}`);
  return (await res.json()) as T[];
}
