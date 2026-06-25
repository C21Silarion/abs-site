import { ChevronDown } from "lucide-react";

/*
 * Repli sobre basé sur l'élément natif <details> (même principe que Faq) :
 * discret une fois replié, déplie son contenu en place. Zéro dépendance, suit
 * les tokens du site.
 *
 * - défaut    : carte avec titre + sous-titre (pour un formulaire mis en avant).
 * - `quiet`   : simple ligne-lien lavande (pour une action secondaire/discrète).
 */
export function Disclosure({
  titre,
  hint,
  quiet = false,
  defaultOpen = false,
  children,
}: {
  titre: string;
  hint?: string;
  quiet?: boolean;
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

  return (
    <details className="group overflow-hidden rounded-2xl border border-border bg-card" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 marker:content-['']">
        <span className="min-w-0">
          <span className="block font-display text-xl text-aubergine">{titre}</span>
          {hint && <span className="mt-0.5 block text-sm text-foreground/70">{hint}</span>}
        </span>
        <ChevronDown className="h-5 w-5 shrink-0 text-lavande transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border px-6 py-6 sm:px-8">{children}</div>
    </details>
  );
}
