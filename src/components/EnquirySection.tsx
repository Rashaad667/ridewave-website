import { ClipboardList, ShieldCheck } from "lucide-react";
import { container, revealDelay } from "@/lib/ui";
import { EnquiryForm } from "./EnquiryForm";
import { SectionHeading } from "./SectionHeading";

export function EnquirySection() {
  const raw = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT?.trim();
  const endpoint = raw?.startsWith("https://") ? raw : null;

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="border-t border-line bg-mist py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <div>
          <SectionHeading id="enquire-title" eyebrow="Rental enquiry" title="Send an Enquiry.">
            <p>Share your dates and requirements. We&rsquo;ll review them and get back to you to discuss options.</p>
          </SectionHeading>
          <ul data-reveal style={revealDelay(1, 3, 120)} className="mt-10 space-y-5 text-ink">
            <li className="flex gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white">
                <ClipboardList aria-hidden className="size-5" />
              </span>
              <p className="leading-relaxed">
                <strong className="block font-semibold">What to include</strong>
                <span className="text-muted">
                  Your dates, the type of vehicle you prefer and where you would like to collect it.
                </span>
              </p>
            </li>
            <li className="flex gap-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white">
                <ShieldCheck aria-hidden className="size-5" />
              </span>
              <p className="leading-relaxed">
                <strong className="block font-semibold">An enquiry, not a booking</strong>
                <span className="text-muted">
                  Availability, price, documents and terms are confirmed with RideWave Rentals directly.
                </span>
              </p>
            </li>
          </ul>
        </div>

        <div
          data-reveal
          style={revealDelay(1, 3, 120)}
          className="relative rounded-2xl border border-line bg-white p-5 shadow-[0_24px_48px_-32px_rgba(0,0,0,0.25)] sm:p-10"
        >
          <EnquiryForm endpoint={endpoint} />
        </div>
      </div>
    </section>
  );
}
