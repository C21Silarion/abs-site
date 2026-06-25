import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormToneContext, type FormTone } from "@/components/site/form/tone";

/*
 * Repli sobre basé sur l'élément natif <details> (même principe que Faq) :
 * discret une fois replié, déplie son contenu en place. Zéro dépendance, suit
 * les tokens du site.
 *
 * - défaut    : carte claire avec titre + sous-titre.
 * - `tone="aubergine"` : carte aubergine, texte crème (formulaire mis en avant).
 *   La teinte est propagée aux primitives de formulaire via FormToneContext.
 * - `quiet`   : simple ligne-lien lavande (action secondaire/discrète, claire).
 */
export function Disclosure({
  titre,
  hint,
  quiet = false,
  tone = "light",
  defaultOpen = false,
  children,
}: {
  titre: string;
  hint?: string;
  quiet?: boolean;
  tone?: FormTone;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  if (quiet) {
    return (
      <details className="group overflow-hidden rounded-xl border border-lavande/40 bg-peach/50" open={defaultOpen}>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-base font-semibold text-aubergine transition-colors marker:content-['']">
          {titre}
          <ChevronDown className="h-5 w-5 shrink-0 text-lavande transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-lavande/25 px-5 py-6 sm:px-6">{children}</div>
      </details>
    );
  }

  const aubergine = tone === "aubergine";

  return (
    <details
      className={cn(
        "group overflow-hidden rounded-2xl border",
        aubergine ? "border-aubergine-deep bg-aubergine" : "border-border bg-card",
      )}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-['']">
        <span className="min-w-0">
          <span className={cn("block font-display text-xl", aubergine ? "text-creme" : "text-aubergine")}>{titre}</span>
          {hint && <span className={cn("mt-0.5 block text-sm", aubergine ? "text-creme/80" : "text-foreground/70")}>{hint}</span>}
        </span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform group-open:rotate-180", aubergine ? "text-creme/70" : "text-lavande")} />
      </summary>
      <div className={cn("border-t px-6 py-6 sm:px-8", aubergine ? "border-creme/15" : "border-border")}>
        <FormToneContext.Provider value={tone}>{children}</FormToneContext.Provider>
      </div>
    </details>
  );
}
