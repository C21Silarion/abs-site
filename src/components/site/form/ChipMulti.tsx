import { cn } from "@/lib/utils";
import { useFormTone, chipClasses } from "./tone";

/*
 * Pastilles de sélection multiple — alternative tout-visible au menu déroulant
 * pour les petits ensembles d'options. Couleurs selon la teinte du formulaire
 * (light / aubergine), jamais d'orange sur violet (cf. règle a11y CDC).
 */
export function ChipMulti({
  values,
  options,
  onChange,
  groups,
}: {
  values: string[];
  options: readonly string[];
  onChange: (v: string[]) => void;
  /** Regroupe les pastilles par section (ex. Suivi / Fonctionnement ABS interne). */
  groups?: readonly { label: string; options: readonly string[] }[];
}) {
  const tone = useFormTone();
  const { on: ON, off: OFF } = chipClasses(tone);
  const labelClass = cn("mb-1 text-xs font-medium uppercase tracking-wide", tone === "aubergine" ? "text-creme/70" : "text-muted-foreground");

  function toggle(o: string) {
    onChange(values.includes(o) ? values.filter((v) => v !== o) : [...values, o]);
  }

  function renderChips(opts: readonly string[]) {
    return (
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {opts.map((o) => {
          const on = values.includes(o);
          return (
            <button
              type="button"
              key={o}
              onClick={() => toggle(o)}
              aria-pressed={on}
              className={cn(
                "min-h-9 select-none rounded-full border px-3 py-1 text-sm transition-colors",
                on ? ON : OFF,
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    );
  }

  if (!groups) return renderChips(options);

  const known = new Set(groups.flatMap((g) => g.options));
  const rest = options.filter((o) => !known.has(o));
  return (
    <div className="space-y-2.5">
      {groups.map((g) => {
        const opts = options.filter((o) => (g.options as readonly string[]).includes(o));
        if (opts.length === 0) return null;
        return (
          <div key={g.label}>
            <p className={labelClass}>{g.label}</p>
            {renderChips(opts)}
          </div>
        );
      })}
      {rest.length > 0 && (
        <div>
          <p className={labelClass}>Autre</p>
          {renderChips(rest)}
        </div>
      )}
    </div>
  );
}
