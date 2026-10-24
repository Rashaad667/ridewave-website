import { Info } from "lucide-react";
import { container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Tell Us What You Need",
    text: "Share your intended rental dates, vehicle preference and basic requirements using the enquiry form.",
  },
  {
    title: "Discuss Your Options",
    text: "RideWave Rentals reviews your enquiry and gets in touch to talk through the options for your dates.",
  },
  {
    title: "Confirm the Details",
    text: "Rental dates, price, availability, documents and terms are agreed with RideWave before a booking is confirmed.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="how-title" eyebrow="How it works" title="Three Simple Steps to Your Rental.">
          <p>A straightforward process, with the important details agreed directly with us.</p>
        </SectionHeading>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-line bg-white p-7 sm:p-8">
              <span aria-hidden className="font-display text-5xl leading-none font-bold tracking-[-0.04em] text-ink/15">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.015em]">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 flex items-start gap-3 rounded-xl border border-ink/15 bg-mist px-5 py-4 leading-relaxed text-ink">
          <Info aria-hidden className="mt-1 size-4 shrink-0" />
          <span>
            <strong className="font-semibold">Please note:</strong> submitting an enquiry on this website does not
            reserve or confirm a vehicle. Your booking is confirmed only once the details have been agreed with RideWave
            Rentals.
          </span>
        </p>
      </div>
    </section>
  );
}
