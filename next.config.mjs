/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: deploys natively to Cloudflare Pages with no adapter.
  // Server logic (forms, reviews, locations) lives in /functions (Pages Functions).
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true }, // artwork is pre-optimised WebP in /public/brand
  reactStrictMode: true,
  poweredByHeader: false,
};
export default nextConfig;
