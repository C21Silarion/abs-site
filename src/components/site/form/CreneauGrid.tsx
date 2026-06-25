import { cn } from "@/lib/utils";
import { JOURS, PARTS, creneauToken } from "@/lib/profilOptions";
import { CHIP_ON, CHIP_OFF } from "./ChipMulti";

/*
 * Grille de disponibilité : jours de la semaine en colonnes (en-tête), les trois
 * demi-journées (matin / après-midi / soir) en lignes. Édite une sélection de
 * jetons créneaux (`["Lundi matin", …]`). Cibles tactiles pour le mobile.
 */
const JOUR_ABBR: Record<string, string> = {
  "Lundi": "Lun", "Mardi": "Mar", "Mercredi": "Mer", "Jeudi": "Jeu",
  "Vendredi": "Ven", "Samedi": "Sam", "Dimanche": "Dim",
};
const PART_LABEL: Record<string, string> = {
  "matin": "Matin",
  "après-midi": "Ap-midi",
  "soir": "Soir",
};

export function CreneauGrid({
  values,
  onChange,
}: {
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const set = new Set(values);

  function toggle(token: string) {
    onChange(set.has(token) ? values.filter((v) => v !== token) : [...values, token]);
  }

  return (
    <div
      className="inline-grid gap-1 text-sm"
      style={{ gridTemplateColumns: `minmax(4rem,auto) repeat(${JOURS.length}, minmax(2.25rem,1fr))` }}
    >
      {/* En-tête : jours de la semaine */}
      <div />
      {JOURS.map((jour) => (
        <div key={jour} className="px-1 text-center text-xs font-medium text-muted-foreground" title={jour}>
          {JOUR_ABBR[jour] ?? jour}
        </div>
      ))}

      {/* Une ligne par demi-journée */}
      {PARTS.map((part) => (
        <div key={part} className="contents">
          <div className="flex items-center pr-1 text-xs text-muted-foreground">{PART_LABEL[part] ?? part}</div>
          {JOURS.map((jour) => {
            const token = creneauToken(jour, part);
            const on = set.has(token);
            return (
              <button
                type="button"
                key={token}
                onClick={() => toggle(token)}
                aria-pressed={on}
                aria-label={token}
                className={cn(
                  "min-h-9 select-none rounded-md border text-xs transition-colors",
                  on ? CHIP_ON : CHIP_OFF,
                )}
              >
                {on ? "✓" : ""}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
