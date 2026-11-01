import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Page not found", description: "This page could not be found.", path: "/404", noindex: true });

export default function NotFound() {
  return (
    <Container className="py-32">
      <SectionHeading as="h1" eyebrow="404" title="This path doesn’t lead to the agave." intro="The page you’re looking for has moved or never existed." />
      <div className="mt-10"><ButtonLink href="/">Return home</ButtonLink></div>
    </Container>
  );
}
