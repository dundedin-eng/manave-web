import { brandAssets } from "@/data/brandAssets";
import { siteConfig, flags } from "@/data/siteConfig";
import { ButtonLink } from "@/components/ui";
import Parallax from "@/components/Parallax";

export default function Hero() {
  const { heroDesktop: d, heroMobile: m } = brandAssets;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Parallax speed={0.05} className="absolute -inset-y-10 inset-x-0">
          <picture className="block h-full w-full">
            <source media="(min-width: 768px)" srcSet={d.src} width={d.width} height={d.height} />
            <img src={m.src} alt="" width={m.width} height={m.height} fetchPriority="high" className="h-full w-full object-cover object-bottom md:object-right" />
          </picture>
        </Parallax>
        {/* keeps copy legible over the artwork */}
        <div className="absolute inset-0 bg-gradient-to-b from-parchment from-62% to-transparent to-90% md:bg-gradient-to-r md:from-parchment md:from-30% md:via-parchment/80 md:to-transparent md:to-75%" />
      </div>
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl items-start px-6 pb-64 pt-16 sm:px-8 md:items-center md:pb-20 md:pt-12">
        <div className="max-w-xl">
          <h1 id="hero-title" className="text-6xl leading-none tracking-[0.14em] sm:text-7xl lg:text-8xl">
            MANAVÉ
          </h1>
          <div className="ornament mt-8" aria-hidden="true"><i /></div>
          <p className="accent mt-8 text-2xl text-charcoal sm:text-[1.7rem]">{siteConfig.tagline}</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            Premium tequila crafted through tradition, authenticity, and uncompromising quality.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#crafted-across-jalisco" variant="primary">Explore MANAVÉ</ButtonLink>
            {flags.newsletterEnabled && <ButtonLink href="#stay-connected" variant="secondary">Stay Connected</ButtonLink>}
          </div>
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.24em] text-ink-soft">
            {siteConfig.nom} · Los Altos de Jalisco
          </p>
        </div>
      </div>
    </section>
  );
}
