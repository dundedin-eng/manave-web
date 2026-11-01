import type { Env } from "./env";

/** Verifies a Cloudflare Turnstile token. Fails closed if the secret is missing. */
export async function verifyTurnstile(token: unknown, env: Env, ip?: string | null): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY || typeof token !== "string" || !token) return false;
  const form = new FormData();
  form.append("secret", env.TURNSTILE_SECRET_KEY);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
