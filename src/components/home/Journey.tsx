import { Container, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";

const stops = [
  { place: "Los Altos de Jalisco", label: "Where the agave is cultivated", body: "The highlands of Jalisco — red clay soil, cool nights, and generations of agave knowledge." },
  { place: "El Arenal, Jalisco", label: "Where it is crafted, bottled, and packaged", body: "Every MANAVÉ expression is crafted, bottled, and packaged in El Arenal — start to finish, in Jalisco." },
  { place: "MANAVÉ", label: "Where it reaches you", body: "Premium tequila, made to be shared with the people who matter most." },
];

export default function Journey() {
  return (
    <section id="crafted-across-jalisco" aria-labelledby="journey-title" className="scroll-mt-20">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading center eyebrow="Provenance" title={<span id="journey-title">Crafted Across Jalisco</span>} intro="From the highlands to the bottle, MANAVÉ stays rooted in Jalisco." />
        </Reveal>
        <ol className="mt-16 grid gap-0 md:grid-cols-3">
          {stops.map((s, i) => (
            <li key={s.place} className="relative flex flex-col items-center px-6 pb-14 text-center md:pb-0">
              <Reveal delay={i * 180} className="flex flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold font-display text-xl text-deep-sage" aria-hidden="true">{i + 1}</span>
                <h3 className="mt-5 text-3xl sm:text-4xl">{s.place}</h3>
                <p className="accent mt-2 text-xl text-agave">{s.label}</p>
                <p className="mt-4 max-w-xs text-[0.98rem] text-ink-soft">{s.body}</p>
              </Reveal>
              {i < stops.length - 1 && (
                <span aria-hidden="true" className="absolute bottom-3 left-1/2 -translate-x-1/2 text-2xl text-gold md:bottom-auto md:left-auto md:right-0 md:top-3 md:translate-x-1/2 md:-rotate-90">↓</span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
