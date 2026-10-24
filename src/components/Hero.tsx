import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { button, container } from "@/lib/ui";
import { VehicleVisual } from "./VehicleVisual";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:96px_100%]"
      />
      <div
        className={`${container} relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28`}
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium tracking-[0.12em] text-white/75 uppercase">
            <MapPin aria-hidden className="size-3.5" />
            Vehicle rental · {siteConfig.market}
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.75rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          >
            Your Journey.
            <br />
            <span className="text-white/60">Your Ride.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Looking for a vehicle in Sri Lanka? Tell us what you need and let RideWave Rentals help you explore the
            right rental options for your journey.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#enquire" className={button.inverse}>
              Enquire About a Rental
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a href="#vehicles" className={button.inverseOutline}>
              Explore Vehicles
            </a>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
            Sending an enquiry does not confirm a booking. We&rsquo;ll discuss dates, availability and pricing with you
            directly.
          </p>
        </div>

        <VehicleVisual
          bodyStyle="compact-suv"
          image={siteConfig.heroImage}
          label="Hero photograph of a rental vehicle"
          tone="dark"
          sizes="(min-width: 1024px) 45vw, 100vw"
          priority
          className="aspect-[4/3] rounded-2xl ring-1 ring-white/10"
        />
      </div>
    </section>
  );
}
