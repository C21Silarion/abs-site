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
      <details className="group" open={defaultOpen}>
        <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-lavande transition-colors hover:text-aubergine marker:content-['']">
          {titre}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-4 rounded-2xl border border-border bg-card p-6 sm:p-8">{children}</div>
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
