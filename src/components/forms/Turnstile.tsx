"use client";
import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loader: Promise<void> | null = null;
function load(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  loader ??= new Promise<void>((res, rej) => {
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.onload = () => res();
    s.onerror = () => {
      loader = null;
      rej(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

/** Cloudflare Turnstile widget. Call `onToken('')` is fired on expiry/error. Change `resetKey` to re-challenge. */
export default function Turnstile({ onToken, resetKey = 0 }: { onToken: (t: string) => void; resetKey?: number }) {
  const el = useRef<HTMLDivElement>(null);
  const id = useRef<string | undefined>(undefined);
  const cb = useRef(onToken);
  cb.current = onToken;
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !el.current) return;
    let cancelled = false;
    load()
      .then(() => {
        if (cancelled || !el.current || !window.turnstile) return;
        id.current = window.turnstile.render(el.current, {
          sitekey: siteKey,
          theme: "light",
          callback: (t: string) => cb.current(t),
          "expired-callback": () => cb.current(""),
          "error-callback": () => cb.current(""),
        });
      })
      .catch(() => cb.current(""));
    return () => {
      cancelled = true;
      if (id.current && window.turnstile) window.turnstile.remove(id.current);
      id.current = undefined;
    };
  }, [siteKey]);

  useEffect(() => {
    if (resetKey && id.current && window.turnstile) {
      cb.current("");
      window.turnstile.reset(id.current);
    }
  }, [resetKey]);

  if (!siteKey) {
    return (
      <p className="text-sm text-ink-soft" role="note">
        {process.env.NODE_ENV === "production"
          ? "Verification is temporarily unavailable. Please try again later."
          : "Dev note: set NEXT_PUBLIC_TURNSTILE_SITE_KEY (test key 1x00000000000000000000AA)."}
      </p>
    );
  }
  return <div ref={el} className="min-h-[65px]" />;
}
