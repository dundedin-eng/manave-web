import { Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

export default function Meaning({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="meaning-title" className="border-y border-sage/30 bg-parchment-deep/70">
      <Container className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${compact ? "py-20" : "py-24 sm:py-32"}`}>
        <Reveal>
          <SectionHeading
            eyebrow="The Name"
            title={<span id="meaning-title">What MANAVÉ Means</span>}
            intro="A name built from two ideas that sit at the heart of tequila: the plant, and the hands that shape it."
          />
          <p className="mt-6 max-w-xl text-ink-soft">
            <strong className="font-medium text-charcoal">Agave</strong> — the blue-green heart of every bottle, grown
            patiently in the highlands of Jalisco. <strong className="font-medium text-charcoal">Hecho a Mano</strong> —
            &ldquo;made by hand,&rdquo; a promise of care in every step. Together they become MANAVÉ: tequila made with
            the plant, and with people, at its center.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <figure aria-label="MANAVÉ is formed from Hecho a Mano and Agave" className="border border-gold/70 bg-parchment/70 px-6 py-12 text-center sm:px-12">
            <p className="font-display text-4xl text-deep-sage sm:text-5xl">
              Hecho a <span><b className="font-semibold underline decoration-gold decoration-2 underline-offset-8">Man</b>o</span>
            </p>
            <p className="font-display my-3 text-3xl text-agave" aria-hidden="true">+</p>
            <p className="font-display text-4xl text-deep-sage sm:text-5xl">
              Ag<b className="font-semibold underline decoration-gold decoration-2 underline-offset-8">ave</b>
            </p>
            <div className="ornament my-8 justify-center" aria-hidden="true"><i /></div>
            <p className="font-display text-5xl tracking-[0.14em] text-deep-sage sm:text-6xl">MANAVÉ</p>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
