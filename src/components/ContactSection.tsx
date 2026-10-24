import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { button, container, revealDelay } from "@/lib/ui";
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
          <ul
            data-reveal
            style={revealDelay(1, 3, 120)}
            className={`grid gap-4 ${methods.length > 1 ? "sm:grid-cols-2" : ""}`}
          >
            {methods.map(({ icon: Icon, label, value, href, external }) => {
              const content = (
                <>
                  <span className="inline-flex size-11 items-center justify-center rounded-lg bg-ink text-white">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="mt-4 block text-sm font-medium text-muted">{label}</span>
                  <span className="mt-1 block font-display text-xl font-bold tracking-[-0.01em] break-words text-ink">
                    {value}
                  </span>
                  {external && <span className="mt-1 block text-sm text-muted">Opens WhatsApp</span>}
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="group relative block h-full rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] active:scale-[0.99] sm:p-7"
                    >
                      <ArrowUpRight
                        aria-hidden
                        className="absolute top-6 right-6 size-5 text-ink/40 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      />
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
