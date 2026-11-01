# Stack & Approach Evaluation

Verdicts on the requested stack, and the one deliberate deviation made while building.

| Layer | Verdict | Notes |
|---|---|---|
| Next.js 15 + React 19 + TypeScript | **Keep** | Mature, strong metadata/SEO API (`metadata`, `sitemap`, `robots`). Next 16 exists; 15.5 is on a supported line — upgrade is a version bump later. |
| Tailwind CSS v4 | **Keep** | CSS-first `@theme` tokens map 1:1 to the brand palette. |
| App Router | **Keep** | Used purely for static pages + metadata. |
| Cloudflare Pages | **Keep, with one change** | See below. |
| Supabase | **Keep** | Postgres + RLS suits leads/contacts/reviews/locations. All writes go through server-side functions; anon key can read only approved reviews and locations. |
| Resend | **Keep** | Called via plain `fetch`. Needs a verified domain for deliverability. |
| Turnstile | **Keep** | Verified server-side; fails closed if the secret is missing. |

## Deliberate deviation: static export + Pages Functions (no Next adapter)

Running Next.js server features on Cloudflare Pages requires an adapter (`@cloudflare/next-on-pages` or OpenNext), which adds build complexity and version coupling to Next releases. This site has no pages that need per-request rendering, so:

* Pages are **statically exported** (`output: "export"`) and served from Cloudflare's edge — fastest and cheapest option.
* Form handling, reviews, and locations are **Pages Functions** in `/functions/api/*` (native Cloudflare, no adapter).
* Trade-off: `next dev` does not run the functions. Use `npm run preview` (wrangler) to test forms locally.

If you later need SSR/ISR (e.g., e-commerce with live inventory), move to OpenNext on Cloudflare Workers; the components, data files, and SQL carry over unchanged.

## Other decisions

* **Fonts self-hosted** via Fontsource (no build-time Google dependency, better privacy/performance).
* **Artwork** lives only in `public/brand/` and is addressed through `src/data/brandAssets.ts`. The shipped images are procedural placeholders (`npm run assets`) — replace with commissioned watercolors by overwriting files.
* **CSP** requires `'unsafe-inline'` for scripts because Next injects inline bootstrap scripts into static HTML. Acceptable here (no user-generated HTML is rendered); tighten with hashes if desired.
* **Reviews** are off by default (`flags.reviewsEnabled=false`); submissions are stored unapproved.
