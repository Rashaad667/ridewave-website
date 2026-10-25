import { ArrowRight, Info } from "lucide-react";
import { fleet } from "@/config/fleet";
import { vehicleCategories } from "@/config/vehicles";
import { arrowNudge, button, container, revealDelay } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";
import { FleetCard } from "./FleetCard";
import { VehicleCard } from "./VehicleCard";

/** With a full row of vehicles, the "Need something else?" card becomes a wide banner on desktop. */
const wideExtraCard = fleet.length % 3 === 0;

/** Category cards are shown only for types not already covered by a fleet vehicle. */
const otherCategories = vehicleCategories.filter(
  (category) => !fleet.some((vehicle) => vehicle.categoryId === category.id),
);

export function VehicleCategories() {
  return (
    <section id="vehicles" aria-labelledby="vehicles-title" className="py-20 sm:py-28">
      <div className={container}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="vehicles-title" eyebrow="Explore vehicles" title="Find a Vehicle That Fits Your Plans.">
            <p>
              Whether it&rsquo;s a city errand, a business trip or a family journey, start with the type of vehicle that
              suits you and we&rsquo;ll talk through the options.
            </p>
          </SectionHeading>
          <p
            data-reveal
            style={revealDelay(1, 3, 120)}
            className="flex max-w-sm items-start gap-2.5 rounded-lg border border-line bg-mist px-4 py-3 text-sm leading-relaxed text-muted"
          >
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-ink" />
            <span>
              Tap a vehicle to see its photos and details. Availability is confirmed when you enquire with your dates.
            </span>
          </p>
        </div>

        <ul aria-label="Our vehicles" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((vehicle, index) => (
            <li key={vehicle.slug} data-reveal style={revealDelay(index)} className="flex">
              <FleetCard vehicle={vehicle} />
            </li>
          ))}
          <li
            data-reveal
            style={revealDelay(fleet.length)}
            className={`flex ${wideExtraCard ? "lg:col-span-3" : ""}`}
          >
            <div
              className={`on-dark relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-white ${
                wideExtraCard ? "lg:flex-row lg:items-center lg:gap-12 lg:p-10" : ""
              }`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-1/4 -bottom-1/3 size-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent)]"
              />
              <div className="relative">
                <h3 className="font-display text-xl font-bold tracking-[-0.015em]">Need something else?</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-white/70">
                  Have a particular make, model or requirement in mind? Tell us about it in your enquiry and we&rsquo;ll
                  let you know what we can arrange.
                </p>
              </div>
              <a
                href="#enquire"
                className={`${button.inverse} relative mt-8 ${wideExtraCard ? "lg:mt-0 lg:shrink-0" : ""}`}
              >
                Discuss Your Requirements
                <ArrowRight aria-hidden className={arrowNudge} />
              </a>
            </div>
          </li>
        </ul>

        {otherCategories.length > 0 && (
          <>
            <div data-reveal className="mt-16 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em]">Other vehicle types</h3>
              <p className="text-sm text-muted">Representative categories. Ask us what we can arrange.</p>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherCategories.map((category, index) => (
                <li key={category.id} data-reveal style={revealDelay(index)} className="flex">
                  <VehicleCard category={category} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
