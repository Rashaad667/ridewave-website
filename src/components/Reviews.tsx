import type { CSSProperties } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { MAX_REVIEWS, reviews, type Review } from "@/config/reviews";
import { whatsappHref } from "@/config/site";
import { container, revealDelay } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

function Stars({ rating }: { rating: Review["rating"] }) {
  return (
    <div role="img" aria-label={`Rated ${rating} out of 5`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          style={{ "--i": index } as CSSProperties}
          className={`review-star size-[1.15rem] ${
            index < rating ? "fill-gold text-gold" : "fill-transparent text-white/25"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const footer = [review.author, review.date].filter(Boolean).join(" · ");
  return (
    <li data-reveal style={revealDelay(index, 2, 120)} className="flex">
      <figure className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] p-7 transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] sm:p-9">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 right-5 font-display text-[9rem] leading-none font-bold text-white/[0.06] select-none"
        >
          &ldquo;
        </span>
        <Stars rating={review.rating} />
        {review.title && (
          <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.015em] sm:text-2xl">{review.title}</h3>
        )}
        <blockquote className={`flex-1 ${review.title ? "mt-3" : "mt-6"}`}>
          <p className="text-[1.0625rem] leading-relaxed text-pretty text-white/80 sm:text-lg">
            &ldquo;{review.quote}&rdquo;
          </p>
        </blockquote>
        {footer && <figcaption className="mt-6 text-sm font-medium text-white/55">{footer}</figcaption>}
      </figure>
    </li>
  );
}

export function Reviews() {
  const shown = reviews.slice(0, MAX_REVIEWS);
  if (shown.length === 0) return null;

  const share = whatsappHref("Hello RideWave Rentals, I'd like to share feedback about my rental:");

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="on-dark relative overflow-hidden bg-ink py-20 text-white sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px)] [background-size:96px_100%]"
      />
      <div className={`${container} relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="reviews-title" eyebrow="Reviews" title="What Our Customers Say" tone="dark">
            <p>Feedback shared with us by RideWave Rentals customers, in their own words.</p>
          </SectionHeading>
          {share && (
            <p data-reveal style={revealDelay(1, 3, 120)} className="mt-8 text-white/60">
              Been on a journey with us?{" "}
              <a
                href={share}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                Share your experience
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only">(opens WhatsApp)</span>
              </a>
            </p>
          )}
        </div>
        <ul className={`grid gap-5 ${shown.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
          {shown.map((review, index) => (
            <ReviewCard key={`${review.title}-${review.quote}`} review={review} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
