import PageHero from "@/components/PageHero";
import StayConnected from "@/components/StayConnected";
import { ReviewList, ReviewForm } from "@/components/ReviewsClient";
import { Container, SectionHeading } from "@/components/ui";
import { flags } from "@/data/siteConfig";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reviews",
  description: "What people are saying about MANAVÉ premium tequila.",
  path: "/reviews",
  noindex: !flags.reviewsEnabled,
});

export default function Reviews() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="In their words" intro={flags.reviewsEnabled ? "Honest notes from people who have shared a MANAVÉ pour." : "Reviews open with our launch. Join the list to be the first to know."} />
      {flags.reviewsEnabled ? (
        <Container className="py-20">
          <ReviewList />
          <div className="mt-20 max-w-2xl">
            <SectionHeading eyebrow="Share your experience" title="Write a review" intro="Reviews are moderated before they appear." />
            <div className="mt-8"><ReviewForm /></div>
          </div>
        </Container>
      ) : null}
      <StayConnected />
    </>
  );
}
