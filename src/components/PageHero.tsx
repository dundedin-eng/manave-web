import { Container, SectionHeading } from "@/components/ui";
import { brandAssets } from "@/data/brandAssets";
import Parallax from "@/components/Parallax";
import type { ReactNode } from "react";

/** Interior-page header with a soft watercolor watermark. */
export default function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-sage/30">
      <div className="pointer-events-none absolute -right-24 -top-10 w-[34rem] max-w-[90vw] opacity-[.22] sm:opacity-30" aria-hidden="true">
        <Parallax speed={0.06}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandAssets.watermark.src} alt="" width={brandAssets.watermark.width} height={brandAssets.watermark.height} className="h-auto w-full" />
        </Parallax>
      </div>
      <Container className="relative py-20 sm:py-28">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} />
      </Container>
    </section>
  );
}
