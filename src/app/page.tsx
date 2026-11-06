import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Meaning from "@/components/home/Meaning";
import Craftsmanship from "@/components/home/Craftsmanship";
import FlavorWithoutCompromise from "@/components/FlavorWithoutCompromise";
import ExpressionCards from "@/components/ExpressionCards";
import ServesPreview from "@/components/home/ServesPreview";
import Experience from "@/components/home/Experience";
import StayConnected from "@/components/StayConnected";
import ReviewsSection from "@/components/home/ReviewsSection";
import ContactBlock from "@/components/home/ContactBlock";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "MANAVÉ | Premium Tequila from Los Altos de Jalisco",
  description:
    "MANAVÉ is premium craft tequila from Los Altos de Jalisco, made in El Arenal. Discover our Blanco and three premium flavored tequila expressions at 40% ABV — never a liqueur.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Meaning />
      <Craftsmanship />
      <FlavorWithoutCompromise />
      <section aria-labelledby="expressions-title">
        <Container className="py-24 sm:py-32">
          <Reveal>
            <SectionHeading center eyebrow="The Expressions" title={<span id="expressions-title">Four expressions. One foundation.</span>} intro="Start with Blanco. Then discover how far authentic tequila can go." />
          </Reveal>
          <div className="mt-14"><ExpressionCards /></div>
          <div className="mt-12 text-center"><ButtonLink href="/expressions" variant="secondary">Explore the Expressions</ButtonLink></div>
        </Container>
      </section>
      <ServesPreview />
      <Experience />
      <StayConnected />
      <ReviewsSection />
      <ContactBlock />
    </>
  );
}
