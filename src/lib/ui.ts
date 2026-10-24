/** Shared button styles so every call to action looks consistent. */

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-[0.95rem] font-semibold tracking-[-0.005em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export const button = {
  primary: `${base} bg-ink text-white hover:bg-ink-soft`,
  secondary: `${base} border border-ink/15 bg-white text-ink hover:border-ink/40 hover:bg-mist`,
  /** For use on black backgrounds. */
  inverse: `${base} bg-white text-ink hover:bg-white/85`,
  /** Outline button for use on black backgrounds. */
  inverseOutline: `${base} border border-white/30 text-white hover:border-white/70 hover:bg-white/5`,
};

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";
