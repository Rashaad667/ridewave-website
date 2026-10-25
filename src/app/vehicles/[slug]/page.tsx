import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Car,
  CarFront,
  ChevronRight,
  Cog,
  DoorOpen,
  Factory,
  Fuel,
  Gauge,
  Luggage,
  MessageCircle,
  Palette,
  Snowflake,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";
import { EnquirySection } from "@/components/EnquirySection";
import { FleetCard } from "@/components/FleetCard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { RevealObserver } from "@/components/RevealObserver";
import { VehicleGallery } from "@/components/VehicleGallery";
import {
  SPEC_LABELS,
  findVehicle,
  fleet,
  vehicleHref,
  vehicleLabel,
  vehicleName,
  type VehicleSpecs,
} from "@/config/fleet";
import { getSiteUrl, siteConfig, whatsappHref } from "@/config/site";
import { arrowNudge, button, container, revealDelay } from "@/lib/ui";

// Static export: one page per fleet vehicle, nothing else.
export const dynamicParams = false;

export function generateStaticParams() {
  return fleet.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }: PageProps<"/vehicles/[slug]">): Promise<Metadata> {
  const vehicle = findVehicle((await params).slug);
  if (!vehicle) return {};
  const title = `${vehicleName(vehicle)} ${vehicle.year} (${vehicle.transmission}) | ${siteConfig.name}`;
  const description = `Photos and details of the ${vehicleLabel(vehicle)} from ${siteConfig.name} in Sri Lanka. Send an enquiry with your dates.`;
  const image = vehicle.photos[0];
  const siteUrl = getSiteUrl();
  return {
    title,
    description,
    // Absolute URLs (canonical, share image) need the public domain, so they wait for NEXT_PUBLIC_SITE_URL.
    ...(siteUrl && {
      metadataBase: siteUrl,
      alternates: { canonical: vehicleHref(vehicle) },
    }),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      ...(siteUrl && { url: vehicleHref(vehicle) }),
      ...(siteUrl &&
        image && {
          images: [{ url: image.src, width: 1376, height: 768, alt: image.alt }],
        }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const SPEC_ICONS: Record<keyof VehicleSpecs, LucideIcon> = {
  seats: Users,
  fuel: Fuel,
  engine: Gauge,
  luggage: Luggage,
  airConditioning: Snowflake,
  doors: DoorOpen,
};

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

export default async function VehiclePage({ params }: PageProps<"/vehicles/[slug]">) {
  const vehicle = findVehicle((await params).slug);
  if (!vehicle) notFound();

  const name = vehicleName(vehicle);
  const whatsapp = whatsappHref(`Hello RideWave Rentals, I'd like to ask about the ${vehicleLabel(vehicle)}.`);
  const others = fleet.filter((other) => other.slug !== vehicle.slug);

  const specKeys = Object.keys(SPEC_LABELS) as (keyof VehicleSpecs)[];
  const spec = (key: keyof VehicleSpecs) =>
    vehicle.specs[key]
      ? [
          {
            icon: SPEC_ICONS[key],
            label: SPEC_LABELS[key],
            value: vehicle.specs[key] as string,
          },
        ]
      : [];

  // Headline facts beside the gallery; specs appear only once confirmed.
  const facts = [
    { icon: CalendarDays, label: "Model year", value: String(vehicle.year) },
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
    ...spec("seats").map((item) => ({ ...item, label: "Seats" })),
    ...spec("fuel"),
    ...spec("engine").map((item) => ({ ...item, label: "Engine" })),
    ...spec("luggage").map((item) => ({ ...item, label: "Luggage" })),
  ];
  if (facts.length < 4) {
    facts.push(
      { icon: Palette, label: "Colour", value: vehicle.colour },
      { icon: CarFront, label: "Body type", value: vehicle.bodyType },
    );
  }

  const confirmed: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Factory, label: "Make", value: vehicle.make },
    { icon: Car, label: "Model", value: vehicle.model },
    ...(vehicle.variant ? [{ icon: Tag, label: "Variant", value: vehicle.variant }] : []),
    { icon: CalendarDays, label: "Model year", value: String(vehicle.year) },
    { icon: CarFront, label: "Body type", value: vehicle.bodyType },
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
    { icon: Palette, label: "Colour", value: vehicle.colour },
    ...specKeys.flatMap(spec),
  ];
  const pending = specKeys
    .filter((key) => !vehicle.specs[key])
    .map((key) => ({ icon: SPEC_ICONS[key], label: SPEC_LABELS[key] }));

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header logo={<Logo height={56} priority />} />
      <main id="main">
        <section id="vehicle-overview" aria-labelledby="vehicle-title" className="pt-6 pb-16 sm:pt-8 sm:pb-24">
          <div className={container}>
            <nav aria-label="Breadcrumb" className="motion-rise flex flex-wrap items-center justify-between gap-3">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                <li>
                  <Link href="/" className="rounded transition-colors hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li>
                  <Link href="/#vehicles" className="rounded transition-colors hover:text-ink">
                    Vehicles
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5" />
                </li>
                <li aria-current="page" className="font-medium text-ink">
                  {name}
                </li>
              </ol>
              <Link
                href="/#vehicles"
                className="group inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-ink transition-opacity active:opacity-60"
              >
                <ArrowLeft
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
                />
                Back to vehicles
              </Link>
            </nav>

            <div className="mt-4 grid gap-10 lg:mt-6 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
              <div style={delay(80)} className="motion-settle">
                <VehicleGallery photos={vehicle.photos} name={name} />
              </div>

              <div className="lg:pt-2">
                <p
                  style={delay(120)}
                  className="motion-rise flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase"
                >
                  <span aria-hidden className="h-px w-6 bg-ink/40" />
                  {vehicle.bodyType}
                </p>
                <h1
                  id="vehicle-title"
                  style={delay(180)}
                  className="motion-rise mt-3 font-display text-4xl leading-[1.05] font-bold tracking-[-0.03em] sm:text-5xl"
                >
                  {name}
                  {vehicle.variant && <span className="text-ink/45"> {vehicle.variant}</span>}
                </h1>
                <p style={delay(240)} className="motion-rise mt-3 text-lg text-muted">
                  {vehicle.year} · {vehicle.transmission} · {vehicle.colour}
                </p>

                <dl
                  style={delay(300)}
                  className="motion-rise mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3"
                >
                  {facts.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-line bg-white p-4 transition-colors duration-300 hover:border-ink/25"
                    >
                      <dt className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted uppercase">
                        <Icon aria-hidden className="size-4 text-ink" />
                        {label}
                      </dt>
                      <dd className="mt-1.5 font-display text-lg font-bold tracking-[-0.01em]">{value}</dd>
                    </div>
                  ))}
                </dl>

                <p style={delay(360)} className="motion-rise mt-6 text-sm leading-relaxed text-muted">
                  {vehicle.rate ? (
                    <>
                      <strong className="font-semibold text-ink">Rate:</strong> {vehicle.rate}
                    </>
                  ) : (
                    "Rates, availability and rental terms are discussed with you directly when you enquire."
                  )}
                </p>

                <div
                  style={delay(420)}
                  className="motion-rise mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
                >
                  <a href="#enquire" className={`${button.primary} flex-1`}>
                    Enquire About This Vehicle
                    <ArrowRight aria-hidden className={arrowNudge} />
                  </a>
                  {whatsapp && (
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={button.secondary}>
                      <MessageCircle aria-hidden className="size-4" />
                      Ask on WhatsApp
                      <span className="sr-only">(opens WhatsApp)</span>
                    </a>
                  )}
                </div>
                <p style={delay(480)} className="motion-rise mt-4 text-sm leading-relaxed text-muted">
                  Sending an enquiry does not confirm a booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="specs-title" className="border-t border-line bg-mist py-16 sm:py-24">
          <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div data-reveal>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                <span aria-hidden className="h-px w-6 bg-ink/40" />
                Specifications
              </p>
              <h2
                id="specs-title"
                className="mt-3 font-display text-3xl leading-[1.1] font-bold tracking-[-0.025em] sm:text-4xl"
              >
                Vehicle Details
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                {pending.length > 0
                  ? "We only list details RideWave Rentals has confirmed for this vehicle. Anything else is marked as to be confirmed. Just ask about it in your enquiry."
                  : `Specifications for this ${vehicle.year} ${name}, as provided by RideWave Rentals. Ask us if there is anything else you would like to know.`}
              </p>
            </div>
            <div
              data-reveal
              style={revealDelay(1, 3, 120)}
              className="overflow-hidden rounded-2xl border border-line bg-white"
            >
              <dl className="divide-y divide-line">
                {confirmed.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-6 px-5 py-4 transition-colors duration-200 hover:bg-mist/60 sm:px-7"
                  >
                    <dt className="flex items-center gap-3 text-muted">
                      <Icon aria-hidden className="size-[1.1rem] shrink-0 text-ink/70" />
                      {label}
                    </dt>
                    <dd className="text-right font-semibold text-ink">{value}</dd>
                  </div>
                ))}
                {pending.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center justify-between gap-6 px-5 py-4 sm:px-7">
                    <dt className="flex items-center gap-3 text-muted">
                      <Icon aria-hidden className="size-[1.1rem] shrink-0 text-ink/40" />
                      {label}
                    </dt>
                    <dd className="text-right text-sm text-muted italic">To be confirmed</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <EnquirySection vehicle={vehicle} />

        {others.length > 0 && (
          <section aria-labelledby="more-title" className="border-t border-line py-16 sm:py-24">
            <div className={container}>
              <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
                <h2 id="more-title" className="font-display text-3xl font-bold tracking-[-0.025em]">
                  More Vehicles
                </h2>
                <Link
                  href="/#vehicles"
                  className="group inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline"
                >
                  See all vehicles
                  <ArrowRight aria-hidden className={arrowNudge} />
                </Link>
              </div>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((other, index) => (
                  <li key={other.slug} data-reveal style={revealDelay(index)} className="flex">
                    <FleetCard vehicle={other} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <MobileCtaBar />
      <RevealObserver />
    </>
  );
}
