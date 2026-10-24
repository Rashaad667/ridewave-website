import { ArrowRight, Info } from "lucide-react";
import { vehicleCategories } from "@/config/vehicles";
import { arrowNudge, button, container, revealDelay } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";
import { VehicleCard } from "./VehicleCard";

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
              These are representative vehicle categories, not a live list of available vehicles. Ask us what is
              available for your dates.
            </span>
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleCategories.map((category, index) => (
            <li key={category.id} data-reveal style={revealDelay(index)} className="flex">
              <VehicleCard category={category} />
            </li>
          ))}
          <li data-reveal style={revealDelay(vehicleCategories.length)} className="flex">
            <div className="on-dark relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-7 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-1/4 -bottom-1/3 size-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.08),transparent)]"
              />
              <div className="relative">
                <h3 className="font-display text-xl font-bold tracking-[-0.015em]">Need something else?</h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Have a particular make, model or requirement in mind? Tell us about it in your enquiry and we&rsquo;ll
                  let you know what we can arrange.
                </p>
              </div>
              <a href="#enquire" className={`${button.inverse} relative mt-8`}>
                Discuss Your Requirements
                <ArrowRight aria-hidden className={arrowNudge} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
