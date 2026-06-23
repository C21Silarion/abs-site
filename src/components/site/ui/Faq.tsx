import { ChevronDown } from "lucide-react";

/*
 * FAQ accessible et zéro-dépendance (élément natif <details>).
 */
export function Faq({ items }: { items: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold text-aubergine marker:content-['']">
            {item.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-lavande transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 pb-5 text-foreground/80">{item.r}</p>
        </details>
      ))}
    </div>
  );
}
