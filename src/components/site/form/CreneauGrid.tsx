import { cn } from "@/lib/utils";
import { JOURS, PARTS, creneauToken } from "@/lib/profilOptions";
import { CHIP_ON, CHIP_OFF } from "./ChipMulti";

/*
 * Grille de disponibilité 7 jours × 3 demi-journées (matin / après-midi / soir).
 * Édite une sélection de jetons créneaux (`["Lundi matin", …]`). Cibles tactiles
 * dimensionnées pour le mobile.
 */
const PART_HEAD: Record<string, string> = {
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
      style={{ gridTemplateColumns: `minmax(4.5rem,auto) repeat(${PARTS.length}, minmax(3.5rem,1fr))` }}
    >
      <div />
      {PARTS.map((p) => (
        <div key={p} className="px-1 text-center text-xs font-medium text-muted-foreground">
          {PART_HEAD[p] ?? p}
        </div>
      ))}

      {JOURS.map((jour) => (
        <div key={jour} className="contents">
          <div className="flex items-center pr-1 text-xs text-muted-foreground">{jour}</div>
          {PARTS.map((part) => {
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
