"use client";
import { useEffect, useRef, useState } from "react";
import { brandAssets } from "@/data/brandAssets";
import { buttonClass } from "@/components/ui";

type State = "pending" | "yes" | "no";
const KEY = "manave.age";

/**
 * 21+ gate. The pre-paint script in layout.tsx sets <html data-age="yes"> for returning
 * visitors so the gate never flashes. "Yes" persists 30 days; "No" persists 24 hours.
 */
export default function AgeGate() {
  const [state, setState] = useState<State>("pending");
  const dialog = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const v = document.documentElement.dataset.age;
    setState(v === "yes" ? "yes" : v === "no" ? "no" : "pending");
  }, []);

  // Lock the page behind the dialog while it is open.
  useEffect(() => {
    const root = document.getElementById("site-root");
    const open = state !== "yes";
    if (root) {
      if (open) root.setAttribute("inert", "");
      else root.removeAttribute("inert");
    }
    document.body.style.overflow = open ? "hidden" : "";
    if (open) first.current?.focus();
    return () => {
      document.body.style.overflow = "";
      root?.removeAttribute("inert");
    };
  }, [state]);

  const answer = (a: "yes" | "no") => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ a, t: Date.now() }));
    } catch {}
    document.documentElement.dataset.age = a;
    setState(a);
    if (a === "yes") document.getElementById("main")?.focus({ preventScroll: true });
  };

  // Keep Tab inside the dialog.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const f = dialog.current?.querySelectorAll<HTMLElement>("a[href],button");
    if (!f || !f.length) return;
    const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  };

  return (
    <div className="age-gate fixed inset-0 z-[100] flex items-center justify-center bg-parchment p-6" onKeyDown={onKeyDown}>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${brandAssets.watermark.src})`, backgroundSize: "min(900px, 120vw)", backgroundRepeat: "no-repeat", backgroundPosition: "center bottom" }}
        aria-hidden="true"
      />
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-title"
        aria-describedby="age-desc"
        className="relative w-full max-w-lg border border-gold/70 bg-parchment/95 px-8 py-12 text-center shadow-[0_30px_80px_-40px_rgba(47,47,47,.45)] sm:px-14"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brandAssets.logo.src} alt="MANAVÉ" width={brandAssets.logo.width} height={brandAssets.logo.height} className="mx-auto h-[75px] w-auto" />
        {state !== "no" ? (
          <>
            <h2 id="age-title" className="mt-9 text-3xl sm:text-4xl">Are you 21 years of age or older?</h2>
            <p id="age-desc" className="mt-4 text-sm text-ink-soft">You must be of legal drinking age to enter this site.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button ref={first} type="button" onClick={() => answer("yes")} className={buttonClass("primary")}>Yes</button>
              <button type="button" onClick={() => answer("no")} className={buttonClass("secondary")}>No</button>
            </div>
          </>
        ) : (
          <>
            <h2 id="age-title" className="mt-9 text-3xl sm:text-4xl">We&rsquo;ll see you in a few years.</h2>
            <p id="age-desc" className="mt-4 text-ink-soft">
              MANAVÉ is intended for adults of legal drinking age. Learn more about responsible choices at{" "}
              <a className="underline underline-offset-4" href="https://www.responsibility.org" rel="noopener noreferrer">responsibility.org</a>.
            </p>
          </>
        )}
        <p className="mt-9 text-xs text-ink-soft">Please enjoy MANAVÉ responsibly.</p>
      </div>
    </div>
  );
}
