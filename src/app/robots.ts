import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

// Required for the static export (output: "export").
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(url && { sitemap: new URL("/sitemap.xml", url).href }),
  };
}
