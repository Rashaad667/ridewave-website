/**
 * RideWave Rentals business configuration.
 *
 * This is the single place for business facts shown on the website.
 * Only enter information the business has confirmed. Anything left as
 * `null` (or an empty list) is hidden on the page rather than guessed.
 *
 * See README.md › "Before launch" for the full checklist.
 */

export type SocialLink = {
  /** Display name, e.g. "Facebook". */
  label: string;
  /** Full profile URL, e.g. "https://www.facebook.com/…". */
  href: string;
};

export type SiteConfig = {
  name: string;
  shortDescription: string;
  /** Country / market served. Used in copy, metadata and structured data. */
  market: string;
  logo: {
    /** Original logo, cropped only. Path under /public. */
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  /**
   * Licensed hero photograph, e.g. a hatchback or SUV on a Sri Lankan road:
   * { src: "/hero/ridewave-hero.jpg", alt: "…" }. Null shows a labelled placeholder.
   */
  heroImage: { src: string; alt: string } | null;
  contact: {
    /**
     * Confirmed public phone number in international format,
     * e.g. "+94 77 123 4567". Leave null until confirmed.
     */
    phone: string | null;
    /**
     * Confirmed WhatsApp business number, digits only in international
     * format without "+", e.g. "94771234567". Leave null until confirmed.
     * When set, the enquiry form offers a WhatsApp handoff.
     */
    whatsapp: string | null;
    /** How the WhatsApp number is shown on the page, e.g. "+94 71 095 0688". */
    whatsappDisplay: string | null;
    /** Confirmed public email address. Leave null until confirmed. */
    email: string | null;
    /** Confirmed service area or address text. Leave null until confirmed. */
    serviceArea: string | null;
    /** Confirmed opening hours text, e.g. "Mon–Sat, 8.00am–6.00pm". */
    hours: string | null;
  };
  /** Only real, published profile URLs. */
  social: SocialLink[];
  /**
   * Path of a genuine, published privacy policy page (e.g. "/privacy").
   * Leave null until one has been prepared — no link is shown otherwise.
   */
  privacyPolicyHref: string | null;
};

export const siteConfig: SiteConfig = {
  name: "RideWave Rentals",
  shortDescription:
    "RideWave Rentals is a vehicle rental business in Sri Lanka. Send us your rental requirements and we will discuss suitable options with you.",
  market: "Sri Lanka",
  logo: {
    src: "/brand/ridewave-logo-transparent.png",
    width: 916,
    height: 722,
    alt: "RideWave Rentals",
  },
  heroImage: null, // TODO(before launch): licensed hero photo
  contact: {
    phone: null, // TODO(before launch): confirmed phone number
    whatsapp: "94710950688", // Confirmed by RideWave (071 0950 688), 24 Oct 2026
    whatsappDisplay: "+94 71 095 0688",
    email: null, // TODO(before launch): confirmed email address
    serviceArea: null, // TODO(optional): confirmed address or service area
    hours: null, // TODO(optional): confirmed opening hours
  },
  social: [
    // TODO(optional): add real profiles only, e.g.
    // { label: "Facebook", href: "https://www.facebook.com/your-page" },
  ],
  privacyPolicyHref: null,
};

/**
 * Final site URL, e.g. "https://www.ridewaverentals.lk".
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment once the domain is
 * registered and connected. Until then canonical URLs and the sitemap are
 * left out rather than pointing at a domain that may not exist.
 */
export function getSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

/** Builds a WhatsApp "click to chat" link. Returns null when no number is configured. */
export function whatsappHref(message?: string): string | null {
  const number = siteConfig.contact.whatsapp?.replace(/\D/g, "");
  if (!number) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#vehicles", label: "Explore Vehicles" },
  { href: "#why-ridewave", label: "Why RideWave" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;
