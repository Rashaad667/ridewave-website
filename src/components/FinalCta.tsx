import { ArrowRight } from "lucide-react";
import { arrowNudge, button, container, revealDelay } from "@/lib/ui";

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="on-dark relative overflow-hidden bg-ink py-20 text-white sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:96px_100%]"
      />
      <div className={`${container} flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between`}>
        <div data-reveal className="relative max-w-2xl">
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
        <a
          href="#enquire"
          data-reveal
          style={revealDelay(1, 3, 150)}
          className={`${button.inverse} relative w-full shrink-0 sm:w-auto`}
        >
          Start Your Enquiry
          <ArrowRight aria-hidden className={arrowNudge} />
        </a>
      </div>
    </section>
  );
}
