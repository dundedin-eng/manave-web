import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { markets } from "@/data/content";
import { flags } from "@/data/siteConfig";

export default function Experience({ showCta = true }: { showCta?: boolean }) {
  return (
    <section aria-labelledby="experience-title">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Where to Experience"
            title={<span id="experience-title">Where to Experience MANAVÉ</span>}
            intro={
              flags.illinoisLaunchEnabled
                ? "Our Illinois launch begins in the Chicago area, with travel-retail and resort moments to follow."
                : "From Illinois to the shores of Mexico."
            }
          />
        </Reveal>
        <ul className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m, i) => (
            <li key={m.name}>
              <Reveal delay={(i % 3) * 120} className="border-t border-gold/70 py-7">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-deep-sage">{m.kind}</p>
                <h3 className="mt-2 text-3xl">{m.name}</h3>
                <p className="mt-2 text-[0.97rem] text-ink-soft">{m.note}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        {showCta && <div className="mt-10"><ButtonLink href="/where-to-experience" variant="secondary">Find MANAVÉ</ButtonLink></div>}
      </Container>
    </section>
  );
}
