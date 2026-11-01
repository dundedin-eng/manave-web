import { discoverySources, inquiryTypes, expressionNames } from "@/data/content";

export type FieldErrors = Record<string, string>;
type Result<T> = { ok: true; data: T } | { ok: false; errors: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}

export type LeadInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  discovery_source: string;
};

export function validateLead(body: Record<string, unknown>): Result<LeadInput> {
  const errors: FieldErrors = {};
  const first_name = str(body.first_name, 80);
  const last_name = str(body.last_name, 80);
  const email = str(body.email, 254).toLowerCase();
  const phoneRaw = str(body.phone, 30);
  const discovery_source = str(body.discovery_source, 40);

  if (!first_name) errors.first_name = "Please enter your first name.";
  if (!last_name) errors.last_name = "Please enter your last name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  let phone: string | null = null;
  if (phoneRaw) {
    const p = normalizePhone(phoneRaw);
    if (p.replace(/\D/g, "").length < 7 || p.replace(/\D/g, "").length > 15) errors.phone = "Please enter a valid mobile number.";
    else phone = p;
  }
  if (!(discovery_source && (discoverySources as readonly string[]).includes(discovery_source)))
    errors.discovery_source = "Please tell us how you heard about MANAVÉ.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data: { first_name, last_name, email, phone, discovery_source } };
}

export type ContactInput = { name: string; email: string; company: string | null; inquiry_type: string; message: string };

export function validateContact(body: Record<string, unknown>): Result<ContactInput> {
  const errors: FieldErrors = {};
  const name = str(body.name, 120);
  const email = str(body.email, 254).toLowerCase();
  const company = str(body.company, 160);
  const inquiry_type = str(body.inquiry_type, 40);
  const message = str(body.message, 4000);
  if (!name) errors.name = "Please enter your name.";
  if (!EMAIL.test(email)) errors.email = "Please enter a valid email address.";
  if (!(inquiryTypes as readonly string[]).includes(inquiry_type)) errors.inquiry_type = "Please choose an inquiry type.";
  if (message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, data: { name, email, company: company || null, inquiry_type, message } };
}

export type ReviewInput = { name: string; location: string | null; expression: string; rating: number; review: string };

export function validateReview(body: Record<string, unknown>): Result<ReviewInput> {
  const errors: FieldErrors = {};
  const name = str(body.name, 80);
  const location = str(body.location, 80);
  const expression = str(body.expression, 40);
  const rating = Number(body.rating);
  const review = str(body.review, 2000);
  if (!name) errors.name = "Please enter your name.";
  if (!expressionNames.includes(expression)) errors.expression = "Please choose an expression.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Please choose a rating from 1 to 5.";
  if (review.length < 10) errors.review = "Please share a little more (at least 10 characters).";
  return Object.keys(errors).length
    ? { ok: false, errors }
    : { ok: true, data: { name, location: location || null, expression, rating, review } };
}
