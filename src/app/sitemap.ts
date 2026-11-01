import type { MetadataRoute } from "next";
import { siteConfig, flags } from "@/data/siteConfig";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/our-story",
    "/expressions",
    "/signature-serves",
    "/where-to-experience",
    ...(flags.reviewsEnabled ? ["/reviews"] : []),
    "/contact",
    "/privacy",
  ];
  const now = new Date();
  return paths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p === "/privacy" ? 0.2 : 0.7,
  }));
}
