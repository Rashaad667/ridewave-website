import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { getSiteUrl, siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const title = "RideWave Rentals | Vehicle Rental Enquiries in Sri Lanka";
const description =
  "RideWave Rentals is a vehicle rental business in Sri Lanka. Explore car, SUV and van rental options and send an enquiry with your dates and requirements.";

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: siteUrl, alternates: { canonical: "/" } }),
  title,
  description,
  applicationName: siteConfig.name,
  keywords: ["RideWave Rentals", "vehicle rental Sri Lanka", "car rental Sri Lanka", "vehicle rental enquiry"],
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: siteConfig.name,
    title,
    description,
    ...(siteUrl && { url: "/" }),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
