import { ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { FormToneContext, type FormTone } from "@/components/site/form/tone";
import {
  cornerSet,
  insetCorners,
  chamferPolygon,
  squareCorner,
} from "@/components/site/brand/paperCorners";

/** Étend `CSSProperties` pour poser les variables `--pc-clip-*` (cf. index.css). */
type PcSummaryStyle = CSSProperties & {
  "--pc-clip-closed"?: string;
  "--pc-clip-open"?: string;
};

/*
 * Repli sobre basé sur l'élément natif <details> (même principe que Faq) :
 * discret une fois replié, déplie son contenu en place. Zéro dépendance, suit
 * les tokens du site.
 *
 * - défaut    : carte claire avec titre + sous-titre.
 * - `tone="aubergine"` : carte aubergine, texte crème (formulaire mis en avant).
 *   La teinte est propagée aux primitives de formulaire via FormToneContext.
 * - `quiet`   : simple ligne-lien lavande (action secondaire/discrète, claire).
 *
 * Coins « papier découpé » (cf. paperCorners.ts) : `<details>` porte le
 * calque extérieur (couleur de bordure, 4 coins chanfreinés, fixe). Comme
 * `<summary>` doit rester enfant DIRECT de `<details>` pour garder le
 * comportement natif de bascule, résumé et contenu ne peuvent pas partager un
 * calque intérieur commun — chacun garde son propre clip-path partiel (coins
 * hauts pour le résumé, coins bas pour le contenu). Replié, le résumé EST
 * toute la carte visible : il bascule alors vers un chanfrein complet (4
 * coins) via les variables CSS `--pc-clip-open`/`--pc-clip-closed` posées ici
 * et lues par la règle `details[open] > .pc-summary` dans index.css (pas de
 * JS : la bascule suit l'attribut natif `open`).
 */
export function Disclosure({
  titre,
  hint,
  quiet = false,
  tone = "light",
  defaultOpen = false,
  cornerSeed = 1,
  children,
}: {
  titre: string;
  hint?: string;
  quiet?: boolean;
  tone?: FormTone;
  defaultOpen?: boolean;
  /** Graine du chanfrein « papier découpé » — à varier entre usages du même composant. */
  cornerSeed?: number;
  children: React.ReactNode;
}) {
  const size = quiet ? 10 : 16;
  const outerCorners = cornerSet(cornerSeed, size);
  const innerCorners = insetCorners(outerCorners, 1);
  const outerStyle: CSSProperties = { clipPath: chamferPolygon(outerCorners), borderRadius: 0, padding: 1 };
  const summaryStyle: PcSummaryStyle = {
    borderRadius: 0,
    "--pc-clip-closed": chamferPolygon(innerCorners),
    "--pc-clip-open": chamferPolygon({
      tl: innerCorners.tl,
      tr: innerCorners.tr,
      br: squareCorner,
      bl: squareCorner,
    }),
  };
  const contentStyle: CSSProperties = {
    borderRadius: 0,
    clipPath: chamferPolygon({
      tl: squareCorner,
      tr: squareCorner,
      br: innerCorners.br,
      bl: innerCorners.bl,
    }),
  };

  if (quiet) {
    return (
      <details className="group bg-lavande/40" style={outerStyle} open={defaultOpen}>
        <summary
          style={summaryStyle}
          className="pc-summary flex cursor-pointer list-none items-center justify-between gap-3 bg-peach/50 px-5 py-3.5 text-base font-semibold text-aubergine transition-colors marker:content-['']"
        >
          {titre}
          <ChevronDown className="h-5 w-5 shrink-0 text-lavande transition-transform group-open:rotate-180" />
        </summary>
        <div style={contentStyle} className="border-t border-lavande/25 bg-peach/50 px-5 py-6 sm:px-6">
          {children}
        </div>
      </details>
    );
  }

  const aubergine = tone === "aubergine";

  return (
    <details className={cn("group", aubergine ? "bg-aubergine" : "bg-border")} style={outerStyle} open={defaultOpen}>
      <summary
        style={summaryStyle}
        className={cn(
          "pc-summary flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-['']",
          aubergine ? "bg-aubergine" : "bg-card",
        )}
      >
        <span className="min-w-0">
          <span className={cn("block font-display text-xl", aubergine ? "text-creme" : "text-aubergine")}>{titre}</span>
          {hint && <span className={cn("mt-0.5 block text-sm", aubergine ? "text-creme/80" : "text-foreground/70")}>{hint}</span>}
        </span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform group-open:rotate-180", aubergine ? "text-creme/70" : "text-lavande")} />
      </summary>
      <div
        style={contentStyle}
        className={cn("border-t px-6 py-6 sm:px-8", aubergine ? "border-creme/15 bg-aubergine" : "border-border bg-card")}
      >
        <FormToneContext.Provider value={tone}>{children}</FormToneContext.Provider>
      </div>
    </details>
  );
}
