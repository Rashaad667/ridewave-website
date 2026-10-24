import { Plus } from "lucide-react";
import { container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

export const faqs = [
  {
    question: "How do I enquire about a rental?",
    answer:
      "Fill in the enquiry form on this page with your dates, preferred vehicle category and pickup area. RideWave Rentals will review your enquiry and get in touch to discuss options.",
  },
  {
    question: "What information should I provide?",
    answer:
      "Your name, a contact phone number, your intended rental start and return dates, the type of vehicle you prefer and your pickup location or area. Anything else that helps, such as the number of passengers or the purpose of your trip, can go in the additional requirements box.",
  },
  {
    question: "Can I request a particular vehicle?",
    answer:
      "Yes. You can mention a preferred make or model in your enquiry. Whether a particular vehicle can be arranged depends on availability, which RideWave Rentals will confirm with you.",
  },
  {
    question: "How do I confirm availability and pricing?",
    answer:
      "Availability and pricing are confirmed directly with RideWave Rentals after you enquire. This website does not show live availability or prices.",
  },
  {
    question: "When is my reservation confirmed?",
    answer:
      "Only once RideWave Rentals has confirmed the rental dates, price, availability, required documents and terms with you. Sending an enquiry through this website does not by itself reserve a vehicle.",
  },
  {
    question: "How can I contact RideWave Rentals?",
    answer:
      "Use the enquiry form on this page, or the contact options in the Contact section. Rental conditions and documentation requirements can be discussed with RideWave Rentals directly.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-line bg-mist py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently Asked Questions.">
          <p>Quick answers about how enquiries work. For anything else, please get in touch.</p>
        </SectionHeading>

        <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-semibold text-ink transition-colors hover:bg-mist/60 sm:px-7">
                <span className="text-base sm:text-[1.05rem]">{faq.question}</span>
                <Plus aria-hidden className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-muted sm:px-7">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
