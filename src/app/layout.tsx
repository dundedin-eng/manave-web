import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import AgeGate from "@/components/AgeGate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/siteConfig";
import { brandAssets } from "@/data/brandAssets";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "MANAVÉ | Premium Tequila from Los Altos de Jalisco",
    template: "%s | MANAVÉ",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "premium tequila",
    "Los Altos Jalisco tequila",
    "El Arenal tequila",
    "craft tequila",
    "premium flavored tequila",
    "MANAVÉ",
  ],
  icons: { icon: [{ url: brandAssets.favicon.src, type: "image/svg+xml" }], apple: brandAssets.monogram.src },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#F6F0E5", width: "device-width", initialScale: 1 };

// Runs before first paint: marks JS-enabled + restores age-gate decision (no flash for returning visitors).
const preScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var v=JSON.parse(localStorage.getItem('manave.age')||'null');if(v){var age=Date.now()-v.t;if(v.a==='yes'&&age<2592e6)d.dataset.age='yes';else if(v.a==='no'&&age<864e5)d.dataset.age='no';}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preScript }} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.fullName,
            url: siteConfig.url,
            logo: `${siteConfig.url}${brandAssets.logo.src}`,
            slogan: siteConfig.tagline,
            description: siteConfig.description,
            brand: { "@type": "Brand", name: siteConfig.name },
          }}
        />
      </head>
      <body style={{ ["--texture-paper" as string]: `url(${brandAssets.texturePaper.src})` }}>
        <div className="paper-overlay" aria-hidden="true" />
        <AgeGate />
        <div id="site-root" className="relative z-10">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-deep-sage focus:px-5 focus:py-3 focus:text-parchment"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
