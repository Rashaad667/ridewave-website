"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __rwReveal?: boolean;
  }
}

/** Adds `is-visible` to every [data-reveal] element as it scrolls into view. */
export function RevealObserver() {
  useEffect(() => {
    window.__rwReveal = true;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
