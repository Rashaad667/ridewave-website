import type { CSSProperties } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { arrowNudge, button, container } from "@/lib/ui";
import { VehicleVisual } from "./VehicleVisual";

/** Staggered entrance delay for hero elements. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:96px_100%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-20%] h-[80%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]"
      />
      <div
        className={`${container} relative grid items-center gap-12 pt-14 pb-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-28`}
      >
        <div>
          <p
            style={delay(0)}
            className="motion-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium tracking-[0.12em] text-white/75 uppercase"
          >
            <MapPin aria-hidden className="size-3.5" />
            Vehicle rental · {siteConfig.market}
          </p>
          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] leading-[1.02] font-bold tracking-[-0.03em] min-[380px]:text-[2.85rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            <span className="line-mask">
              <span style={delay(80)}>Your Journey.</span>
            </span>
            <span className="line-mask">
              <span style={delay(200)} className="text-white/55">
                Your Ride.
              </span>
            </span>
          </h1>
          <p
            style={delay(340)}
            className="motion-rise mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-pretty text-white/75 sm:text-lg"
          >
            Looking for a vehicle in Sri Lanka? Tell us what you need and let RideWave Rentals help you explore the
            right rental options for your journey.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#enquire" style={delay(460)} className={`${button.inverse} motion-rise`}>
              Enquire About a Rental
              <ArrowRight aria-hidden className={arrowNudge} />
            </a>
            <a href="#vehicles" style={delay(540)} className={`${button.inverseOutline} motion-rise`}>
              Explore Vehicles
            </a>
          </div>
          <p style={delay(640)} className="motion-rise mt-6 max-w-md text-sm leading-relaxed text-white/55">
            Sending an enquiry does not confirm a booking. We&rsquo;ll discuss dates, availability and pricing with you
            directly.
          </p>
        </div>

        <div style={delay(260)} className="motion-settle">
          <VehicleVisual
            bodyStyle="compact-suv"
            image={siteConfig.heroImage}
            label="Hero photograph of a rental vehicle"
            tone="dark"
            sizes="(min-width: 1024px) 45vw, 100vw"
            priority
            animateDraw
            className="aspect-[4/3] rounded-2xl ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}
