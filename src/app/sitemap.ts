import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

// Required for the static export (output: "export").
export const dynamic = "force-static";

/** Lists the home page once NEXT_PUBLIC_SITE_URL is set; empty until the domain is known. */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  if (!url) return [];
  return [{ url: new URL("/", url).href, changeFrequency: "monthly", priority: 1 }];
}
