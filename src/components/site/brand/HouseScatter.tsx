import { useMemo } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { HouseMark } from "@/components/site/brand/HouseMark";
import { HOUSE_VARIANT_COUNT } from "@/components/site/brand/houseVariants";

/*
 * Semis procédural de maisons « fait main » en filigrane (charte ABS).
 *
 * Remplace le placement manuel des `<HouseMark>` : sème `count` maisons en
 * couverture régulière (grille « jittered » : une maison par cellule + décalage
 * aléatoire), tailles/rotations/opacités/couleurs aléatoires mais **stables**
 * (RNG seedé → même disposition à chaque rendu/rechargement pour un `seed`
 * donné). `minDistance` impose un écartement mini pour éviter les recouvrements.
 *
 * RÉGLAGE : les pages ne passent en général que `seed` ; tout le reste se règle
 * via les valeurs par défaut ci-dessous (changer un défaut agit sur toutes les
 * pages). Une prop passée au call site surcharge ponctuellement le défaut.
 *
 * Pioche automatiquement parmi tous les `maison*.svg` du dossier de marque
 * (via `HOUSE_VARIANT_COUNT`). Couche purement décorative : `aria-hidden`, non
 * cliquable, derrière le contenu (`z-0`). Espacement approximatif (espace en %,
 * sans mesure du conteneur) : de très grosses maisons peuvent encore se frôler.
 */

/** Clés de la palette ABS → variables CSS (cf. `src/index.css`). */
const PALETTE = new Set([
  "orange",
  "lavande",
  "lavande-soft",
  "aubergine",
  "aubergine-deep",
  "peach",
]);

/** `"lavande"` → `var(--lavande)` ; toute autre valeur est renvoyée telle quelle. */
function toColor(c: string): string {
  return PALETTE.has(c) ? `var(--${c})` : c;
}

/** PRNG déterministe (mulberry32) : à graine égale, suite identique. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

type HouseSpec = {
  key: number;
  variant: number;
  color: string;
  style: CSSProperties;
};

export function HouseScatter({
  count = 17,
  columns = 6,
  jitter = 1.2,
  minDistance = 15,
  margin = 4,
  scale = 300,
  scaleJitter = 0.25,
  rotation = 20,
  opacity = 0.25,
  opacityJitter = 0.08,
  colors = ["lavande", "orange", "aubergine"],
  seed = 38,
  variants,
  className,
}: {
  /** Nombre de maisons à semer (remplit la grille dans l'ordre). */
  count?: number;
  /** Colonnes de la grille (défaut : ~√count). À adapter à la hauteur de page. */
  columns?: number;
  /** Décalage aléatoire dans la cellule : 0 = grille stricte, 1 = bord de cellule. */
  jitter?: number;
  /** Distance mini centre-à-centre en % (>0 : ré-essaie le jitter pour écarter). */
  minDistance?: number;
  /** Marge en % par rapport aux bords du cadre. */
  margin?: number;
  /** Taille de base en px. */
  scale?: number;
  /** Variation aléatoire de taille (fraction, ex. 0.1 = ±10 %). */
  scaleJitter?: number;
  /** Rotation aléatoire dans ±`rotation` degrés. */
  rotation?: number;
  /** Opacité de base. */
  opacity?: number;
  /** Variation aléatoire d'opacité (fraction, ex. 0.08 = ±8 %). */
  opacityJitter?: number;
  /** Couleurs piochées au hasard (clé palette ou valeur CSS). */
  colors?: string[];
  /** Graine du RNG : placement stable, change pour rebattre les cartes. */
  seed?: number;
  /** Restreindre aux index de variantes voulus (défaut : toutes). */
  variants?: number[];
  /** Classes ajoutées à la couche décorative. */
  className?: string;
}) {
  const houses = useMemo<HouseSpec[]>(() => {
    const rand = mulberry32(seed);
    const pool =
      variants && variants.length > 0
        ? variants
        : Array.from({ length: HOUSE_VARIANT_COUNT }, (_, i) => i);

    // Pioche « sac à jetons » : chaque variante du pool sort une fois avant
    // qu'une variante ne puisse ressortir (mélange re-tiré une fois le sac vide).
    const bag: number[] = [];
    const drawVariant = () => {
      if (bag.length === 0) {
        bag.push(...pool);
        for (let i = bag.length - 1; i > 0; i--) {
          const j = Math.floor(rand() * (i + 1));
          [bag[i], bag[j]] = [bag[j], bag[i]];
        }
      }
      return bag.pop()!;
    };

    const cols = Math.max(1, columns ?? Math.round(Math.sqrt(count)));
    const rows = Math.ceil(count / cols);
    const usable = 100 - 2 * margin;
    const cellW = usable / cols;
    const cellH = usable / rows;

    const placed: { x: number; y: number }[] = [];

    return Array.from({ length: count }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseX = margin + (col + 0.5) * cellW;
      const baseY = margin + (row + 0.5) * cellH;

      // Jitter dans la cellule, avec garde de distance optionnelle : on tente
      // plusieurs décalages et on garde celui qui éloigne le plus des voisins.
      const tries = minDistance > 0 ? 12 : 1;
      let best = { x: baseX, y: baseY, gap: -1 };
      for (let t = 0; t < tries; t++) {
        const x = clamp(baseX + (rand() * 2 - 1) * jitter * (cellW / 2), 2, 98);
        const y = clamp(baseY + (rand() * 2 - 1) * jitter * (cellH / 2), 2, 98);
        let gap = Infinity;
        for (const p of placed) {
          const d = Math.hypot(x - p.x, y - p.y);
          if (d < gap) gap = d;
        }
        if (gap > best.gap) best = { x, y, gap };
        if (gap >= minDistance) break;
      }
      placed.push({ x: best.x, y: best.y });

      const size = scale * (1 + (rand() * 2 - 1) * scaleJitter);
      const angleDeg = (rand() * 2 - 1) * rotation;
      const op = opacity * (1 + (rand() * 2 - 1) * opacityJitter);
      const color = toColor(colors[Math.floor(rand() * colors.length)] ?? colors[0]);
      const variant = drawVariant();

      return {
        key: i,
        variant,
        color,
        style: {
          position: "absolute",
          left: `${best.x}%`,
          top: `${best.y}%`,
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
          opacity: op,
        },
      };
    });
  }, [
    count,
    columns,
    jitter,
    minDistance,
    margin,
    scale,
    scaleJitter,
    rotation,
    opacity,
    opacityJitter,
    colors,
    seed,
    variants,
  ]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      {houses.map((h) => (
        <HouseMark key={h.key} variant={h.variant} fill={h.color} style={h.style} />
      ))}
    </div>
  );
}
