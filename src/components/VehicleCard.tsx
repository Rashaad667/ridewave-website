import { ArrowRight } from "lucide-react";
import type { VehicleCategory } from "@/config/vehicles";
import { VehicleVisual } from "./VehicleVisual";

export function VehicleCard({ category }: { category: VehicleCategory }) {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-ink/25 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)]">
      <VehicleVisual
        bodyStyle={category.bodyStyle}
        image={category.image}
        label={`${category.name} (representative category)`}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="aspect-[16/10]"
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold tracking-[-0.015em]">{category.name}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted">{category.description}</p>
        <a
          href="#enquire"
          data-enquire-category={category.id}
          className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-[0.95rem] font-semibold text-ink underline-offset-4 hover:underline"
        >
          Enquire about {category.name}
          <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}
