# RideWave Rentals website

Single-page landing website for **RideWave Rentals**, a vehicle rental business in Sri Lanka. Its job is to turn visitors into genuine rental enquiries. It does not show live availability or prices and it does not take bookings: an enquiry is a request to discuss, not a reservation.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and `lucide-react` icons. The page is prerendered as static HTML.

## Prerequisites

- Node.js 20.9 or newer (built and tested with Node 22)
- npm

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To run the production build locally:

```bash
npm run build
npm start
```

## Checks

```bash
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript
npm run build       # production build
```

## Where things live

| What | File |
| --- | --- |
| Business facts (contact, logo, hero photo, social links, privacy link) | `src/config/site.ts` |
| Vehicle categories and their photos | `src/config/vehicles.ts` |
| FAQ questions and answers | `src/components/Faq.tsx` |
| Enquiry form (browser) | `src/components/EnquiryForm.tsx` |
| Enquiry validation and WhatsApp message text | `src/lib/enquiry.ts` |
| Enquiry webhook (server) | `src/app/actions.ts` |
| Page title, description, social metadata | `src/app/layout.tsx` |
| Social sharing image | `src/app/opengraph-image.tsx` |
| Sitemap and robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Structured data (schema.org) | `src/components/JsonLd.tsx` |
| Colours and fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Logo files | `public/brand/`, originals in `brand-source/` |

Every section is its own component in `src/components/`.

### Logo

`brand-source/` holds the two logo files supplied by the business, untouched. The site uses the square copy because it is slightly sharper. It was only cropped to remove the outer white margin and the grey line along the top edge. `ridewave-logo-transparent.png` is the same crop with the white background made transparent; nothing in the artwork was redrawn or changed. The favicon is the emblem from the same file.

A vector (SVG) or high-resolution PNG export of the logo would look sharper than these phone screenshots. To use one, replace the files in `public/brand/` and update `logo.width` and `logo.height` in `src/config/site.ts`.

## Before launch: what the business needs to supply

Anything not confirmed is left out of the page rather than guessed.

**Confirmed so far**

- WhatsApp: 071 0950 688 (`+94 71 095 0688`), set in `src/config/site.ts`
- Official logo

**Still needed**

1. **Vehicle photos.** No licensed photos were available during the build, so every vehicle image is a clearly labelled "Photo placeholder" outline. Add your own photos, or properly licensed stock photos, to `public/vehicles/` and `public/hero/`, then set `image` for each category in `src/config/vehicles.ts` and `heroImage` in `src/config/site.ts`. Use realistic vehicles you actually rent out, with no visible number plates, and use landscape images at least 1600 px wide.
2. **Fleet list.** Edit `src/config/vehicles.ts` so the categories match what you really offer.
3. **Phone number and email** (optional), in `contact` in `src/config/site.ts`. Only fill in `phone` if the number takes calls.
4. **Service area or address and opening hours** (optional), in the same place.
5. **Social media profile URLs** (optional), in `social`.
6. **Domain.** Once registered, set `NEXT_PUBLIC_SITE_URL`, for example `https://www.your-domain.lk`. This turns on canonical URLs, absolute social-sharing links and the sitemap.
7. **Privacy policy.** The form collects names and phone numbers. If a privacy policy is prepared, publish it and set `privacyPolicyHref`. No link is shown until then.

## How enquiries are delivered

The form validates every field in the browser: required fields, phone and email format, a start date that isn't in the past, and a return date that isn't before the start date. Errors are shown as text next to each field and in a summary at the top of the form. Delivery then works in one of three ways:

1. **WhatsApp handoff (active now).** The site opens WhatsApp with the enquiry written out for the configured number. **The customer still has to press Send in WhatsApp**, and the page says so. The site never says an enquiry was received.
2. **Webhook (optional).** If `ENQUIRY_WEBHOOK_URL` is set to an HTTPS endpoint, the form sends the enquiry to it as JSON through a server action. Suitable endpoints include a Make or Zapier webhook that emails you, Formspree, or your own API. The page reports success only when the endpoint replies with a 2xx status. WhatsApp is then offered as a second option. Optionally set `ENQUIRY_WEBHOOK_SECRET`; it is sent as `Authorization: Bearer …`.
3. **Neither configured.** The form checks the details, then tells the visitor plainly that online enquiries are not connected yet. It never shows a false success message.

Webhook payload:

```json
{
  "source": "ridewave-website",
  "submittedAt": "2026-10-24T10:00:00.000Z",
  "enquiry": { "fullName": "…", "phone": "…", "email": "", "category": "suv", "makeModel": "", "startDate": "2026-11-02", "returnDate": "2026-11-05", "pickup": "Colombo", "notes": "" },
  "message": "Hello RideWave Rentals, … (plain-text summary)"
}
```

### Spam and abuse protection

- A hidden honeypot field and a minimum time to fill in the form (webhook mode).
- Server-side sanitising and validation that repeat the browser checks, with length limits.
- A best-effort rate limit of 5 enquiries per IP address every 10 minutes. It works per server instance only.
- Duplicate protection: the submit button is disabled while sending, and an identical enquiry can't be sent twice.

### Production hardening

Before relying on the webhook, also:

- turn on your host's firewall or rate limiting (for example, the Vercel Firewall) or use a shared rate-limit store such as Upstash, because serverless platforms run many instances;
- add a CAPTCHA, such as Cloudflare Turnstile, if spam gets through;
- make sure whatever receives the enquiries stores and handles personal data responsibly.

The site never asks for passport, identity document or payment card details.

## Environment variables

Copy `.env.example` to `.env.local` for local development, and add the same variables in your hosting provider's settings. `.env*` files are git-ignored, except the example.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | When the domain is live | Canonical URL, social image URLs, sitemap |
| `ENQUIRY_WEBHOOK_URL` | Optional | HTTPS endpoint that receives enquiries (server-only) |
| `ENQUIRY_WEBHOOK_SECRET` | Optional | Bearer token sent to the webhook (server-only) |

## Deploying

Nothing has been deployed yet.

### Netlify (free plan allows business sites)

1. Sign in at https://app.netlify.com with GitHub.
2. Choose **Add new site → Import an existing project → GitHub**, then pick this repository.
3. Keep the detected Next.js settings (build command `npm run build`) and deploy.
4. Add any environment variables above under **Site configuration → Environment variables**, then redeploy.
5. Open the `*.netlify.app` link on a phone and check the menu, vehicle cards, enquiry form and WhatsApp handoff.

### Vercel

Import the repository at https://vercel.com/new and keep the detected settings. Vercel's free Hobby plan is for non-commercial use, so a business site needs the Pro plan.

Any other Node.js host also works: run `npm run build`, then `npm start`.

### Connecting a domain

1. Register the domain, for example a `.lk` domain through the LK Domain Registry or a reseller.
2. In your host (Netlify: **Domain management**; Vercel: **Settings → Domains**), add the domain.
3. At your registrar, add the DNS records your host shows you.
4. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` address and redeploy.
5. Submit `https://your-domain/sitemap.xml` in Google Search Console.

## Content rules

The copy deliberately avoids prices, discounts, fleet size, availability, reviews, awards, insurance, mileage, fuel, delivery, cancellation or payment terms, and guarantees. Keep any of these off the site until the business has confirmed them.
