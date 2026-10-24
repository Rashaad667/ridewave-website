/**
 * Enquiry validation and formatting, shared by the browser form and the
 * server action so both apply the same rules.
 */

import { findVehicle, vehicleLabel } from "@/config/fleet";
import { NOT_SURE_CATEGORY, vehicleCategories } from "@/config/vehicles";

export type EnquiryInput = {
  fullName: string;
  phone: string;
  email: string;
  /** Slug of a specific fleet vehicle (from its details page), or "". */
  vehicle: string;
  category: string;
  makeModel: string;
  startDate: string;
  returnDate: string;
  pickup: string;
  notes: string;
};

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const MAX_LENGTH: Record<EnquiryField, number> = {
  fullName: 100,
  phone: 30,
  email: 254,
  vehicle: 60,
  category: 40,
  makeModel: 100,
  startDate: 10,
  returnDate: 10,
  pickup: 150,
  notes: 1000,
};

export const categoryOptions = [...vehicleCategories.map(({ id, name }) => ({ id, name })), NOT_SURE_CATEGORY];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS_RE = /^\+?[\d\s()-]+$/;

/** Removes control characters, collapses whitespace and limits length. */
function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  // Strip ASCII control characters (keeping newlines for multi-line fields).
  let text = value.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "");
  text = multiline ? text.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : text.replace(/\s+/g, " ");
  return text.trim().slice(0, max);
}

export function sanitizeEnquiry(raw: Record<string, unknown>): EnquiryInput {
  return {
    fullName: clean(raw.fullName, MAX_LENGTH.fullName),
    phone: clean(raw.phone, MAX_LENGTH.phone),
    email: clean(raw.email, MAX_LENGTH.email),
    // Only known fleet vehicles are kept.
    vehicle: findVehicle(clean(raw.vehicle, MAX_LENGTH.vehicle)) ? clean(raw.vehicle, MAX_LENGTH.vehicle) : "",
    category: clean(raw.category, MAX_LENGTH.category),
    makeModel: clean(raw.makeModel, MAX_LENGTH.makeModel),
    startDate: clean(raw.startDate, MAX_LENGTH.startDate),
    returnDate: clean(raw.returnDate, MAX_LENGTH.returnDate),
    pickup: clean(raw.pickup, MAX_LENGTH.pickup),
    notes: clean(raw.notes, MAX_LENGTH.notes, true),
  };
}

/** Parses YYYY-MM-DD as a calendar date; returns null for impossible dates. */
function parseDate(value: string): Date | null {
  if (!DATE_RE.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? date : null;
}

/** Today's date as YYYY-MM-DD in the visitor's (or server's) local time. */
export function todayIso(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Validates a sanitised enquiry.
 * `earliestStart` is the earliest acceptable start date (YYYY-MM-DD).
 */
export function validateEnquiry(input: EnquiryInput, earliestStart: string): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (input.fullName.length < 2) errors.fullName = "Please enter your full name.";

  const digits = input.phone.replace(/\D/g, "");
  if (!input.phone) {
    errors.phone = "Please enter a phone number so we can reach you.";
  } else if (!PHONE_CHARS_RE.test(input.phone) || digits.length < 9 || digits.length > 15) {
    errors.phone = "Please enter a valid phone number, for example 077 123 4567 or +94 77 123 4567.";
  }

  if (input.email && !EMAIL_RE.test(input.email)) {
    errors.email = "Please enter a valid email address, or leave this field empty.";
  }

  if (!categoryOptions.some((option) => option.id === input.category)) {
    errors.category = "Please choose a vehicle category.";
  }

  const start = parseDate(input.startDate);
  const earliest = parseDate(earliestStart);
  if (!input.startDate) {
    errors.startDate = "Please choose a rental start date.";
  } else if (!start) {
    errors.startDate = "Please enter a valid start date.";
  } else if (earliest && start < earliest) {
    errors.startDate = "The start date cannot be in the past.";
  }

  const end = parseDate(input.returnDate);
  if (!input.returnDate) {
    errors.returnDate = "Please choose an expected return date.";
  } else if (!end) {
    errors.returnDate = "Please enter a valid return date.";
  } else if (start && end < start) {
    errors.returnDate = "The return date cannot be earlier than the start date.";
  }

  if (input.pickup.length < 2) {
    errors.pickup = "Please tell us your pickup location or preferred area.";
  }

  return errors;
}

function formatDate(value: string): string {
  const date = parseDate(value);
  if (!date) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function categoryName(id: string): string {
  return categoryOptions.find((option) => option.id === id)?.name ?? id;
}

/** Plain-text summary used for WhatsApp messages and webhook payloads. */
export function formatEnquiryMessage(input: EnquiryInput): string {
  const vehicle = input.vehicle ? findVehicle(input.vehicle) : undefined;
  const details = [
    vehicle && `Vehicle: ${vehicleLabel(vehicle)}`,
    `Name: ${input.fullName}`,
    `Phone: ${input.phone}`,
    input.email && `Email: ${input.email}`,
    `Vehicle category: ${categoryName(input.category)}`,
    input.makeModel && `Preferred make/model: ${input.makeModel}`,
    `Start date: ${formatDate(input.startDate)}`,
    `Return date: ${formatDate(input.returnDate)}`,
    `Pickup location/area: ${input.pickup}`,
    input.notes && `Additional requirements: ${input.notes}`,
  ];
  return [
    vehicle
      ? `Hello RideWave Rentals, I would like to enquire about renting the ${vehicleLabel(vehicle)}.`
      : "Hello RideWave Rentals, I would like to enquire about a rental.",
    "",
    ...details.filter((line): line is string => Boolean(line)),
  ].join("\n");
}
