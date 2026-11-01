import { Container, SectionHeading } from "@/components/ui";
import LeadForm from "@/components/forms/LeadForm";
import Reveal from "@/components/Reveal";
import { flags } from "@/data/siteConfig";

export default function StayConnected() {
  if (!flags.newsletterEnabled) return null;
  return (
    <section id="stay-connected" aria-labelledby="stay-title" className="scroll-mt-24 border-y border-sage/30 bg-parchment-deep/70">
      <Container className="grid gap-12 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow="Stay Connected"
            title={<span id="stay-title">Be first to the table.</span>}
            intro={
              <>
                Tastings, Illinois launch news, and where to find MANAVÉ — delivered sparingly.
                <span className="accent mt-5 block text-2xl text-agave">Reuniendo a Familiares y Amigos</span>
              </>
            }
          />
        </Reveal>
        <Reveal delay={150}>
          <LeadForm idPrefix="home" />
        </Reveal>
      </Container>
    </section>
  );
}
