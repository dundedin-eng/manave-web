/** Site-wide configuration and feature flags. Flip a flag, redeploy. */
// Guarded: this module is also bundled into Cloudflare Pages Functions, where `process` may not exist.
const SITE_URL_ENV = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : undefined;

export const siteConfig = {
  name: "MANAVÉ",
  fullName: "MANAVÉ by Arroyo Seco",
  tagline: "Reuniendo a Familiares y Amigos",
  description:
    "MANAVÉ is premium tequila crafted from agave cultivated in Los Altos de Jalisco, bottled in El Arenal, Jalisco. Blanco plus three authentic flavored expressions at 40% ABV.",
  url: (SITE_URL_ENV || "https://manave.co").replace(/\/$/, ""),
  locale: "en_US",
  nom: "NOM CRT 1649",
  /** Shown in footer + contact page. Replace with the real inbox. */
  contactEmail: "hello@manave.co",
  /** Used when ecommerceEnabled is true. */
  shopUrl: "/contact",
  social: {
    instagram: "",
    facebook: "",
  },
} as const;

/** Feature flags — edit values and redeploy. Also read by /functions. */
export const flags = {
  /** Public reviews list + submission form (submissions are moderated). */
  reviewsEnabled: false,
  /** Swaps "Find MANAVÉ" CTAs for "Shop" CTAs pointing at siteConfig.shopUrl. */
  ecommerceEnabled: false,
  /** Shows full serve specs (ingredients/method) on /signature-serves. */
  recipesEnabled: true,
  /** Loads live locations from Supabase instead of the static market list. */
  locatorEnabled: false,
  /** Illinois launch messaging (banner + Chicago emphasis). */
  illinoisLaunchEnabled: true,
  /** "Stay Connected" signup form + welcome email. */
  newsletterEnabled: true,
} as const;

export type FlagName = keyof typeof flags;

export const nav = [
  { href: "/our-story", label: "Our Story" },
  { href: "/expressions", label: "Expressions" },
  { href: "/signature-serves", label: "Signature Serves" },
  { href: "/where-to-experience", label: "Where to Experience" },
  ...(flags.reviewsEnabled ? [{ href: "/reviews", label: "Reviews" }] : []),
  { href: "/contact", label: "Contact" },
] as const;
