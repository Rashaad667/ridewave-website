import { getSiteUrl, siteConfig } from "@/config/site";

/**
 * Structured data containing only confirmed facts: the business name, what
 * it does and where it operates, plus contact details once they are set in
 * the site configuration. No address, ratings, prices or hours are invented.
 */
export function JsonLd() {
  const url = getSiteUrl();
  const { phone, email } = siteConfig.contact;

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    areaServed: { "@type": "Country", name: siteConfig.market },
    ...(url && { url: url.href, logo: new URL(siteConfig.logo.src, url).href }),
    ...(phone && { telephone: phone }),
    ...(email && { email }),
    ...(siteConfig.social.length > 0 && { sameAs: siteConfig.social.map((profile) => profile.href) }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
