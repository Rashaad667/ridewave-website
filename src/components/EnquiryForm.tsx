"use client";

import Image from "next/image";
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore, useTransition, type ReactNode } from "react";
import { submitEnquiry } from "@/lib/submit";
import { vehicleLabel, type FleetVehicle } from "@/config/fleet";
import { whatsappHref } from "@/config/site";
import {
  MAX_LENGTH,
  categoryOptions,
  formatEnquiryMessage,
  sanitizeEnquiry,
  todayIso,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry";
import { button } from "@/lib/ui";

const EMPTY: EnquiryInput = {
  fullName: "",
  phone: "",
  email: "",
  vehicle: "",
  category: "",
  makeModel: "",
  startDate: "",
  returnDate: "",
  pickup: "",
  notes: "",
};

const noopSubscribe = () => () => {};

const FIELD_ORDER: EnquiryField[] = [
  "fullName",
  "phone",
  "email",
  "category",
  "makeModel",
  "startDate",
  "returnDate",
  "pickup",
  "notes",
];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "whatsapp"; href: string }
  | { kind: "error"; message: string }
  | { kind: "unavailable" };

type EnquiryFormProps = {
  /** Public form endpoint from NEXT_PUBLIC_ENQUIRY_ENDPOINT, or null when not configured. */
  endpoint: string | null;
  /** Vehicle from a details page; preselected and named in the enquiry. */
  vehicle?: FleetVehicle | null;
};

export function EnquiryForm({ endpoint, vehicle = null }: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryInput>(() =>
    vehicle ? { ...EMPTY, vehicle: vehicle.slug, category: vehicle.categoryId } : EMPTY,
  );
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // Empty during server rendering; the visitor's local date once in the browser.
  const today = useSyncExternalStore(
    noopSubscribe,
    () => todayIso(),
    () => "",
  );
  const [isPending, startTransition] = useTransition();
  const startedAt = useRef<number>(0);
  const lastSent = useRef<string | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const whatsappEnabled = whatsappHref() !== null;
  const mode = endpoint ? "webhook" : whatsappEnabled ? "whatsapp" : "none";
  const busy = isPending || status.kind === "sending";

  useEffect(() => {
    startedAt.current = Date.now();

    // "Enquire about …" links on vehicle cards preselect a category.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLElement>("[data-enquire-category]");
      const id = link?.dataset.enquireCategory;
      if (id && categoryOptions.some((option) => option.id === id)) {
        setValues((current) => ({ ...current, category: id }));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const runValidation = (next: EnquiryInput) => validateEnquiry(sanitizeEnquiry(next), todayIso());

  const update = (field: EnquiryField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (status.kind !== "sending") setStatus({ kind: "idle" });
    if (submitted) setErrors(runValidation(next));
  };

  const revealStatus = () => requestAnimationFrame(() => statusRef.current?.focus());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    setSubmitted(true);
    const clean = sanitizeEnquiry(values);
    const found = validateEnquiry(clean, todayIso());
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "idle" });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const fingerprint = JSON.stringify(clean);

    if (mode === "webhook" && endpoint) {
      if (lastSent.current === fingerprint) {
        setStatus({
          kind: "error",
          message: "This enquiry has already been sent. Change the details to send a new one.",
        });
        revealStatus();
        return;
      }
      setStatus({ kind: "sending" });
      startTransition(async () => {
        try {
          const result = await submitEnquiry(endpoint, clean, {
            startedAt: startedAt.current,
            website: honeypot.current?.value ?? "",
          });
          if (result.ok) {
            lastSent.current = fingerprint;
            setStatus({ kind: "sent" });
          } else {
            setStatus({ kind: "error", message: result.message });
          }
        } catch {
          setStatus({
            kind: "error",
            message: "We couldn't reach the server. Please check your connection and try again.",
          });
        }
        revealStatus();
      });
      return;
    }

    if (mode === "whatsapp") {
      const href = whatsappHref(formatEnquiryMessage(clean));
      if (!href) return;
      window.open(href, "_blank", "noopener,noreferrer");
      setStatus({ kind: "whatsapp", href });
      revealStatus();
      return;
    }

    setStatus({ kind: "unavailable" });
    revealStatus();
  };

  const sendViaWhatsapp = () => {
    const clean = sanitizeEnquiry(values);
    const found = validateEnquiry(clean, todayIso());
    setSubmitted(true);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const href = whatsappHref(formatEnquiryMessage(clean));
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
    setStatus({ kind: "whatsapp", href });
    revealStatus();
  };

  const errorList = FIELD_ORDER.filter((field) => errors[field]);
  const fieldProps = (field: EnquiryField) => ({
    id: `${formId}-${field}`,
    name: field,
    value: values[field],
    maxLength: MAX_LENGTH[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${formId}-${field}-error` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(field, event.target.value),
    className: `w-full rounded-lg border bg-white px-4 text-base text-ink placeholder:text-ink/40 transition-[border-color,box-shadow] duration-200 focus:border-ink focus:shadow-[0_0_0_4px_rgba(11,11,12,0.08)] focus:outline-none focus-visible:outline-none ${
      errors[field] ? "border-danger" : "border-ink/20 hover:border-ink/40"
    }`,
  });

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} aria-describedby={`${formId}-intro`} className="space-y-6">
      <p id={`${formId}-intro`} className="text-sm text-muted">
        Fields marked <span aria-hidden>*</span>
        <span className="sr-only">required</span> are required. Please don&rsquo;t include payment card or identity
        document details.
      </p>

      {submitted && errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-danger/40 bg-danger/5 p-4 text-sm text-danger"
        >
          <p className="flex items-center gap-2 font-semibold">
            <AlertCircle aria-hidden className="size-4" />
            Please check {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#${formId}-${field}`} className="underline underline-offset-2">
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {vehicle && values.vehicle === vehicle.slug && (
        <div className="flex items-center gap-4 rounded-xl border border-ink/15 bg-mist p-3 pr-4">
          <Image
            src={vehicle.photos[0]?.thumb}
            alt=""
            width={96}
            height={54}
            className="h-14 w-24 shrink-0 rounded-lg object-cover"
          />
          <p className="min-w-0 flex-1 text-sm leading-snug">
            <span className="block text-muted">Enquiring about</span>
            <strong className="font-semibold text-ink">{vehicleLabel(vehicle)}</strong>
          </p>
          <button
            type="button"
            onClick={() => update("vehicle", "")}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-white hover:text-ink"
            aria-label={`Remove ${vehicleLabel(vehicle)} from this enquiry`}
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          id={`${formId}-fullName`}
          error={errors.fullName}
          errorId={`${formId}-fullName-error`}
        >
          <input
            {...fieldProps("fullName")}
            type="text"
            autoComplete="name"
            required
            className={`${fieldProps("fullName").className} h-12`}
          />
        </Field>
        <Field
          label="Contact phone number"
          required
          id={`${formId}-phone`}
          error={errors.phone}
          errorId={`${formId}-phone-error`}
        >
          <input
            {...fieldProps("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 077 123 4567"
            required
            className={`${fieldProps("phone").className} h-12`}
          />
        </Field>
        <Field
          label="Email address"
          optional
          id={`${formId}-email`}
          error={errors.email}
          errorId={`${formId}-email-error`}
        >
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            className={`${fieldProps("email").className} h-12`}
          />
        </Field>
        <Field
          label="Preferred vehicle category"
          required
          id={`${formId}-category`}
          error={errors.category}
          errorId={`${formId}-category-error`}
        >
          <select
            {...fieldProps("category")}
            required
            className={`${fieldProps("category").className} h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230b0b0c%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Preferred make or model"
          optional
          id={`${formId}-makeModel`}
          error={errors.makeModel}
          errorId={`${formId}-makeModel-error`}
          className="sm:col-span-2"
        >
          <input
            {...fieldProps("makeModel")}
            type="text"
            placeholder="e.g. Toyota, Suzuki, Honda — or leave blank"
            className={`${fieldProps("makeModel").className} h-12`}
          />
        </Field>
        <Field
          label="Rental start date"
          required
          id={`${formId}-startDate`}
          error={errors.startDate}
          errorId={`${formId}-startDate-error`}
        >
          <input
            {...fieldProps("startDate")}
            type="date"
            min={today || undefined}
            required
            className={`${fieldProps("startDate").className} h-12`}
          />
        </Field>
        <Field
          label="Expected return date"
          required
          id={`${formId}-returnDate`}
          error={errors.returnDate}
          errorId={`${formId}-returnDate-error`}
        >
          <input
            {...fieldProps("returnDate")}
            type="date"
            min={values.startDate || today || undefined}
            required
            className={`${fieldProps("returnDate").className} h-12`}
          />
        </Field>
        <Field
          label="Pickup location or preferred area"
          required
          id={`${formId}-pickup`}
          error={errors.pickup}
          errorId={`${formId}-pickup-error`}
          className="sm:col-span-2"
        >
          <input
            {...fieldProps("pickup")}
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Colombo, Kandy, Negombo"
            required
            className={`${fieldProps("pickup").className} h-12`}
          />
        </Field>
        <Field
          label="Additional requirements"
          optional
          id={`${formId}-notes`}
          error={errors.notes}
          errorId={`${formId}-notes-error`}
          className="sm:col-span-2"
        >
          <textarea
            {...fieldProps("notes")}
            rows={4}
            placeholder="Number of passengers, luggage, purpose of travel or anything else we should know"
            className={`${fieldProps("notes").className} py-3`}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input
          ref={honeypot}
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {mode === "none" && (
        <p className="rounded-xl border border-dashed border-ink/30 bg-mist px-4 py-3 text-sm leading-relaxed text-ink">
          <strong className="font-semibold">Online enquiries are not connected yet.</strong> This form checks your
          details but cannot send them until RideWave Rentals connects an enquiry service or WhatsApp number.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={busy} aria-disabled={busy} className={`${button.primary} sm:min-w-56`}>
          {busy ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : mode === "whatsapp" ? (
            <>
              <MessageCircle aria-hidden className="size-4" />
              Continue in WhatsApp
            </>
          ) : (
            <>
              <Send aria-hidden className="size-4" />
              Send an Enquiry
            </>
          )}
        </button>
        {mode === "webhook" && whatsappEnabled && (
          <button type="button" onClick={sendViaWhatsapp} disabled={busy} className={button.secondary}>
            <MessageCircle aria-hidden className="size-4" />
            Send via WhatsApp instead
          </button>
        )}
      </div>

      {mode === "whatsapp" && (
        <p className="text-sm leading-relaxed text-muted">
          This opens WhatsApp with your enquiry written out. Your enquiry is only sent once you press Send in WhatsApp.
        </p>
      )}

      <div ref={statusRef} tabIndex={-1} aria-live="polite" data-status className="focus:outline-none">
        <StatusMessage status={status} />
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  optional,
  error,
  errorId,
  className = "",
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  errorId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          <span>
            <span className="sr-only">Error: </span>
            {error}
          </span>
        </p>
      )}
    </div>
  );
}

function StatusMessage({ status }: { status: Status }) {
  switch (status.kind) {
    case "sent":
      return (
        <div className="flex items-start gap-3 rounded-xl border border-success/40 bg-success/5 p-4 text-success">
          <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Your enquiry has been sent.</strong> RideWave Rentals will be in touch to
            discuss your options. Remember, this is an enquiry, not a confirmed booking.
          </p>
        </div>
      );
    case "whatsapp":
      return (
        <div className="rounded-xl border border-ink/20 bg-mist p-4 text-ink">
          <p className="leading-relaxed">
            <strong className="font-semibold">One more step:</strong> WhatsApp should have opened with your enquiry. It
            has not been sent yet. Please press Send in WhatsApp to deliver it to RideWave Rentals.
          </p>
          <a
            href={status.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
          >
            <MessageCircle aria-hidden className="size-4" />
            Open WhatsApp again
          </a>
        </div>
      );
    case "error":
      return (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/5 p-4 text-danger"
        >
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p className="leading-relaxed">{status.message}</p>
        </div>
      );
    case "unavailable":
      return (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-ink/25 bg-mist p-4 text-ink">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Your details look good, but they have not been sent.</strong> Online
            enquiries are not connected yet. Please contact RideWave Rentals directly to discuss your rental.
          </p>
        </div>
      );
    default:
      return null;
  }
}
