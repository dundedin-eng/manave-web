import { validateContact } from "../../src/lib/validation";
import { json, readJson, sameOrigin, esc } from "../../src/lib/server/http";
import { verifyTurnstile } from "../../src/lib/server/turnstile";
import { insertRow } from "../../src/lib/server/supabase";
import { sendEmail, emailShell } from "../../src/lib/server/resend";
import type { Env } from "../../src/lib/server/env";

export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (!sameOrigin(request)) return json({ ok: false, error: "Forbidden." }, 403);
  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid request." }, 400);
  if (typeof body.website === "string" && body.website) return json({ ok: true });

  const parsed = validateContact(body);
  if (!parsed.ok) return json({ ok: false, errors: parsed.errors }, 422);

  const human = await verifyTurnstile(body.turnstileToken, env, request.headers.get("CF-Connecting-IP"));
  if (!human) return json({ ok: false, error: "Verification failed. Please try again." }, 400);

  const c = parsed.data;
  try {
    await insertRow(env, "contact_requests", c);
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: "We couldn't send your message. Please try again shortly." }, 500);
  }

  const jobs: Promise<void>[] = [];
  if (env.NOTIFY_EMAIL)
    jobs.push(
      sendEmail(env, {
        to: env.NOTIFY_EMAIL,
        replyTo: c.email,
        subject: `MANAVÉ ${c.inquiry_type} inquiry from ${c.name}`,
        text: `${c.name} <${c.email}>\nCompany: ${c.company ?? "-"}\nType: ${c.inquiry_type}\n\n${c.message}`,
        html: emailShell(
          `<p><strong>${esc(c.inquiry_type)} inquiry</strong></p><p>${esc(c.name)} &lt;${esc(c.email)}&gt;<br>Company: ${esc(c.company ?? "-")}</p><p style="white-space:pre-wrap">${esc(c.message)}</p>`,
        ),
      }),
    );
  jobs.push(
    sendEmail(env, {
      to: c.email,
      replyTo: env.NOTIFY_EMAIL || undefined,
      subject: "We received your message — MANAVÉ",
      text: `Hello ${c.name},\n\nThank you for reaching out to MANAVÉ. We've received your ${c.inquiry_type.toLowerCase()} inquiry and will reply soon.\n\nReuniendo a Familiares y Amigos.`,
      html: emailShell(
        `<p>Hello ${esc(c.name)},</p><p>Thank you for reaching out to MANAVÉ. We've received your ${esc(c.inquiry_type.toLowerCase())} inquiry and will reply soon.</p><p style="font-style:italic;color:#5B6E5A">Reuniendo a Familiares y Amigos</p>`,
      ),
    }),
  );
  waitUntil(Promise.allSettled(jobs));
  return json({ ok: true });
};
