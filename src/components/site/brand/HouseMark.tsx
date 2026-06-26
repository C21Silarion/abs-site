import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { HOUSE_VARIANTS } from "@/components/site/brand/houseVariants";

/*
 * Silhouette de maison « fait main » (charte ABS). Les tracés et leur
 * recoloration sont mutualisés dans `houseVariants.ts` (chargés depuis les
 * `maison*.svg` du dossier de marque). Sélection par `variant` (index).
 *
 * La couleur se pilote par la prop `fill` ; `style` permet de surcharger
 * taille/position/etc. en inline (utilisé par `HouseScatter`).
 */
export function HouseMark({
  className,
  fill = "var(--aubergine)",
  variant = 0,
  style,
}: {
  className?: string;
  fill?: string;
  variant?: number;
  style?: CSSProperties;
}) {
  const v = HOUSE_VARIANTS[variant] ?? HOUSE_VARIANTS[0];
  return (
    <svg
      viewBox={v.viewBox}
      className={cn("h-10 w-10", className)}
      style={{ color: fill, ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: v.inner }}
    />
  );
}
