import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { ReviewList } from "@/components/ReviewsClient";
import { flags } from "@/data/siteConfig";

export default function ReviewsSection() {
  if (!flags.reviewsEnabled) return null;
  return (
    <section aria-labelledby="reviews-title">
      <Container className="py-24 sm:py-28">
        <SectionHeading eyebrow="Reviews" title={<span id="reviews-title">In their words</span>} />
        <div className="mt-12"><ReviewList limit={3} /></div>
        <div className="mt-10"><ButtonLink href="/reviews" variant="secondary">Read all reviews</ButtonLink></div>
      </Container>
    </section>
  );
}
