import type { CSSProperties } from "react";
import { mulberry32 } from "@/lib/rng";

/*
 * Coin « papier découpé » : biseau droit (chanfrein, PAS arrondi, PAS une
 * courbe déchirée) sur les 4 coins d'un conteneur rectangulaire, via
 * clip-path (polygone à 8 points). Les distances de coupe sont en px fixes
 * (mêlées à des % via calc()) : l'amplitude du biseau reste constante quelle
 * que soit la taille de la boîte, sans mesure JS (même principe « point fixe
 * en px » que `FOOTER_TORN_EDGE` dans SiteFooter.tsx, appliqué ici aux 4
 * coins d'un rectangle fermé plutôt qu'à un seul bord ouvert).
 *
 * Chaque coin tire une profondeur (`depthJitter`, variation autour de `size`
 * d'un coin/d'une carte à l'autre) et un angle (`angleJitter`, écart entre la
 * coupe horizontale et la coupe verticale d'un MÊME coin — 0 = toujours 45°,
 * plus grand = biseau plus penché) — deux réglages indépendants, à partir
 * d'une graine (mulberry32, cf. src/lib/rng.ts) : stable au rechargement pour
 * un `seed` donné, différent d'une carte à l'autre pour un `seed` différent
 * (même principe que HouseScatter.tsx).
 *
 * `clip-path` ne prolonge pas la bordure CSS le long de la diagonale
 * introduite par la coupe (juste un bord net, sans liseré sur le chanfrein
 * lui-même). Pour un vrai liseré visible sur toute la découpe, on empile deux
 * calques : un calque extérieur rempli de la couleur de bordure et découpé
 * au polygone plein, et un calque intérieur (rentré de `borderWidth`) rempli
 * du fond de la carte et découpé à un polygone légèrement plus petit — la
 * couleur de bordure apparaît en anneau, y compris sur les diagonales.
 * `paperCorners()` renvoie les styles des deux calques ; au call site :
 *
 *   <a style={pc.outer} className="bg-border ..."> // ou hover:bg-orange etc.
 *     <div style={pc.inner} className="bg-card ..."> ...contenu... </div>
 *   </a>
 *
 * IMPORTANT au call site : retirer la classe Tailwind `rounded-*` existante
 * sur les deux calques — le `borderRadius: 0` ici est un garde-fou, pas un
 * substitut (un rayon arrondi proche en grandeur de la coupe peut
 * visuellement déborder dans le chanfrein). Ne pas garder de `border` CSS
 * classique sur ces éléments : la bordure est simulée par le calque extérieur.
 *
 * Les fonctions bas niveau (`cornerSet`, `insetCorners`, `chamferPolygon`,
 * `squareCorner`) servent aux cas composites où le contour ne peut pas être
 * un unique élément à deux calques — ex. un `<details>` : `<summary>` doit
 * rester enfant direct de `<details>` (contrainte HTML native pour le
 * comportement natif de bascule), donc résumé et contenu gardent chacun leur
 * propre clip-path partiel (coins hauts pour le résumé, coins bas pour le
 * contenu) plutôt qu'un calque intérieur commun. Cf. Disclosure.tsx.
 */

export type Corner = { x: number; y: number };
export type Corners = { tl: Corner; tr: Corner; br: Corner; bl: Corner };

/** Coin « droit » (pas de biseau) — pour annuler un coin d'un polygone partiel. */
export const squareCorner: Corner = { x: 0, y: 0 };

/*
 * LE réglage à modifier pour un effet visible immédiat sur TOUT le site :
 * multiplie chaque `size` (celui passé par chaque call site, pas une valeur
 * par défaut) avant tirage. `paperCorners()` transmet toujours explicitement
 * son propre `depthJitter`/`angleJitter` à `cornerSet()`, donc les valeurs
 * par défaut de `cornerSet` ci-dessous ne s'appliquent qu'aux rares appels
 * directs qui omettent ces arguments (Disclosure.tsx) — pas un levier global
 * fiable. `size` lui-même est toujours passé explicitement par tous les call
 * sites (`paperCorners(seed, 16)` etc.), donc son défaut de signature est
 * mort partout. `BEVEL_SCALE` est le seul multiplicateur qui agit vraiment
 * sur tout le monde, quel que soit le point d'appel.
 */
export const BEVEL_SCALE = 1.2;

/** Tire les 4 coins (profondeur + angle indépendants) à partir d'une graine. */
export function cornerSet(
  seed: number,
  size = 14,
  depthJitter = 0.3,
  angleJitter = 0.35,
): Corners {
  const scaledSize = size * BEVEL_SCALE;
  const rand = mulberry32(seed);
  const corner = (): Corner => {
    const depth = scaledSize * (1 + (rand() * 2 - 1) * depthJitter);
    const skew = (rand() * 2 - 1) * angleJitter;
    return {
      x: Math.max(2, Math.round(depth * (1 + skew))),
      y: Math.max(2, Math.round(depth * (1 - skew))),
    };
  };
  return { tl: corner(), tr: corner(), br: corner(), bl: corner() };
}

/** Rentre chaque coin de `borderWidth` px (calque intérieur, sous le liseré de bordure). */
export function insetCorners(c: Corners, borderWidth: number): Corners {
  const inset = (v: number) => Math.max(1, v - borderWidth);
  const shrink = (corner: Corner): Corner => ({ x: inset(corner.x), y: inset(corner.y) });
  return { tl: shrink(c.tl), tr: shrink(c.tr), br: shrink(c.br), bl: shrink(c.bl) };
}

/** Polygone `clip-path` à 8 points pour un rectangle aux 4 coins chanfreinés. */
export function chamferPolygon(c: Corners): string {
  return [
    `polygon(`,
    `${c.tl.x}px 0,`,
    `calc(100% - ${c.tr.x}px) 0,`,
    `100% ${c.tr.y}px,`,
    `100% calc(100% - ${c.br.y}px),`,
    `calc(100% - ${c.br.x}px) 100%,`,
    `${c.bl.x}px 100%,`,
    `0 calc(100% - ${c.bl.y}px),`,
    `0 ${c.tl.y}px)`,
  ].join(" ");
}

export type PaperCorners = {
  /** Calque extérieur : fond = couleur de bordure, à poser sur l'élément racine. */
  outer: CSSProperties;
  /** Calque intérieur : fond = fond de carte, à poser sur un `<div>` enfant direct. */
  inner: CSSProperties;
};

export function paperCorners(
  seed: number,
  size = 14,
  depthJitter = 0.5,
  angleJitter = 0.35,
  borderWidth = 1,
): PaperCorners {
  const outerCorners = cornerSet(seed, size, depthJitter, angleJitter);
  const innerCorners = insetCorners(outerCorners, borderWidth);

  return {
    outer: {
      clipPath: chamferPolygon(outerCorners),
      borderRadius: 0,
      padding: borderWidth,
    },
    inner: {
      clipPath: chamferPolygon(innerCorners),
      borderRadius: 0,
    },
  };
}
