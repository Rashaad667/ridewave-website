import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { button, container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

type Method = { icon: LucideIcon; label: string; value: string; href?: string; external?: boolean };

export function contactMethods(): Method[] {
  const { phone, email, serviceArea, hours, whatsappDisplay } = siteConfig.contact;
  const whatsapp = whatsappHref("Hello RideWave Rentals, I would like to enquire about a rental.");
  const methods: Method[] = [];
  if (whatsapp)
    methods.push({
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsappDisplay ?? "Message us on WhatsApp",
      href: whatsapp,
      external: true,
    });
  if (phone) methods.push({ icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` });
  if (email) methods.push({ icon: Mail, label: "Email", value: email, href: `mailto:${email}` });
  if (serviceArea) methods.push({ icon: MapPin, label: "Location", value: serviceArea });
  if (hours) methods.push({ icon: Clock, label: "Hours", value: hours });
  return methods;
}

export function ContactSection() {
  const methods = contactMethods();

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20`}>
        <SectionHeading id="contact-title" eyebrow="Contact RideWave" title="Let’s Talk About Your Rental Needs.">
          <p>
            Have a question before you enquire, or want to talk through your plans? Get in touch and we&rsquo;ll help
            you work out what you need.
          </p>
        </SectionHeading>

        {methods.length > 0 ? (
          <ul className={`grid gap-4 ${methods.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {methods.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-ink text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="mt-4 block text-sm font-medium text-muted">{label}</span>
                  <span className="mt-1 block font-semibold break-words text-ink">{value}</span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="block h-full rounded-2xl border border-line bg-white p-6 transition-colors hover:border-ink/30"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="h-full rounded-2xl border border-line bg-white p-6">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-ink/25 bg-mist p-8">
            <p className="font-display text-lg font-bold">Contact details coming soon</p>
            <p className="mt-2 leading-relaxed text-muted">
              Our phone, WhatsApp and email details are being finalised and will be published here. In the meantime, you
              can prepare your enquiry using the form above.
            </p>
            <a href="#enquire" className={`${button.secondary} mt-6`}>
              Go to the enquiry form
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
