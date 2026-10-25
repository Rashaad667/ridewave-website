import { CalendarRange, CarFront, MessageSquareText, Route } from "lucide-react";
import { container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

const points = [
  {
    icon: MessageSquareText,
    title: "Discuss your requirements",
    text: "Tell us what you need the vehicle for, so the conversation starts with your plans rather than a generic list.",
  },
  {
    icon: CalendarRange,
    title: "Share your rental period",
    text: "Let us know when you need the vehicle and when you expect to return it, so we can check what can be arranged.",
  },
  {
    icon: Route,
    title: "Explain your travel needs",
    text: "City driving, travel between towns, passengers or luggage: the details help us suggest a suitable type of vehicle.",
  },
  {
    icon: CarFront,
    title: "Enquire about suitable options",
    text: "Ask about a particular category, make or model. We'll come back to you with the options we can discuss.",
  },
];

export function WhyRideWave() {
  return (
    <section id="why-ridewave" aria-labelledby="why-title" className="border-y border-line bg-mist py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="why-title" eyebrow="Why RideWave" title="A More Thoughtful Way to Find Your Ride.">
            <p>
              Choosing a rental vehicle should start with a conversation about your journey. Share a few details and
              we&rsquo;ll help you look at options that make sense for you.
            </p>
          </SectionHeading>
        </div>
        <ul data-reveal className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} className="group bg-white p-7 transition-colors duration-300 hover:bg-[#fcfcfb] sm:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:rotate-[-4deg]">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
