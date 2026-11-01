import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { serves } from "@/data/content";

export default function ServesPreview() {
  return (
    <section aria-labelledby="serves-title" className="border-y border-sage/30 bg-parchment-deep/70">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading eyebrow="Signature Serves" title={<span id="serves-title">Made for the table</span>} intro="Four ways to bring everyone together — each built around a MANAVÉ expression." />
        </Reveal>
        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {serves.map((s, i) => (
            <li key={s.name}>
              <Reveal delay={(i % 2) * 140} className="h-full">
                <article className="h-full border border-sage/50 bg-parchment/70 p-8">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-deep-sage">{s.expression}</p>
                  <h3 className="mt-2 text-3xl sm:text-4xl">{s.name}</h3>
                  <p className="mt-3 text-ink-soft">{s.blurb}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <ButtonLink href="/signature-serves" variant="secondary">See Signature Serves</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
