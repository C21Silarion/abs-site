import { Section } from "@/components/site/ui/Section";
import { chiffres } from "@/components/site/content";

/* Compteurs textuels simples et fixes (pas de base de données, cf. CDC). */
export function ChiffresCles() {
  return (
    <Section className="bg-aubergine text-creme">
      <div className="grid gap-8 text-center sm:grid-cols-3">
        {chiffres.map((c) => (
          <div key={c.label}>
            <div className="font-display text-5xl font-semibold text-orange sm:text-6xl">
              {c.valeur}
            </div>
            <div className="mt-2 text-lg text-creme/85">{c.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-sm text-creme/60">
        Chiffres indicatifs du réseau ABS en Haute-Vienne.
      </p>
    </Section>
  );
}
