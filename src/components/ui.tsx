import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>;
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`} aria-hidden="true">
      <i />
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`text-[0.78rem] font-medium uppercase tracking-[0.28em] ${light ? "text-parchment" : "text-deep-sage"}`}>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <Tag
        className={`mt-4 text-4xl sm:text-5xl lg:text-[3.4rem] ${light ? "!text-parchment" : ""}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? "text-parchment/90" : "text-ink-soft"}`}>{intro}</p>
      )}
    </div>
  );
}

type Variant = "primary" | "secondary" | "light";
const styles: Record<Variant, string> = {
  primary: "bg-deep-sage text-parchment hover:bg-agave border border-deep-sage hover:border-agave",
  secondary: "bg-transparent text-deep-sage border border-deep-sage hover:bg-deep-sage hover:text-parchment",
  light: "bg-parchment text-deep-sage border border-parchment hover:bg-transparent hover:text-parchment",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center px-8 py-3 text-[0.82rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export const buttonClass = (variant: Variant = "primary") =>
  `inline-flex min-h-12 items-center justify-center px-8 py-3 text-[0.82rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed ${styles[variant]}`;

/**
 * Hand-washed watercolor blob (pure SVG turbulence) — used instead of bottle renders.
 * `id` must be unique per instance.
 */
export function Wash({ id, color, className = "" }: { id: string; color: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <defs>
        <filter id={`w-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="4" seed={id.length * 7} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="46" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="1.4" />
        </filter>
        <radialGradient id={`g-${id}`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor={color} stopOpacity=".18" />
          <stop offset="70%" stopColor={color} stopOpacity=".42" />
          <stop offset="100%" stopColor={color} stopOpacity=".7" />
        </radialGradient>
      </defs>
      <g filter={`url(#w-${id})`}>
        <circle cx="200" cy="200" r="150" fill={`url(#g-${id})`} />
        <circle cx="215" cy="190" r="110" fill={color} opacity=".12" />
      </g>
    </svg>
  );
}
