import PageHero from "@/components/PageHero";
import Meaning from "@/components/home/Meaning";
import Craftsmanship from "@/components/home/Craftsmanship";
import Journey from "@/components/home/Journey";
import StayConnected from "@/components/StayConnected";
import { Container } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Story — Los Altos Jalisco Tequila, Made in El Arenal",
  description:
    "MANAVÉ is craft tequila from agave cultivated in Los Altos de Jalisco, crafted and bottled in El Arenal in partnership with Compañia Tequilera Don Cayo (NOM CRT 1649, heritage since 1936).",
  path: "/our-story",
});

export default function OurStory() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="Reuniendo a Familiares y Amigos" intro="MANAVÉ was made for the moments tequila belongs to: a long table, good company, and a pour worth remembering." />
      <section aria-labelledby="origin-title">
        <Container className="grid gap-12 py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 id="origin-title" className="text-4xl sm:text-5xl">Rooted in Jalisco</h2>
          </Reveal>
          <Reveal delay={150} className="space-y-5 text-lg text-ink-soft">
            <p>
              Our agave is cultivated in Los Altos de Jalisco — the highlands, where cool nights and red clay soil give
              the plant its character. From there, our tequila is crafted, bottled, and packaged in El Arenal, Jalisco.
            </p>
            <p>
              We believe flavored tequila should be earned, not engineered. That&rsquo;s why every MANAVÉ expression
              begins with the same tequila foundation, bottled at 40% ABV — never a tequila liqueur.
            </p>
          </Reveal>
        </Container>
      </section>
      <Journey />
      <Meaning compact />
      <Craftsmanship />
      <StayConnected />
    </>
  );
}
