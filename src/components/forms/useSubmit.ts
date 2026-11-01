"use client";
import { useState } from "react";

export type Status = "idle" | "sending" | "success" | "error";
type Payload = Record<string, unknown>;

export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [resetKey, setResetKey] = useState(0);

  async function submit(payload: Payload): Promise<boolean> {
    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (res.ok && data.ok) {
        setStatus("success");
        return true;
      }
      setErrors(data.errors ?? {});
      setMessage(data.error ?? (data.errors ? "Please check the highlighted fields." : "Something went wrong. Please try again."));
      setStatus("error");
    } catch {
      setMessage("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
    }
    setResetKey((k) => k + 1); // fresh Turnstile challenge after any failure
    return false;
  }
  return { status, errors, message, submit, resetKey };
}
