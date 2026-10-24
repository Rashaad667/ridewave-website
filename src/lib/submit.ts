/**
 * Sends an enquiry from the browser to a public form endpoint such as
 * Formspree or Getform (set NEXT_PUBLIC_ENQUIRY_ENDPOINT). These services are
 * designed to be called from the browser, so no secret is involved.
 * Success is reported only when the endpoint responds with a 2xx status.
 */

import { formatEnquiryMessage, type EnquiryInput } from "@/lib/enquiry";

export type SubmitResult = { ok: true } | { ok: false; message: string };

const MIN_FILL_TIME_MS = 3_000;

export async function submitEnquiry(
  endpoint: string,
  enquiry: EnquiryInput,
  meta: { startedAt: number; website: string },
): Promise<SubmitResult> {
  // Spam checks: hidden honeypot field and a minimum time to fill the form.
  if (meta.website !== "") return { ok: false, message: "Sorry, your enquiry could not be sent." };
  if (Date.now() - meta.startedAt < MIN_FILL_TIME_MS) {
    return { ok: false, message: "Please take a moment to check your details, then send again." };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...enquiry,
        _subject: "New RideWave rental enquiry",
        message: formatEnquiryMessage(enquiry),
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      return { ok: false, message: "Sorry, your enquiry could not be sent. Please try again in a moment." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "We couldn't reach the server. Please check your connection and try again." };
  }
}
