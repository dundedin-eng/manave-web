import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { inquiryTypes } from "@/data/content";
import { siteConfig } from "@/data/siteConfig";

export default function ContactBlock() {
  return (
    <section aria-labelledby="contact-title" className="border-t border-sage/30 bg-parchment-deep/70">
      <Container className="grid items-center gap-10 py-20 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <SectionHeading eyebrow="Contact" title={<span id="contact-title">Let&rsquo;s talk</span>} intro="Retail, distribution, resort and hospitality, or media — we&rsquo;d love to hear from you." />
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Inquiry types">
            {inquiryTypes.map((t) => (
              <li key={t} className="border border-agave px-4 py-1.5 text-sm text-deep-sage">{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150} className="lg:text-right">
          <ButtonLink href="/contact">Contact MANAVÉ</ButtonLink>
          <p className="mt-4 text-sm text-ink-soft"><a className="underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
        </Reveal>
      </Container>
    </section>
  );
}
