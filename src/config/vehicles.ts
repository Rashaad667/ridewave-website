/**
 * Vehicle categories shown in "Explore Vehicles" and offered in the
 * enquiry form.
 *
 * These are REPRESENTATIVE categories, not a confirmed fleet list. When the
 * real fleet is confirmed, edit this file:
 *  - remove categories the business does not offer, or add new ones;
 *  - set `image` to a licensed photo placed in /public/vehicles/;
 *  - keep descriptions free of prices, availability or specifications
 *    unless the business has confirmed them.
 */

export type BodyStyle = "hatchback" | "sedan" | "compact-suv" | "suv" | "van";

export type VehicleCategory = {
  /** Stable id used in the enquiry form. */
  id: string;
  name: string;
  description: string;
  /** Used for the placeholder outline until a real photo is supplied. */
  bodyStyle: BodyStyle;
  /**
   * Licensed photo, e.g. { src: "/vehicles/hatchback.jpg", alt: "…" }.
   * Leave null to show a clearly labelled placeholder.
   */
  image: { src: string; alt: string } | null;
};

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "hatchback",
    name: "Hatchbacks",
    description:
      "Compact and easy to park. A practical choice for city driving and everyday errands. Includes our Suzuki Baleno Zeta (2017, automatic).",
    bodyStyle: "hatchback",
    // Supplied by RideWave, 24 Oct 2026.
    image: { src: "/vehicles/suzuki-baleno-side.webp", alt: "Side view of a silver Suzuki Baleno hatchback" },
  },
  {
    id: "sedan",
    name: "Sedans",
    description: "A comfortable option for business travel, family visits and longer drives between cities.",
    bodyStyle: "sedan",
    image: null,
  },
  {
    id: "compact-suv",
    name: "Compact SUVs",
    description:
      "A higher driving position and flexible space for mixed town and country roads. Includes our Suzuki Fronx (2024, automatic).",
    bodyStyle: "compact-suv",
    // Supplied by RideWave, 24 Oct 2026.
    image: { src: "/vehicles/suzuki-fronx-side.webp", alt: "Side view of a white Suzuki Fronx compact SUV" },
  },
  {
    id: "suv",
    name: "SUVs",
    description: "More room for passengers and luggage when your plans call for extra space.",
    bodyStyle: "suv",
    image: null,
  },
  {
    id: "van",
    name: "Vans & People Carriers",
    description: "Suited to group travel, family trips and occasions where everyone needs to travel together.",
    bodyStyle: "van",
    image: null,
  },
];

/** Extra option in the enquiry form for customers who are unsure. */
export const NOT_SURE_CATEGORY = { id: "not-sure", name: "Not sure yet — please advise" };
