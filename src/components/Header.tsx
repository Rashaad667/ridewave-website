"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { navLinks } from "@/config/site";
import { button, container } from "@/lib/ui";

export function Header({ logo }: { logo: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow] duration-300 ${
        scrolled || open ? "border-line shadow-[0_1px_16px_rgba(0,0,0,0.06)]" : "border-transparent"
      }`}
    >
      <div className={`${container} flex h-[4.5rem] items-center justify-between gap-6`}>
        <a
          href="#home"
          className="shrink-0 transition-opacity hover:opacity-80"
          onClick={close}
          aria-label="RideWave Rentals — back to top"
        >
          {logo}
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative rounded-md px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#enquire"
            className="hidden min-h-11 items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:bg-ink-soft hover:shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)] active:scale-[0.98] sm:inline-flex"
          >
            Enquire Now
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink transition-[background-color,border-color,transform] duration-200 hover:border-ink/30 active:scale-95 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {/* Three lines that fold into a cross. */}
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-[top,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-[6px] left-0 h-[1.5px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-[top,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "top-[6px] -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Dimmed backdrop under the open menu; tapping it closes the menu. */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-x-0 top-[4.5rem] bottom-0 bg-ink/25 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Overlay panel (doesn't push the page down), animating its height with
          grid rows; inert while closed. */}
      <div
        className={`absolute inset-x-0 top-full grid bg-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.3)] transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <nav id="mobile-menu" aria-label="Mobile" inert={!open} className="overflow-hidden">
          <ul className={`${container} flex flex-col border-t border-line py-3`}>
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                style={{ "--i": index } as CSSProperties}
                className={`transition-[opacity,transform] duration-300 ease-out [transition-delay:calc(var(--i)*35ms)] ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
              >
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-12 items-center justify-between border-b border-line/70 text-base font-medium text-ink active:opacity-60"
                >
                  {link.label}
                  <span aria-hidden className="text-ink/30">
                    →
                  </span>
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a href="#enquire" onClick={close} className={`${button.primary} w-full`}>
                Enquire Now
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
