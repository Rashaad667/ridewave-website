import { ArrowRight } from "lucide-react";
import { button, container } from "@/lib/ui";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="on-dark bg-ink py-20 text-white sm:py-24">
      <div className={`${container} flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between`}>
        <div className="max-w-2xl">
          <h2
            id="final-cta-title"
            className="font-display text-3xl leading-[1.1] font-bold tracking-[-0.025em] text-balance sm:text-4xl lg:text-5xl"
          >
            Ready to Discuss Your Next Ride?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Tell us what you need, and get in touch with RideWave Rentals to discuss your vehicle rental requirements.
          </p>
        </div>
        <a href="#enquire" className={`${button.inverse} w-full shrink-0 sm:w-auto`}>
          Start Your Enquiry
          <ArrowRight aria-hidden className="size-4" />
        </a>
      </div>
    </section>
  );
}
