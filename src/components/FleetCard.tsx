import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { vehicleHref, vehicleName, type FleetVehicle } from "@/config/fleet";
import { arrowNudge } from "@/lib/ui";

/** Card for an actual fleet vehicle; the whole card opens its details page. */
export function FleetCard({ vehicle }: { vehicle: FleetVehicle }) {
  const [main, second] = vehicle.photos;
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.28)] focus-within:border-ink/30 active:scale-[0.99]">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        {main && (
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className={`object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.03] ${
              second ? "group-hover:opacity-0" : ""
            }`}
          />
        )}
        {/* On devices with a mouse, hovering swaps to the second photo as a preview of the gallery. */}
        {second && (
          <Image
            src={second.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
          />
        )}
        <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-1 text-[0.7rem] font-semibold tracking-wide text-ink uppercase ring-1 ring-black/5 backdrop-blur-sm">
          {vehicle.bodyType}
        </span>
        {vehicle.photos.length > 1 && (
          <span className="absolute right-3 bottom-3 rounded-md bg-ink/75 px-2 py-1 text-[0.7rem] font-semibold text-white backdrop-blur-sm">
            {vehicle.photos.length} photos
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold tracking-[-0.015em]">
          {vehicleName(vehicle)}
          {vehicle.variant && <span className="font-medium text-muted"> {vehicle.variant}</span>}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2 text-sm text-ink" aria-label="Key details">
          {[String(vehicle.year), vehicle.transmission, vehicle.colour].map((detail) => (
            <li key={detail} className="rounded-full border border-line bg-mist px-3 py-1">
              {detail}
            </li>
          ))}
        </ul>
        <a
          href={vehicleHref(vehicle)}
          className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-[0.95rem] font-semibold text-ink underline-offset-4 transition-opacity hover:underline active:opacity-60 after:absolute after:inset-0 after:content-['']"
        >
          View details
          <span className="sr-only">
            {" "}
            for the {vehicle.year} {vehicleName(vehicle)}
          </span>
          <ArrowRight aria-hidden className={arrowNudge} />
        </a>
      </div>
    </article>
  );
}
