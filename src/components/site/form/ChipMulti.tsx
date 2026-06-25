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
}: {
  values: string[];
  options: readonly string[];
  onChange: (v: string[]) => void;
}) {
  const { on: ON, off: OFF } = chipClasses(useFormTone());

  function toggle(o: string) {
    onChange(values.includes(o) ? values.filter((v) => v !== o) : [...values, o]);
  }
  return (
    <div className="flex flex-wrap gap-1.5 pt-0.5">
      {options.map((o) => {
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
