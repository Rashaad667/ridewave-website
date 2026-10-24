import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Required for the static export (output: "export").
export const dynamic = "force-static";

/**
 * Default social sharing image built from the official logo.
 * To use a custom image instead, delete this file and add
 * src/app/opengraph-image.jpg (1200 × 630).
 */
export const alt = "RideWave Rentals — vehicle rental enquiries in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/ridewave-logo.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        gap: 36,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={logoSrc} width={458} height={361} />
      <div style={{ display: "flex", fontSize: 30, color: "#5c5c62", letterSpacing: 1 }}>
        Vehicle rental enquiries in Sri Lanka
      </div>
    </div>,
    size,
  );
}
