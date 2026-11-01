"use client";
import Link from "next/link";
import { useState } from "react";
import { discoverySources } from "@/data/content";
import { buttonClass } from "@/components/ui";
import { Field, inputClass, describedBy } from "./Field";
import Turnstile from "./Turnstile";
import { useSubmit } from "./useSubmit";

export default function LeadForm({ idPrefix = "lead" }: { idPrefix?: string }) {
  const { status, errors, message, submit, resetKey } = useSubmit("/api/leads");
  const [token, setToken] = useState("");

  if (status === "success") {
    return (
      <div role="status" className="border border-gold/70 bg-[#FBF8F1] p-8 text-center">
        <p className="font-display text-3xl text-deep-sage">Thank you.</p>
        <p className="mt-3 text-ink-soft">You&rsquo;re on the list. Watch your inbox for a welcome from MANAVÉ.</p>
      </div>
    );
  }

  const p = (n: string) => `${idPrefix}-${n}`;
  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        await submit({ ...Object.fromEntries(f.entries()), turnstileToken: token });
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={p("first")} label="First name" required error={errors.first_name}>
          <input id={p("first")} name="first_name" autoComplete="given-name" required className={inputClass} aria-invalid={!!errors.first_name} aria-describedby={describedBy(p("first"), errors.first_name)} />
        </Field>
        <Field id={p("last")} label="Last name" required error={errors.last_name}>
          <input id={p("last")} name="last_name" autoComplete="family-name" required className={inputClass} aria-invalid={!!errors.last_name} aria-describedby={describedBy(p("last"), errors.last_name)} />
        </Field>
      </div>
      <Field id={p("email")} label="Email" required error={errors.email}>
        <input id={p("email")} name="email" type="email" autoComplete="email" inputMode="email" required className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy(p("email"), errors.email)} />
      </Field>
      <Field id={p("phone")} label="Mobile number" optional error={errors.phone}>
        <input id={p("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputClass} aria-invalid={!!errors.phone} aria-describedby={describedBy(p("phone"), errors.phone)} />
      </Field>
      <Field id={p("source")} label="How did you hear about MANAVÉ?" required error={errors.discovery_source}>
        <select id={p("source")} name="discovery_source" required defaultValue="" className={inputClass} aria-invalid={!!errors.discovery_source} aria-describedby={describedBy(p("source"), errors.discovery_source)}>
          <option value="" disabled>Select one…</option>
          {discoverySources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Turnstile onToken={setToken} resetKey={resetKey} />
      {status === "error" && <p role="alert" className="text-sm font-medium text-[#8A2D1F]">{message}</p>}
      <button type="submit" disabled={status === "sending" || !token} className={buttonClass("primary")}>
        {status === "sending" ? "Sending…" : "Stay Connected"}
      </button>
      <p className="text-xs text-ink-soft">
        By signing up you agree to receive occasional MANAVÉ updates. Unsubscribe anytime. Must be 21+. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
      </p>
    </form>
  );
}
