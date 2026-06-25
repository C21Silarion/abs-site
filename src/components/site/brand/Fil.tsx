import { cn } from "@/lib/utils";

/*
 * « Fil conducteur » (charte §3) : ligne courbe orange qui descend en serpentant
 * derrière le contenu pour guider la lecture. Tracé fait-main (peu de points,
 * pas géométrique).
 *
 * Technique : SVG étiré au conteneur (preserveAspectRatio="none") avec
 * `vector-effect:non-scaling-stroke` → l'épaisseur du trait reste constante
 * (~12px) quelle que soit la hauteur de page. La courbe entre et sort au CENTRE
 * horizontal et bombe alternativement à gauche/droite : les raccords entre
 * sections restent alignés (fil continu de haut en bas) et les bombements
 * passent dans les marges/gouttières, à côté des blocs.
 *
 * Décoratif : à placer en couche absolue derrière le contenu (z négatif),
 * `pointer-events-none`. Régler l'allure via `width` (amplitude du viewBox),
 * `strokeWidth` et `opacity`.
 */
export function Fil({
  className,
  strokeWidth = 14,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      className={cn("pointer-events-none", className)}
      viewBox="0 0 120 1000"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 60 -30
           C 100 120, 4 150, 60 240
           C 130 330, 4 410, 60 500
           C 116 590, 4 670, 60 760
           C 110 840, 18 910, 60 1040"
        stroke="var(--orange)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
