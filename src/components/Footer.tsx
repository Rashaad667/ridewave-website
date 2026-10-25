import { navLinks, siteConfig } from "@/config/site";
import { container } from "@/lib/ui";
import { contactMethods } from "./ContactSection";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

const buildYear = Number(process.env.NEXT_PUBLIC_BUILD_YEAR);

export function Footer() {
  const contacts = contactMethods().filter((method) => method.href);

  return (
    <footer id="site-footer" className="border-t border-line bg-white pb-12">
      <div className={`${container} grid gap-12 pt-16 md:grid-cols-[1.4fr_1fr_1fr]`}>
        <div className="max-w-sm">
          <Logo height={72} />
          <p className="mt-5 leading-relaxed text-muted">{siteConfig.shortDescription}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-ink uppercase">Explore</h2>
          <ul className="mt-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-[0.12em] text-ink uppercase">Get in touch</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a
                href="#enquire"
                className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-ink"
              >
                Send an enquiry
              </a>
            </li>
            {contacts.map((method) => (
              <li key={method.label}>
                <a
                  href={method.href}
                  {...(method.external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex min-h-10 items-center break-all text-muted transition-colors hover:text-ink"
                >
                  {method.label === "WhatsApp" ? `WhatsApp ${method.value}` : method.value}
                </a>
              </li>
            ))}
            {siteConfig.social.map((profile) => (
              <li key={profile.href}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center text-muted transition-colors hover:text-ink"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${container} mt-14`}>
        <div className="flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CurrentYear fallback={buildYear} /> {siteConfig.name}. All rights reserved.
          </p>
          {siteConfig.privacyPolicyHref && (
            <a href={siteConfig.privacyPolicyHref} className="transition-colors hover:text-ink">
              Privacy policy
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
