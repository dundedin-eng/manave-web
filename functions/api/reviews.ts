import { validateReview } from "../../src/lib/validation";
import { flags } from "../../src/data/siteConfig";
import { json, readJson, sameOrigin } from "../../src/lib/server/http";
import { verifyTurnstile } from "../../src/lib/server/turnstile";
import { insertRow, selectPublic } from "../../src/lib/server/supabase";
import type { Env } from "../../src/lib/server/env";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!flags.reviewsEnabled) return json({ ok: true, reviews: [] }, 200, { "cache-control": "public, max-age=60" });
  try {
    const reviews = await selectPublic(
      env,
      "reviews",
      "select=id,name,location,expression,rating,review,created_at&approved=eq.true&order=created_at.desc&limit=50",
    );
    return json({ ok: true, reviews }, 200, { "cache-control": "public, max-age=300, s-maxage=300" });
  } catch (e) {
    console.error(e);
    return json({ ok: false, reviews: [] }, 502);
  }
};

/** Submissions are stored unapproved (approved=false) and moderated in Supabase. */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!flags.reviewsEnabled) return json({ ok: false, error: "Reviews are not open yet." }, 403);
  if (!sameOrigin(request)) return json({ ok: false, error: "Forbidden." }, 403);
  const body = await readJson(request);
  if (!body) return json({ ok: false, error: "Invalid request." }, 400);
  if (typeof body.website === "string" && body.website) return json({ ok: true });
  const parsed = validateReview(body);
  if (!parsed.ok) return json({ ok: false, errors: parsed.errors }, 422);
  if (!(await verifyTurnstile(body.turnstileToken, env, request.headers.get("CF-Connecting-IP"))))
    return json({ ok: false, error: "Verification failed. Please try again." }, 400);
  try {
    await insertRow(env, "reviews", { ...parsed.data, approved: false });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: "We couldn't save your review. Please try again shortly." }, 500);
  }
  return json({ ok: true });
};
