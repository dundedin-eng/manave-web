import PageHero from "@/components/PageHero";
import ExpressionCards from "@/components/ExpressionCards";
import FlavorWithoutCompromise from "@/components/FlavorWithoutCompromise";
import StayConnected from "@/components/StayConnected";
import { Container, ButtonLink } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Expressions — Premium Flavored Tequila at 40% ABV",
  description:
    "Meet MANAVÉ Blanco, Coffee, Passion Fruit, and Piña Colada: premium flavored tequila, 40% ABV (80 proof), crafted from the same tequila foundation. Never a tequila liqueur.",
  path: "/expressions",
});

export default function Expressions() {
  return (
    <>
      <PageHero eyebrow="Expressions" title="Four expressions. One foundation." intro="Blanco, Coffee, Passion Fruit, and Piña Colada — each 40% ABV (80 proof), each crafted from the same tequila." />
      <Container className="py-20 sm:py-24">
        <ExpressionCards detailed />
        <div className="mt-14 text-center"><ButtonLink href="/signature-serves" variant="secondary">See how to serve them</ButtonLink></div>
      </Container>
      <FlavorWithoutCompromise />
      <StayConnected />
    </>
  );
}
