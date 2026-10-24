import type { MetadataRoute } from "next";
import { fleet, vehicleHref } from "@/config/fleet";
import { getSiteUrl } from "@/config/site";

// Required for the static export (output: "export").
export const dynamic = "force-static";

/** Lists the home and vehicle pages once NEXT_PUBLIC_SITE_URL is set; empty until the domain is known. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  if (!url) return [];
  return [
    { url: new URL("/", url).href, changeFrequency: "monthly", priority: 1 },
    ...fleet.map((vehicle) => ({
      url: new URL(vehicleHref(vehicle), url).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
