"use server";

import { headers } from "next/headers";
import { formatEnquiryMessage, sanitizeEnquiry, todayIso, validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";

export type SubmitResult = { ok: true } | { ok: false; message: string; errors?: EnquiryErrors };

const MIN_FILL_TIME_MS = 3_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };

// Best-effort, per-instance rate limit. Serverless platforms run many
// instances, so add a platform firewall / shared store for real protection
// (see README › "Production hardening").
const recent = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5_000) recent.clear();
  return hits.length > RATE_LIMIT.max;
}

function yesterdayIso(): string {
  // Allow one day of slack so visitors in other time zones are not rejected.
  return todayIso(new Date(Date.now() - 24 * 60 * 60_000));
}

/**
 * Sends an enquiry to the webhook configured in ENQUIRY_WEBHOOK_URL
 * (for example a Make, Zapier, Formspree or custom endpoint that emails
 * or stores the enquiry). Success is reported only when the webhook
 * responds with a 2xx status.
 */
export async function submitEnquiry(
  raw: Record<string, unknown>,
  meta: { startedAt: number; website: string },
): Promise<SubmitResult> {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (!webhookUrl || !webhookUrl.startsWith("https://")) {
    return {
      ok: false,
      message: "Online enquiries are not connected yet. Please contact RideWave Rentals directly.",
    };
  }

  const generic = "Sorry, your enquiry could not be sent. Please try again in a moment.";

  // Spam checks: hidden honeypot field and a minimum time to fill the form.
  if (typeof meta?.website !== "string" || meta.website !== "") return { ok: false, message: generic };
  if (typeof meta.startedAt !== "number" || Date.now() - meta.startedAt < MIN_FILL_TIME_MS) {
    return { ok: false, message: "Please take a moment to check your details, then send again." };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { ok: false, message: "Too many enquiries were sent from this connection. Please try again later." };
  }

  const enquiry = sanitizeEnquiry(raw ?? {});
  const errors = validateEnquiry(enquiry, yesterdayIso());
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please correct the highlighted fields.", errors };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        source: "ridewave-website",
        submittedAt: new Date().toISOString(),
        enquiry,
        message: formatEnquiryMessage(enquiry),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`Enquiry webhook responded with ${response.status}`);
      return { ok: false, message: generic };
    }
    return { ok: true };
  } catch (error) {
    console.error("Enquiry webhook request failed", error);
    return { ok: false, message: generic };
  }
}
