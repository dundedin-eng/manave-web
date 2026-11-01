"use client";
import { useState } from "react";
import { inquiryTypes } from "@/data/content";
import { buttonClass } from "@/components/ui";
import { Field, inputClass, describedBy } from "./Field";
import Turnstile from "./Turnstile";
import { useSubmit } from "./useSubmit";

export default function ContactForm() {
  const { status, errors, message, submit, resetKey } = useSubmit("/api/contact");
  const [token, setToken] = useState("");

  if (status === "success") {
    return (
      <div role="status" className="border border-gold/70 bg-[#FBF8F1] p-8 text-center">
        <p className="font-display text-3xl text-deep-sage">Message received.</p>
        <p className="mt-3 text-ink-soft">Thank you for reaching out. We&rsquo;ll reply soon.</p>
      </div>
    );
  }
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
        <Field id="c-name" label="Name" required error={errors.name}>
          <input id="c-name" name="name" autoComplete="name" required className={inputClass} aria-invalid={!!errors.name} aria-describedby={describedBy("c-name", errors.name)} />
        </Field>
        <Field id="c-email" label="Email" required error={errors.email}>
          <input id="c-email" name="email" type="email" autoComplete="email" required className={inputClass} aria-invalid={!!errors.email} aria-describedby={describedBy("c-email", errors.email)} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-company" label="Company" optional error={errors.company}>
          <input id="c-company" name="company" autoComplete="organization" className={inputClass} />
        </Field>
        <Field id="c-type" label="Inquiry type" required error={errors.inquiry_type}>
          <select id="c-type" name="inquiry_type" required defaultValue="" className={inputClass} aria-invalid={!!errors.inquiry_type} aria-describedby={describedBy("c-type", errors.inquiry_type)}>
            <option value="" disabled>Select one…</option>
            {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
      </div>
      <Field id="c-msg" label="Message" required error={errors.message}>
        <textarea id="c-msg" name="message" rows={6} required className={inputClass} aria-invalid={!!errors.message} aria-describedby={describedBy("c-msg", errors.message)} />
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <Turnstile onToken={setToken} resetKey={resetKey} />
      {status === "error" && <p role="alert" className="text-sm font-medium text-[#8A2D1F]">{message}</p>}
      <button type="submit" disabled={status === "sending" || !token} className={buttonClass("primary")}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
