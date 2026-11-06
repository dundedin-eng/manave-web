"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brandAssets } from "@/data/brandAssets";
import { nav } from "@/data/siteConfig";

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-sage/40 bg-parchment/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" aria-label="MANAVÉ — home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandAssets.logo.src} alt="MANAVÉ" width={brandAssets.logo.width} height={brandAssets.logo.height} className="h-11 w-auto" />
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={path === n.href ? "page" : undefined}
                  className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-charcoal underline-offset-8 transition-colors hover:text-agave aria-[current=page]:underline aria-[current=page]:decoration-gold aria-[current=page]:decoration-2"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center text-deep-sage lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            {open ? <path d="M5 5l16 16M21 5L5 21" /> : <path d="M3 8h20M3 13h20M3 18h20" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-sage/40 bg-parchment lg:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-4 sm:px-8">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-sage/30 last:border-0">
                <Link href={n.href} aria-current={path === n.href ? "page" : undefined} className="block py-4 font-display text-2xl text-deep-sage">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
