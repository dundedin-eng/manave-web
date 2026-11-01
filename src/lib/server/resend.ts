import type { Env } from "./env";

export async function sendEmail(
  env: Env,
  msg: { to: string | string[]; subject: string; html: string; text: string; replyTo?: string },
): Promise<void> {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) return; // email is optional; never block the form
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
}

/** Branded, table-based wrapper that works in major mail clients. */
export function emailShell(inner: string, footer = ""): string {
  return `<!doctype html><html><body style="margin:0;background:#F6F0E5;font-family:Georgia,'Times New Roman',serif;color:#2F2F2F">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FBF8F1;border:1px solid #E6DCC8">
<tr><td style="padding:36px 40px 8px;text-align:center"><div style="font-size:30px;letter-spacing:6px;color:#3F564C">MANAVÉ</div>
<div style="font-style:italic;color:#5B6E5A;font-size:15px;margin-top:4px">by Arroyo Seco</div>
<div style="width:44px;height:1px;background:#B49A63;margin:18px auto 0"></div></td></tr>
<tr><td style="padding:24px 40px 12px;font-size:16px;line-height:1.65">${inner}</td></tr>
<tr><td style="padding:12px 40px 32px;font-size:12px;line-height:1.6;color:#5f5f5f;text-align:center">${footer}Please enjoy responsibly. Must be 21 or older.</td></tr>
</table></td></tr></table></body></html>`;
}
