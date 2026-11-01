/**
 * Centralised brand artwork configuration.
 *
 * Every image the site uses is declared here. To swap artwork, either
 *   1) overwrite the file in /public/brand/ using the same filename, or
 *   2) change the `src` below (local path or absolute URL).
 * No component code needs to change. Keep `width`/`height` in sync with the
 * real pixel size so the layout doesn't shift.
 */
export type BrandAsset = {
  src: string;
  width: number;
  height: number;
  /** Decorative artwork uses an empty alt so screen readers skip it. */
  alt: string;
};

const BASE = "/brand";

export const brandAssets = {
  heroDesktop: { src: `${BASE}/hero-agave.webp`, width: 2400, height: 1500, alt: "" },
  heroMobile: { src: `${BASE}/hero-agave-mobile.webp`, width: 900, height: 1400, alt: "" },
  watermark: { src: `${BASE}/watermark-agave.webp`, width: 1400, height: 1400, alt: "" },
  texturePaper: { src: `${BASE}/texture-paper.webp`, width: 1024, height: 1024, alt: "" },
  logo: { src: `${BASE}/logo.svg`, width: 360, height: 168, alt: "MANAVÉ by Arroyo Seco" },
  monogram: { src: `${BASE}/monogram.svg`, width: 120, height: 120, alt: "MANAVÉ monogram" },
  favicon: { src: `${BASE}/favicon.svg`, width: 64, height: 64, alt: "" },
  socialPreview: {
    src: `${BASE}/social-preview.jpg`,
    width: 1200,
    height: 630,
    alt: "MANAVÉ by Arroyo Seco — watercolor agave",
  },
} as const satisfies Record<string, BrandAsset>;

export type BrandAssetKey = keyof typeof brandAssets;
