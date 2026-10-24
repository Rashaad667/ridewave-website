import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { BodyStyle } from "@/config/vehicles";

/**
 * Simple side-profile outlines used ONLY as clearly labelled placeholders
 * until licensed vehicle photography is supplied. Not fleet photos.
 */
const outlines: Record<
  BodyStyle,
  { body: string; glass: string; sill: [number, number]; wheels: [number, number]; r: number }
> = {
  hatchback: {
    body: "M30 98V82q2-11 16-14l52-9 36-24q8-5 18-5h66q14 0 22 9l26 28q22 4 24 16v16",
    glass: "M108 60l30-21q5-3 12-3h34v24zM194 36h22q10 0 16 7l18 18-56-1z",
    sill: [30, 292],
    wheels: [86, 234],
    r: 18,
  },
  sedan: {
    body: "M18 98V84q2-11 18-14l52-7 38-26q8-5 20-5h58q14 0 24 9l26 22 38 6q16 4 16 15v14",
    glass: "M100 62l30-21q6-3 14-3h32v25zM186 38h20q12 0 20 7l20 18-60-1z",
    sill: [18, 306],
    wheels: [78, 252],
    r: 18,
  },
  "compact-suv": {
    body: "M22 98V76q2-12 18-15l42-6 28-26q6-5 18-5h106q14 0 22 11l20 26q22 4 24 18v19",
    glass: "M98 56l24-22q5-4 13-4h48v26zM193 30h44q10 0 16 8l16 20-76-1z",
    sill: [22, 300],
    wheels: [84, 240],
    r: 20,
  },
  suv: {
    body: "M18 98V70q2-12 16-14l40-4 22-31q4-5 16-5h150q14 0 20 11l12 27q10 4 10 16v28",
    glass: "M88 52l18-24q3-4 11-4h58v28zM185 24h62q10 0 14 8l11 21-87-1z",
    sill: [18, 304],
    wheels: [82, 248],
    r: 21,
  },
  van: {
    body: "M14 98V50q0-10 8-16l34-19q6-3 16-3h220q12 0 12 12v74",
    glass: "M38 46l24-16q5-3 12-3h30v19zM114 27h56v19h-56zM180 27h56v19h-56zM246 27h44v19h-44z",
    sill: [14, 304],
    wheels: [76, 254],
    r: 20,
  },
};

type VehicleVisualProps = {
  bodyStyle: BodyStyle;
  image: { src: string; alt: string } | null;
  /** Category or context name, used to label the placeholder. */
  label: string;
  tone?: "light" | "dark";
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function VehicleVisual({
  bodyStyle,
  image,
  label,
  tone = "light",
  sizes,
  priority,
  className = "",
}: VehicleVisualProps) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const shape = outlines[bodyStyle];
  const dark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}. A licensed photograph will be added.`}
      className={`relative overflow-hidden ${
        dark
          ? "bg-[radial-gradient(120%_90%_at_70%_20%,#2a2a2e_0%,#141416_55%,#0b0b0c_100%)]"
          : "bg-[radial-gradient(120%_90%_at_70%_15%,#ffffff_0%,#f3f3f1_60%,#ebebe8_100%)]"
      } ${className}`}
    >
      <svg
        viewBox="0 0 320 130"
        aria-hidden
        className={`absolute inset-x-[8%] bottom-[14%] w-[84%] ${dark ? "text-white/55" : "text-ink/30"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M4 119h312" strokeWidth="1.25" opacity="0.6" />
        <path d={shape.body} />
        <path d={shape.glass} strokeWidth="1.5" opacity="0.8" />
        <path d={`M${shape.sill[0]} 98H${shape.sill[1]}`} />
        {shape.wheels.map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={119 - shape.r} r={shape.r} className={dark ? "fill-[#141416]" : "fill-[#f1f1ef]"} />
            <circle cx={cx} cy={119 - shape.r} r={shape.r * 0.45} strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <span
        className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[0.7rem] font-semibold tracking-wide uppercase ${
          dark ? "bg-white/10 text-white/80" : "bg-white/90 text-ink/65 ring-1 ring-line"
        }`}
      >
        <ImageIcon aria-hidden className="size-3.5" />
        Photo placeholder
      </span>
    </div>
  );
}
