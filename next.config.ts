import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files: deploys on any static host (Netlify, Cloudflare Pages, etc.).
  output: "export",
  // Pages export as folder/index.html, e.g. /vehicles/suzuki-baleno-2017/.
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    // Fallback for the footer copyright year; the browser shows the live year.
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  images: {
    // Static hosting has no image optimiser; images are pre-sized in /public.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
