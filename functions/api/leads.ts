import { validateLead } from "../../src/lib/validation";
import { flags, siteConfig } from "../../src/data/siteConfig";
import { json, readJson, sameOrigin, esc } from "../../src/lib/server/http";
import { verifyTurnstile } from "../../src/lib/server/turnstile";
import { insertRow } from "../../src/lib/server/supabase";
import { sendEmail, emailShell } from "../../src/lib/server/resend";
import type { Env } from "../../src/lib/server/env";

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!flags.newsletterEnabled) return json({ ok: false, error: "Sign-ups are currently closed." }, 403);
  if (!sameOrigin(request)) return json({ ok: false, error: "Forbidden." }, 403);
  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid request." }, 400);

  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if (typeof body.website === "string" && body.website) return json({ ok: true });

  const parsed = validateLead(body);
  if (!parsed.ok) return json({ ok: false, errors: parsed.errors }, 422);

  const human = await verifyTurnstile(body.turnstileToken, env, request.headers.get("CF-Connecting-IP"));
  if (!human) return json({ ok: false, error: "Verification failed. Please try again." }, 400);

  const lead = parsed.data;
  try {
    await insertRow(env, "leads", lead, { upsertOn: "email" });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: "We couldn't save your details. Please try again shortly." }, 500);
  }

  const notify = env.NOTIFY_EMAIL;
  const jobs: Promise<void>[] = [];
  if (notify)
    jobs.push(
      sendEmail(env, {
        to: notify,
        subject: `New MANAVÉ lead: ${lead.first_name} ${lead.last_name}`,
        text: `${lead.first_name} ${lead.last_name}\n${lead.email}\n${lead.phone ?? "(no phone)"}\nSource: ${lead.discovery_source}`,
        html: emailShell(
          `<p><strong>New lead</strong></p><p>${esc(lead.first_name)} ${esc(lead.last_name)}<br>${esc(lead.email)}<br>${esc(lead.phone ?? "(no phone)")}<br>Heard about us via: ${esc(lead.discovery_source)}</p>`,
        ),
      }),
    );
  const address = env.MAILING_ADDRESS ? `${esc(env.MAILING_ADDRESS)}<br>` : "";
  jobs.push(
    sendEmail(env, {
      to: lead.email,
      subject: "Welcome to MANAVÉ",
      text: `Hello ${lead.first_name},\n\nThank you for joining us. MANAVÉ is premium tequila crafted from agave cultivated in Los Altos de Jalisco and made in El Arenal, Jalisco. We'll be in touch with news, tastings, and where to find us.\n\n${siteConfig.tagline}.\n\nTo unsubscribe, reply to this email with "unsubscribe".\n${env.MAILING_ADDRESS ?? ""}\nPlease enjoy responsibly. Must be 21 or older.`,
      html: emailShell(
        `<p>Hello ${esc(lead.first_name)},</p><p>Thank you for joining us. MANAVÉ is premium tequila crafted from agave cultivated in Los Altos de Jalisco and made in El Arenal, Jalisco.</p><p>We'll be in touch with news, tastings, and where to find us.</p><p style="font-style:italic;color:#5B6E5A">${siteConfig.tagline}</p>`,
        `${address}To unsubscribe, reply to this email with “unsubscribe”.<br>`,
      ),
      replyTo: notify || undefined,
    }),
  );
  waitUntil(Promise.allSettled(jobs));
  return json({ ok: true });
};
