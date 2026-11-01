import PageHero from "@/components/PageHero";
import Experience from "@/components/home/Experience";
import LocationsClient from "@/components/LocationsClient";
import StayConnected from "@/components/StayConnected";
import { Container, SectionHeading } from "@/components/ui";
import { flags } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Where to Experience MANAVÉ — Chicago, Illinois, Resorts & Duty-Free",
  description:
    "Find MANAVÉ premium tequila across the Chicago area and Illinois retail, at resorts and duty-free, and in Cabo and Cancún.",
  path: "/where-to-experience",
});

export default function Where() {
  return (
    <>
      <PageHero eyebrow="Where to Experience" title="Find MANAVÉ" intro="From Chicago tastings to resort poolsides and travel retail." />
      {flags.illinoisLaunchEnabled && (
        <section aria-labelledby="il-title" className="border-b border-sage/30 bg-deep-sage on-dark text-parchment">
          <Container className="py-12 text-center">
            <h2 id="il-title" className="!text-parchment text-3xl sm:text-4xl">Illinois launch</h2>
            <p className="mx-auto mt-3 max-w-2xl text-parchment/95">
              We&rsquo;re bringing MANAVÉ home to the Chicago area first. Join the list and we&rsquo;ll tell you the moment it reaches your neighborhood.
            </p>
          </Container>
        </section>
      )}
      <Experience showCta={false} />
      {flags.locatorEnabled && (
        <section aria-labelledby="loc-title" className="border-t border-sage/30">
          <Container className="py-20">
            <SectionHeading eyebrow="Locator" title={<span id="loc-title">Locations</span>} />
            <div className="mt-10"><LocationsClient /></div>
          </Container>
        </section>
      )}
      <StayConnected />
    </>
  );
}
