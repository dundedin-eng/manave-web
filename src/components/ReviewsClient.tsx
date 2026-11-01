"use client";
import { useEffect, useState } from "react";
import { expressionNames } from "@/data/content";
import { buttonClass } from "@/components/ui";
import { Field, inputClass, describedBy } from "@/components/forms/Field";
import Turnstile from "@/components/forms/Turnstile";
import { useSubmit } from "@/components/forms/useSubmit";

type Review = { id: string; name: string; location: string | null; expression: string; rating: number; review: string; created_at: string };

function Stars({ n }: { n: number }) {
  return (
    <span role="img" aria-label={`${n} out of 5 stars`} className="text-lg tracking-widest text-deep-sage">
      {"★".repeat(n)}
      <span className="text-sage">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function ReviewList({ limit }: { limit?: number }) {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d: { reviews?: Review[] }) => alive && setReviews(d.reviews ?? []))
      .catch(() => alive && setReviews([]));
    return () => { alive = false; };
  }, []);

  if (reviews === null) return <p className="text-ink-soft" role="status">Loading reviews…</p>;
  if (!reviews.length) return <p className="text-ink-soft">Be the first to share your MANAVÉ experience.</p>;
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviews.slice(0, limit).map((r) => (
        <li key={r.id} className="border border-sage/50 bg-[#FBF8F1]/80 p-7">
          <Stars n={r.rating} />
          <blockquote className="mt-4 text-[1.02rem] leading-relaxed">“{r.review}”</blockquote>
          <p className="mt-5 text-sm text-ink-soft">
            <span className="font-medium text-charcoal">{r.name}</span>
            {r.location ? ` · ${r.location}` : ""} · {r.expression}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ReviewForm() {
  const { status, errors, message, submit, resetKey } = useSubmit("/api/reviews");
  const [token, setToken] = useState("");
  if (status === "success")
    return (
      <div role="status" className="border border-gold/70 bg-[#FBF8F1] p-8 text-center">
        <p className="font-display text-3xl text-deep-sage">Thank you.</p>
        <p className="mt-3 text-ink-soft">Your review has been received and will appear once approved.</p>
      </div>
    );
  return (
    <form noValidate className="space-y-5" onSubmit={async (e) => {
      e.preventDefault();
      await submit({ ...Object.fromEntries(new FormData(e.currentTarget).entries()), turnstileToken: token });
    }}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="r-name" label="Name" required error={errors.name}>
          <input id="r-name" name="name" autoComplete="given-name" required className={inputClass} aria-invalid={!!errors.name} aria-describedby={describedBy("r-name", errors.name)} />
        </Field>
        <Field id="r-loc" label="City / location" optional error={errors.location}>
          <input id="r-loc" name="location" className={inputClass} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="r-exp" label="Expression" required error={errors.expression}>
          <select id="r-exp" name="expression" required defaultValue="" className={inputClass} aria-invalid={!!errors.expression} aria-describedby={describedBy("r-exp", errors.expression)}>
            <option value="" disabled>Select one…</option>
            {expressionNames.map((n) => <option key={n}>{n}</option>)}
          </select>
        </Field>
        <Field id="r-rating" label="Rating" required error={errors.rating}>
          <select id="r-rating" name="rating" required defaultValue="" className={inputClass} aria-invalid={!!errors.rating} aria-describedby={describedBy("r-rating", errors.rating)}>
            <option value="" disabled>Select one…</option>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} — {"★".repeat(n)}</option>)}
          </select>
        </Field>
      </div>
      <Field id="r-review" label="Your review" required error={errors.review}>
        <textarea id="r-review" name="review" rows={5} required className={inputClass} aria-invalid={!!errors.review} aria-describedby={describedBy("r-review", errors.review)} />
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <Turnstile onToken={setToken} resetKey={resetKey} />
      {status === "error" && <p role="alert" className="text-sm font-medium text-[#8A2D1F]">{message}</p>}
      <button type="submit" disabled={status === "sending" || !token} className={buttonClass("primary")}>{status === "sending" ? "Sending…" : "Submit review"}</button>
    </form>
  );
}
