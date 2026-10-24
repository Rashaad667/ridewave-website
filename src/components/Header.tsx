"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow ${
        scrolled || open ? "border-line shadow-[0_1px_12px_rgba(0,0,0,0.05)]" : "border-transparent"
      }`}
    >
      <div className={`${container} flex h-[4.5rem] items-center justify-between gap-6`}>
        <a href="#home" className="shrink-0" onClick={close} aria-label="RideWave Rentals — back to top">
          {logo}
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#enquire"
            className="hidden min-h-11 items-center justify-center rounded-lg bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft sm:inline-flex"
          >
            Enquire Now
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" aria-label="Mobile" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <ul className={`${container} flex flex-col py-3`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="flex min-h-12 items-center border-b border-line/70 text-base font-medium text-ink"
              >
                {link.label}
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
    </header>
  );
}
