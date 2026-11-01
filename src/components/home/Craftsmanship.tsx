import { Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/siteConfig";

export default function Craftsmanship() {
  return (
    <section aria-labelledby="craft-title">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading eyebrow="Craftsmanship" title={<span id="craft-title">A craft partnership, built on shared values</span>} intro="MANAVÉ is produced with a family of tequila makers whose standards match ours — and whose heritage runs deep." />
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-14 grid overflow-hidden border border-gold/70 bg-[#FBF8F1]/80 lg:grid-cols-[1.25fr_1fr]">
            <div className="p-8 sm:p-12">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-deep-sage">In partnership with</p>
              <h3 className="mt-3 text-4xl uppercase tracking-[0.04em] sm:text-5xl">Compañia Tequilera Don Cayo</h3>
              <p className="mt-6 max-w-xl text-ink-soft">
                We chose Don Cayo because they care about tequila the way we do: patiently, honestly, and with respect for
                the agave. Together we share a commitment to quality that doesn&rsquo;t bend — from the field to the final
                bottle in El Arenal, Jalisco.
              </p>
            </div>
            <dl className="grid grid-cols-2 border-t border-gold/70 bg-deep-sage text-parchment lg:grid-cols-1 lg:border-l lg:border-t-0">
              <div className="border-r border-parchment/25 p-8 lg:border-b lg:border-r-0 lg:p-10">
                <dt className="text-xs font-medium uppercase tracking-[0.24em] text-parchment/90">Distillery registration</dt>
                <dd className="mt-2 font-display text-3xl sm:text-4xl">{siteConfig.nom}</dd>
              </div>
              <div className="p-8 lg:p-10">
                <dt className="text-xs font-medium uppercase tracking-[0.24em] text-parchment/90">Heritage</dt>
                <dd className="mt-2 font-display text-3xl sm:text-4xl">Since 1936</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
