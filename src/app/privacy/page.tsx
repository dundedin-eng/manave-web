import PageHero from "@/components/PageHero";
import { Container } from "@/components/ui";
import { siteConfig } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How MANAVÉ collects and uses your information.", path: "/privacy" });

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <Container className="max-w-3xl space-y-6 py-16 text-ink-soft">
        <p className="border border-gold/70 bg-[#FBF8F1] p-4 text-sm">
          Template text — have counsel review and complete before launch (entity name, address, state-specific rights, data retention).
        </p>
        <h2 className="text-3xl">What we collect</h2>
        <p>When you join our list or contact us we collect your name, email, optional mobile number, how you heard about MANAVÉ, and any message you send. Reviews you submit include the name, location, and text you provide.</p>
        <h2 className="text-3xl">How we use it</h2>
        <p>We use this information to reply to you, send MANAVÉ updates you asked for, and improve the site. You can unsubscribe at any time by replying “unsubscribe” to any email or writing to <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
        <h2 className="text-3xl">Service providers</h2>
        <p>Your information is stored with Supabase, emails are sent through Resend, spam protection is provided by Cloudflare Turnstile, and the site is hosted on Cloudflare. We do not sell your personal information.</p>
        <h2 className="text-3xl">Age restriction</h2>
        <p>This site and our emails are intended only for adults of legal drinking age (21+ in the United States).</p>
        <h2 className="text-3xl">Contact</h2>
        <p>Questions or requests to access or delete your data: <a className="underline" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.</p>
      </Container>
    </>
  );
}
