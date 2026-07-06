import { ChevronDown } from "lucide-react";
import { paperCorners } from "@/components/site/brand/paperCorners";

/*
 * FAQ accessible et zéro-dépendance (élément natif <details>).
 * Seul le conteneur externe est chanfreiné (papier découpé) : les entrées
 * internes restent des séparateurs `divide-y` classiques, sans coin propre.
 */
export function Faq({
  items,
  cornerSeed = 500,
}: {
  items: { q: string; r: string }[];
  /** Graine du chanfrein « papier découpé » — à varier entre usages du composant. */
  cornerSeed?: number;
}) {
  const pc = paperCorners(cornerSeed, 16);
  return (
    <div style={pc.outer} className="bg-border">
      <div style={pc.inner} className="divide-y divide-border overflow-hidden bg-card">
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
    </div>
  );
}
