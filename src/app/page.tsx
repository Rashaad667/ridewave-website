import { ContactSection } from "@/components/ContactSection";
import { EnquirySection } from "@/components/EnquirySection";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { RevealObserver } from "@/components/RevealObserver";
import { VehicleCategories } from "@/components/VehicleCategories";
import { WhyRideWave } from "@/components/WhyRideWave";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <JsonLd />
      <Header logo={<Logo height={56} priority />} />
      <main id="main">
        <Hero />
        <VehicleCategories />
        <WhyRideWave />
        <HowItWorks />
        <EnquirySection />
        <ContactSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
      <RevealObserver />
    </>
  );
}
