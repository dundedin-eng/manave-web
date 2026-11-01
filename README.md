# manave-web

Website for **MANAVÉ by Arroyo Seco** (manave.co) — premium tequila from Los Altos de Jalisco.

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · App Router (static export) · Cloudflare Pages + Pages Functions · Supabase · Resend · Cloudflare Turnstile.

See [`docs/STACK-EVALUATION.md`](docs/STACK-EVALUATION.md) for stack verdicts and the one deliberate deviation (static export instead of a Next adapter).

## Quick start

```bash
npm install
cp .env.example .env.local        # for the Next build (NEXT_PUBLIC_* values)
cp .dev.vars.example .dev.vars    # for local Pages Functions (server secrets)
npm run dev                       # UI only (http://localhost:3000) — /api/* is not served
npm run preview                   # build + wrangler: UI AND /api/* on http://localhost:8788
```

Local testing with Turnstile test keys (always pass): site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`.

Scripts: `lint`, `typecheck`, `build` (outputs `out/`), `preview`, `deploy`, `assets` (regenerate placeholder artwork; needs Python with `pillow numpy scipy fonttools`).

## Project map

```
src/app/                 routes: / /our-story /expressions /signature-serves /where-to-experience /reviews /contact (+ /privacy)
src/components/          UI, age gate, forms, home sections
src/data/brandAssets.ts  ALL artwork paths (replace art without code changes)
src/data/siteConfig.ts   site info + feature flags + nav
src/data/content.ts      expressions, serves, markets, dropdown options
src/lib/                 validation (shared), seo helpers, server helpers (supabase/resend/turnstile)
functions/api/           Cloudflare Pages Functions: leads, contact, reviews, locations
supabase/migrations/     SQL schema + RLS;  supabase/seed.sql optional starter rows
public/brand/            artwork (hero, mobile hero, watermark, logo, monogram, favicon, social, paper)
public/_headers          security + cache headers
```

## Feature flags (`src/data/siteConfig.ts`)

`reviewsEnabled` (default off) · `ecommerceEnabled` · `recipesEnabled` · `locatorEnabled` · `illinoisLaunchEnabled` · `newsletterEnabled`. Change a value and redeploy. Server functions honor the same flags.

## Replacing the artwork

The shipped watercolor art is a generated placeholder. Overwrite files in `public/brand/` keeping the filenames (and update `width`/`height` in `brandAssets.ts` if dimensions change). Recommended sizes: `hero-agave.webp` 2400×1500, `hero-agave-mobile.webp` 900×1400, `watermark-agave.webp` 1400×1400 (transparent), `texture-paper.webp` tileable 1024², `social-preview.jpg` 1200×630. Logo SVG is outlined from Cormorant Garamond; swap for the official brand logo when available.

---

## 1. Supabase setup

1. Create a project at supabase.com.
2. SQL Editor → run `supabase/migrations/20261001000000_init.sql`. (Or: `supabase link --project-ref <ref> && supabase db push`.)
3. Optional: run `supabase/seed.sql`, then edit the `locations` table with real placements (set `coming_soon = false` when live).
4. Project Settings → API: copy **Project URL**, **anon key**, **service_role key**.
5. Security model: RLS is on for every table. `leads` and `contact_requests` have **no** anon access; the website writes them server-side with the service-role key (never exposed to the browser — it is only read by `/functions`). Anon can read approved reviews and all locations.
6. Moderating reviews: Table Editor → `reviews` → set `approved = true`.
7. Exporting leads: Table Editor → `leads` → Export CSV.

## 2. Resend setup

1. Create an account at resend.com → **Domains** → add `manave.co`, add the DNS records it shows (SPF/DKIM) in Cloudflare DNS, verify.
2. Create an API key (sending access) → `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL` to e.g. `MANAVÉ <hello@manave.co>` and `NOTIFY_EMAIL` to the inbox that should receive lead/contact alerts.
4. Marketing email compliance: set `MAILING_ADDRESS` (physical address, appears in the welcome email footer) and honor "unsubscribe" replies. Emails never block form submission if Resend fails.

## 3. Cloudflare Turnstile

Cloudflare dashboard → Turnstile → Add widget → hostnames `manave.co`, `www.manave.co` (and the `*.pages.dev` preview host) → Managed. Copy the site key (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) and secret (`TURNSTILE_SECRET_KEY`).

## 4. Cloudflare Pages deployment

1. Push this repo to GitHub (`manave-web`).
2. Cloudflare → Workers & Pages → Create → **Pages** → Connect to Git → select the repo.
3. Build settings: Framework preset **None** · Build command `npm run build` · Build output directory `out` · Node version `22` (env var `NODE_VERSION=22`).
4. Environment variables (Production **and** Preview):

| Variable | Type | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Variable | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Variable | needed by Functions for public reads |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | server only |
| `RESEND_API_KEY` | **Secret** | |
| `RESEND_FROM_EMAIL` | Variable | verified sender |
| `NOTIFY_EMAIL` | Variable | |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Variable | inlined at build time → redeploy after changing |
| `TURNSTILE_SECRET_KEY` | **Secret** | |
| `NEXT_PUBLIC_SITE_URL` | Variable | `https://manave.co` (canonical/OG/sitemap) |
| `MAILING_ADDRESS` | Variable | optional |

5. Deploy. The `/functions` directory is detected automatically (routes `/api/leads`, `/api/contact`, `/api/reviews`, `/api/locations`).
6. Custom domain: Pages project → Custom domains → add `manave.co` (and `www`, redirect to apex via a Redirect Rule).
7. Recommended: Security → WAF → Rate limiting rule: `/api/*` POST, 5 requests / 10 min / IP, action Block.
8. Direct deploy alternative: `npx wrangler login && npm run deploy`.

## 5. Pre-launch checklist

- [ ] Replace placeholder artwork and logo with final brand art.
- [ ] Legal review of `/privacy`, age-gate wording, and marketing copy (alcohol advertising rules, TTB/state requirements, "NOM CRT 1649" and "since 1936" claims).
- [ ] Confirm `siteConfig.contactEmail`, social links, and real locations in Supabase.
- [ ] Verify Resend domain; submit test lead and contact forms in Preview.
- [ ] Review expression and serve copy for accuracy against final product specs.
- [ ] Submit `https://manave.co/sitemap.xml` to Google Search Console.
- [ ] Run Lighthouse + a screen-reader pass on the live URL.

## Accessibility notes

Skip link, semantic landmarks, labelled form fields with inline errors (`aria-describedby`, `role="alert"`), focus-visible outlines, modal age gate with focus trap, keyboard-operable mobile nav, `prefers-reduced-motion` disables parallax/fades/texture drift, and text colour pairs are ≥ 4.5:1 (gold is decorative only). Run an audit on the live site before launch.
