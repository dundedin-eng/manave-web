import PageHero from "@/components/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { Container } from "@/components/ui";
import { siteConfig } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Retail, Distribution, Resort & Media Inquiries",
  description: "Contact MANAVÉ for general, retail, distribution, resort, and media inquiries.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk" intro="Retail, distribution, resort, media, or just hello — tell us how we can help." />
      <Container className="grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <aside aria-label="Other ways to reach us" className="space-y-6 text-ink-soft">
          <h2 className="text-3xl">Prefer email?</h2>
          <p><a className="underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
          <p className="accent text-2xl text-agave">{siteConfig.tagline}</p>
        </aside>
      </Container>
    </>
  );
}
