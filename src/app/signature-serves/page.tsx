import PageHero from "@/components/PageHero";
import StayConnected from "@/components/StayConnected";
import { Container } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { serves } from "@/data/content";
import { flags } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Signature Serves — Tequila Cocktails to Share",
  description:
    "Blanco Ranch Water, Coffee Espresso Martini, Passion Fruit Sunset, and the Piña Colada Signature Serve — cocktails built for premium flavored tequila.",
  path: "/signature-serves",
});

export default function SignatureServes() {
  return (
    <>
      <PageHero eyebrow="Signature Serves" title="Made for the table" intro="Simple, generous serves for gathering family and friends." />
      <Container className="py-20 sm:py-24">
        <ul className="grid gap-8 lg:grid-cols-2">
          {serves.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={(i % 2) * 140} className="h-full">
                <article className="h-full border border-sage/50 bg-[#FBF8F1]/80 p-8 sm:p-10">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-deep-sage">{s.expression}</p>
                  <h2 className="mt-2 text-3xl sm:text-4xl">{s.name}</h2>
                  <p className="accent mt-2 text-xl text-agave">{s.blurb}</p>
                  {flags.recipesEnabled && (
                    <>
                      <h3 className="mt-6 text-xl">Ingredients</h3>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-ink-soft marker:text-gold">
                        {s.ingredients.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                      <h3 className="mt-6 text-xl">Method</h3>
                      <p className="mt-2 text-ink-soft">{s.method}</p>
                    </>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-sm text-ink-soft">Please enjoy responsibly. Must be 21 or older.</p>
      </Container>
      <StayConnected />
    </>
  );
}
