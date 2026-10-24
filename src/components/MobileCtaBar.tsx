import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";
import { button } from "@/lib/ui";

/** Fixed bottom call to action on phones, where most visitors arrive from WhatsApp or social media. */
export function MobileCtaBar() {
  const whatsapp = whatsappHref("Hello RideWave Rentals, I would like to enquire about a rental.");
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
      <div className="flex gap-3">
        <a href="#enquire" className={`${button.primary} flex-1`}>
          Enquire Now
        </a>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${button.secondary} px-4`}
            aria-label="Message RideWave Rentals on WhatsApp"
          >
            <MessageCircle aria-hidden className="size-5" />
          </a>
        )}
      </div>
    </div>
  );
}
