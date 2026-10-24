"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappHref } from "@/config/site";
import { button } from "@/lib/ui";

/** Sections where the bar would only repeat what is already on screen (home or vehicle page). */
const HIDE_OVER = ["#home", "#vehicle-overview", "#enquire", "#site-footer"];

/**
 * Fixed bottom call to action on phones, where most visitors arrive from
 * WhatsApp or social media. It slides away over the hero, the enquiry form
 * and the footer so it never covers the form or competes with those buttons.
 */
export function MobileCtaBar() {
  const whatsapp = whatsappHref("Hello RideWave Rentals, I would like to enquire about a rental.");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = HIDE_OVER.map((selector) => document.querySelector(selector)).filter(
      (element): element is Element => element !== null,
    );
    if (!("IntersectionObserver" in window) || targets.length === 0) {
      // Older browsers: just show the bar.
      queueMicrotask(() => setVisible(true));
      return;
    }
    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setVisible(intersecting.size === 0);
      },
      // Treat the hero as "in view" until its buttons have scrolled away.
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.25)] backdrop-blur transition-[transform,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="flex gap-3">
        <a href="#enquire" className={`${button.primary} flex-1`}>
          Enquire Now
        </a>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg border border-ink/15 bg-white text-ink transition-[background-color,transform] duration-200 active:scale-95"
            aria-label="Message RideWave Rentals on WhatsApp"
          >
            <MessageCircle aria-hidden className="size-5" />
          </a>
        )}
      </div>
    </div>
  );
}
