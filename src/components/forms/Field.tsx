import type { ReactNode } from "react";

const control =
  "w-full min-h-12 border border-agave bg-[#FBF8F1] px-4 py-3 text-base text-charcoal placeholder:text-ink-soft/70 focus:border-deep-sage";

export function Field({
  id, label, required, optional, error, children, hint,
}: {
  id: string; label: string; required?: boolean; optional?: boolean; error?: string; hint?: string; children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-charcoal">
        {label}
        {required && <span aria-hidden="true" className="text-deep-sage"> *</span>}
        {optional && <span className="font-normal text-ink-soft"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-soft">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-[#8A2D1F]">{error}</p>}
    </div>
  );
}

export const inputClass = control;
export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-err` : hint ? `${id}-hint` : undefined;
