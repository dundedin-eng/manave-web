import { expressions } from "@/data/content";
import { Wash } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { flags, siteConfig } from "@/data/siteConfig";
import Link from "next/link";

export default function ExpressionCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {expressions.map((e, i) => (
        <li key={e.slug}>
          <Reveal delay={i * 120} className="h-full">
            <article className="group flex h-full flex-col border border-sage/50 bg-[#FBF8F1]/80 p-7 text-center transition-colors duration-700 hover:border-gold">
              <div className="relative mx-auto aspect-square w-full max-w-[220px]">
                <Wash id={e.slug} color={e.accent} className="absolute inset-0 h-full w-full" />
                <span className="accent absolute inset-0 flex items-center justify-center px-2 text-3xl leading-tight text-deep-sage">
                  {e.name}
                </span>
              </div>
              <h3 className="mt-6 text-3xl">{e.name}</h3>
              <p className="accent mt-1 text-xl text-agave">{e.line}</p>
              <p className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">{e.description}</p>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-deep-sage">40% ABV · 80 Proof</p>
              {detailed && (
                <Link
                  href={flags.ecommerceEnabled ? siteConfig.shopUrl : "/where-to-experience"}
                  className="mt-4 text-sm font-medium text-deep-sage underline underline-offset-4 hover:text-agave"
                >
                  {flags.ecommerceEnabled ? `Shop ${e.name}` : `Find ${e.name}`}
                </Link>
              )}
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
