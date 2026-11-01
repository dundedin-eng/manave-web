import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { brandAssets } from "@/data/brandAssets";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${opts.path === "/" ? "" : opts.path}`;
  const fullTitle = opts.absoluteTitle ? opts.title : `${opts.title} | ${siteConfig.name}`;
  const img = {
    url: brandAssets.socialPreview.src,
    width: brandAssets.socialPreview.width,
    height: brandAssets.socialPreview.height,
    alt: brandAssets.socialPreview.alt,
  };
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.fullName,
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description: opts.description,
      images: [img],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: opts.description, images: [img.url] },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
