import Image from "next/image";
import { siteConfig } from "@/config/site";

type LogoProps = {
  /** Rendered height in pixels; width follows the original aspect ratio. */
  height: number;
  priority?: boolean;
  className?: string;
};

/** The official RideWave Rentals logo, displayed at its original proportions. */
export function Logo({ height, priority = false, className }: LogoProps) {
  const { src, width: w, height: h, alt } = siteConfig.logo;
  const width = Math.round((w / h) * height);
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ width, height }}
    />
  );
}
