import { Info } from "lucide-react";
import { vehicleCategories } from "@/config/vehicles";
import { container } from "@/lib/ui";
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
          <p className="flex max-w-sm items-start gap-2.5 rounded-lg border border-line bg-mist px-4 py-3 text-sm leading-relaxed text-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-ink" />
            <span>
              These are representative vehicle categories, not a live list of available vehicles. Ask us what is
              available for your dates.
            </span>
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {vehicleCategories.map((category) => (
            <li key={category.id} className="flex">
              <VehicleCard category={category} />
            </li>
          ))}
          <li className="flex">
            <div className="flex w-full flex-col justify-between rounded-2xl bg-ink p-7 text-white on-dark">
              <div>
                <h3 className="font-display text-xl font-bold tracking-[-0.015em]">Need something else?</h3>
                <p className="mt-3 leading-relaxed text-white/70">
                  Have a particular make, model or requirement in mind? Tell us about it in your enquiry and we&rsquo;ll
                  let you know what we can arrange.
                </p>
              </div>
              <a
                href="#enquire"
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-6 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-white/85"
              >
                Discuss Your Requirements
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
