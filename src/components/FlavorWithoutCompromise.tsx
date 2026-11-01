import { Container, Eyebrow } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { brandAssets } from "@/data/brandAssets";

export default function FlavorWithoutCompromise() {
  return (
    <section aria-labelledby="fwc-title" className="on-dark relative overflow-hidden bg-deep-sage text-parchment">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={brandAssets.watermark.src} alt="" aria-hidden="true" width={800} height={800} className="pointer-events-none absolute -left-32 bottom-[-12rem] w-[48rem] max-w-none opacity-[.12] invert" />
      <Container className="relative py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow light>Our Promise</Eyebrow>
          <h2 id="fwc-title" className="mt-4 !text-parchment text-5xl sm:text-6xl lg:text-7xl uppercase tracking-[0.04em]">
            Flavor Without Compromise
          </h2>
          <p className="accent mt-6 text-2xl text-parchment">Never a tequila liqueur.</p>
        </Reveal>
        <Reveal delay={150}>
          <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-px border border-gold/70 bg-gold/70 sm:grid-cols-3">
            {[
              ["40%", "ABV"],
              ["80", "Proof"],
              ["100%", "Tequila foundation"],
            ].map(([n, l]) => (
              <div key={l} className="bg-deep-sage px-6 py-8 text-center">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-5xl text-parchment sm:text-6xl">{n}</dd>
                <p aria-hidden="true" className="mt-2 text-xs font-medium uppercase tracking-[0.24em] text-parchment/90">{l}</p>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={250} className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-parchment/95">
            Every MANAVÉ flavored expression is crafted from the same tequila foundation as our Blanco — the same agave,
            the same craft, the same 40% ABV. Coffee, Passion Fruit, and Piña Colada aren&rsquo;t sweet liqueurs with a
            splash of tequila. They are tequila, made to taste extraordinary.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
