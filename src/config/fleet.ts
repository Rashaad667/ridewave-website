/**
 * Individual vehicles in the RideWave fleet. Each one gets a card in
 * "Explore Vehicles" and its own details page at /vehicles/<slug>/.
 *
 * Only enter details RideWave Rentals has confirmed. Anything left out of
 * `specs` is listed on the page as "to be confirmed", and no price is shown
 * unless `rate` is set.
 *
 * To add a vehicle:
 *  1. Put up to three photos in /public/vehicles/, named like
 *     <model>-<year>-<colour>-front.webp (plus a matching -thumb.webp).
 *  2. Copy one of the entries below, give it a new `slug`, and update the
 *     details. `categoryId` must match an id in src/config/vehicles.ts.
 */

import type { BodyStyle } from "./vehicles";

export type VehiclePhoto = {
  src: string;
  /** Small version used for the gallery thumbnails. */
  thumb: string;
  alt: string;
};

/** Specifications shown only when they are filled in. */
export type VehicleSpecs = Partial<{
  seats: string;
  fuel: string;
  engine: string;
  luggage: string;
  doors: string;
  airConditioning: string;
}>;

export type FleetVehicle = {
  /** URL name: /vehicles/<slug>/ */
  slug: string;
  make: string;
  model: string;
  /** Trim or grade, e.g. "Zeta". */
  variant: string | null;
  year: number;
  colour: string;
  transmission: string;
  /** Short body type shown to visitors, e.g. "Hatchback". */
  bodyType: string;
  bodyStyle: BodyStyle;
  /** Matching enquiry-form category id from src/config/vehicles.ts. */
  categoryId: string;
  /** First photo is the main image. Up to three. */
  photos: VehiclePhoto[];
  specs: VehicleSpecs;
  /** Confirmed rental rate text, e.g. "LKR 0,000 per day". Null hides prices. */
  rate: string | null;
};

const photos = (base: string, name: string, colour: string): VehiclePhoto[] =>
  (["front", "side", "rear"] as const).map((view) => ({
    src: `/vehicles/${base}-${view}.webp`,
    thumb: `/vehicles/${base}-${view}-thumb.webp`,
    alt: `${view === "front" ? "Front three-quarter" : view === "side" ? "Side" : "Rear three-quarter"} view of the ${colour.toLowerCase()} ${name}`,
  }));

export const fleet: FleetVehicle[] = [
  {
    // Confirmed by RideWave, 24 Oct 2026: model, trim, year, transmission, colour, body type.
    slug: "suzuki-baleno-2017",
    make: "Suzuki",
    model: "Baleno",
    variant: "Zeta",
    year: 2017,
    colour: "Grey",
    transmission: "Automatic",
    bodyType: "Hatchback",
    bodyStyle: "hatchback",
    categoryId: "hatchback",
    photos: photos("baleno-2017-grey", "Suzuki Baleno", "Grey"),
    specs: {},
    rate: null,
  },
  {
    // Confirmed by RideWave, 24 Oct 2026: model, year, transmission, colour, body type (mini SUV).
    slug: "suzuki-fronx-2024",
    make: "Suzuki",
    model: "Fronx",
    variant: null,
    year: 2024,
    colour: "White",
    transmission: "Automatic",
    bodyType: "Compact SUV",
    bodyStyle: "compact-suv",
    categoryId: "compact-suv",
    photos: photos("fronx-2024-white", "Suzuki Fronx", "White"),
    specs: {},
    rate: null,
  },
];

export const SPEC_LABELS: Record<keyof VehicleSpecs, string> = {
  seats: "Seating capacity",
  fuel: "Fuel type",
  engine: "Engine",
  luggage: "Luggage capacity",
  doors: "Doors",
  airConditioning: "Air conditioning",
};

export const vehicleName = (vehicle: FleetVehicle) => `${vehicle.make} ${vehicle.model}`;

/** e.g. "Suzuki Baleno 2017 (Grey, Automatic)" — used in enquiry messages. */
export const vehicleLabel = (vehicle: FleetVehicle) =>
  `${vehicleName(vehicle)}${vehicle.variant ? ` ${vehicle.variant}` : ""} ${vehicle.year} (${vehicle.colour}, ${vehicle.transmission})`;

export const vehicleHref = (vehicle: FleetVehicle) => `/vehicles/${vehicle.slug}/`;

export const findVehicle = (slug: string) => fleet.find((vehicle) => vehicle.slug === slug);
