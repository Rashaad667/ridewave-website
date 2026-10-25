import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ id, eyebrow, title, children, align = "left", tone = "light" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div data-reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase ${
          dark ? "text-white/60" : "text-muted"
        }`}
      >
        <span aria-hidden className={`h-px w-6 ${dark ? "bg-white/40" : "bg-ink/40"}`} />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 font-display text-3xl leading-[1.1] font-bold tracking-[-0.025em] text-balance sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {children && (
        <div
          className={`mt-4 text-[1.0625rem] leading-relaxed text-pretty sm:text-lg ${dark ? "text-white/70" : "text-muted"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
