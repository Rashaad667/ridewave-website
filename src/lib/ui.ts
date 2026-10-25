import type { CSSProperties } from "react";

/** Shared button styles so every call to action looks consistent. */

const base =
  "group/btn inline-flex min-h-12 select-none items-center justify-center gap-2 rounded-lg px-6 text-[0.95rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

export const button = {
  primary: `${base} bg-ink text-white hover:bg-ink-soft hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)]`,
  secondary: `${base} border border-ink/15 bg-white text-ink hover:border-ink/40 hover:bg-mist`,
  /** For use on black backgrounds. */
  inverse: `${base} bg-white text-ink hover:bg-white/90 hover:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.35)]`,
  /** Outline button for use on black backgrounds. */
  inverseOutline: `${base} border border-white/30 text-white hover:border-white/70 hover:bg-white/5`,
};

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

/** Arrow icon that nudges forward when its button or link is hovered. */
export const arrowNudge =
  "size-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1 group-hover:translate-x-1";

/** Stagger for [data-reveal] items in a grid, by column position. */
export const revealDelay = (index: number, columns = 3, step = 90) =>
  ({ "--reveal-delay": `${(index % columns) * step}ms` }) as CSSProperties;
