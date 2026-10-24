"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { VehiclePhoto } from "@/config/fleet";

/**
 * Photo gallery for a vehicle details page. The main viewer is a native
 * scroll-snap strip, so it swipes naturally on phones; thumbnails, arrow
 * buttons and the keyboard's arrow keys move between photos too.
 */
export function VehicleGallery({ photos, name }: { photos: VehiclePhoto[]; name: string }) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const count = photos.length;

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = Math.round(element.scrollLeft / Math.max(element.clientWidth, 1));
        setActive(Math.min(Math.max(index, 0), count - 1));
      });
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  const goTo = (index: number) => {
    const element = track.current;
    if (!element) return;
    const next = Math.min(Math.max(index, 0), count - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: next * element.clientWidth, behavior: reduce ? "auto" : "smooth" });
    setActive(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };

  if (count === 0) return null;

  const arrow =
    "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] ring-1 ring-black/5 backdrop-blur-sm transition-[opacity,transform,background-color] duration-300 hover:bg-white active:scale-95 disabled:pointer-events-none disabled:opacity-0";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={`Photos of the ${name}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-mist ring-1 ring-line">
        <div
          ref={track}
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="group"
          aria-label="Photo viewer. Swipe, or use the left and right arrow keys, to change photo."
          className="flex aspect-[16/10] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus-visible:outline-offset-[-4px] [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="relative w-full shrink-0 snap-center snap-always"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous photo"
              className={`${arrow} left-3 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100`}
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === count - 1}
              aria-label="Next photo"
              className={`${arrow} right-3 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100`}
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
            <p
              aria-live="polite"
              className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-ink/75 px-2 py-1 text-xs font-semibold text-white tabular-nums backdrop-blur-sm"
            >
              <span className="sr-only">Photo </span>
              {active + 1} / {count}
            </p>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="mt-3 grid grid-cols-3 gap-3" aria-label="Choose a photo">
          {photos.map((photo, index) => (
            <li key={photo.src}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show photo ${index + 1}: ${photo.alt}`}
                aria-current={index === active ? "true" : undefined}
                className={`relative block aspect-[16/10] w-full overflow-hidden rounded-xl ring-offset-2 transition-[box-shadow,opacity,transform] duration-300 active:scale-[0.97] ${
                  index === active ? "opacity-100 ring-2 ring-ink" : "opacity-60 ring-1 ring-line hover:opacity-100"
                }`}
              >
                <Image src={photo.thumb} alt="" fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
