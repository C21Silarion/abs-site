import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * « Fil conducteur » (charte §3) : ligne courbe orange qui descend en
 * serpentant derrière le contenu pour guider la lecture.
 *
 * Générée en pixels réels (ResizeObserver) plutôt que dans un viewBox fixe
 * étiré : un viewBox stretché dépend de la hauteur totale de page pour
 * répartir ses bombements, et une page mobile (contenu empilé en une seule
 * colonne, donc bien plus haute que large) finit par écraser le tracé en
 * presque une ligne droite. Ici un balancement dure toujours `period` px
 * verticaux réels, quelle que soit la longueur de la page : une page plus
 * haute affiche juste plus de balancements, jamais des balancements plus plats.
 *
 * Réglages artistiques (props) — les ancres du tracé sont posées aux points
 * de rebroussement (gauche/droite), jamais au passage par le centre : à un
 * rebroussement la tangente est naturellement verticale des deux côtés, donc
 * les segments qui se suivent raccordent toujours en douceur (sinon, ancrer
 * au centre avec des poignées indépendantes crée une tangente entrante/sortante
 * discontinue à ce point → un « V » au lieu d'un « S », cf. capture d'écran).
 * - `amplitude` : écart horizontal des rebroussements par rapport à l'axe
 *   central (px). Plus grand = balancement plus large.
 * - `period`    : hauteur (px) entre deux rebroussements consécutifs.
 *   Plus grand = balancement plus étalé/doux (moins de va-et-vient visibles
 *   à l'écran) ; plus petit = plus fréquent/serré.
 * - `swing`     : longueur des poignées de chaque rebroussement, en fraction
 *   de `period` (0 à ~0.75). Plus petit = virage plus resserré/pointu ; plus
 *   grand = courbe plus ronde, proche d'une sinusoïde (~0.5).
 *
 * Décoratif : à placer en couche absolue derrière le contenu (z négatif),
 * `pointer-events-none`.
 */
const DEFAULT_AMPLITUDE = -200;
const DEFAULT_PERIOD = 820;
const DEFAULT_SWING = 0.55;

function buildPath(width: number, height: number, amplitude: number, period: number, swing: number) {
  const cx = width / 2;
  const amp = Math.min(amplitude, Math.max(16, width / 2 - 24));
  const handle = period * swing;

  let y = -period;
  let side = 1; // rebroussement de départ (hors écran) côté droit
  let d = `M ${cx + side * amp} ${y}`;
  while (y < height + period) {
    const nextSide = -side;
    const nextY = y + period;
    const startX = cx + side * amp;
    const endX = cx + nextSide * amp;
    // poignées verticales (même x que leur ancre) : tangente verticale des
    // deux côtés du rebroussement, donc raccord lisse avec le segment suivant.
    d += ` C ${startX} ${y + handle}, ${endX} ${nextY - handle}, ${endX} ${nextY}`;
    side = nextSide;
    y = nextY;
  }
  return d;
}

export function Fil({
  className,
  strokeWidth = 14,
  amplitude = DEFAULT_AMPLITUDE,
  period = DEFAULT_PERIOD,
  swing = DEFAULT_SWING,
}: {
  className?: string;
  strokeWidth?: number;
  amplitude?: number;
  period?: number;
  swing?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} className={cn("pointer-events-none", className)} aria-hidden="true">
      {size.width > 0 && size.height > 0 && (
        <path
          d={buildPath(size.width, size.height, amplitude, period, swing)}
          stroke="var(--orange)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </svg>
  );
}
