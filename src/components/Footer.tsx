import Link from "next/link";
import { brandAssets } from "@/data/brandAssets";
import { nav, siteConfig, flags } from "@/data/siteConfig";

export default function Footer() {
  return (
    <footer className="on-dark relative bg-deep-sage text-parchment">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandAssets.monogram.src} alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-full bg-parchment" />
          <p className="accent mt-6 text-2xl text-parchment">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-parchment/90">
            Premium tequila from Los Altos de Jalisco, crafted in El Arenal, Jalisco in partnership with Compañia Tequilera Don Cayo.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="!text-parchment text-xl">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="underline-offset-4 hover:underline" href="/">Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}><Link className="underline-offset-4 hover:underline" href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link className="underline-offset-4 hover:underline" href="/privacy">Privacy</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="!text-parchment text-xl">Connect</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></li>
            {flags.newsletterEnabled && <li><Link className="underline-offset-4 hover:underline" href="/#stay-connected">Stay Connected</Link></li>}
            {siteConfig.social.instagram && <li><a className="underline-offset-4 hover:underline" href={siteConfig.social.instagram} rel="noopener noreferrer">Instagram</a></li>}
            {siteConfig.social.facebook && <li><a className="underline-offset-4 hover:underline" href={siteConfig.social.facebook} rel="noopener noreferrer">Facebook</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-parchment/25">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-parchment/90 sm:px-8 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} MANAVÉ by Arroyo Seco. {siteConfig.nom}. Tequila, 40% Alc./Vol. (80 Proof).</p>
          <p>Please enjoy responsibly. Must be 21 or older.</p>
        </div>
      </div>
    </footer>
  );
}
