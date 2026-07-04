import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import raw from "@/assets/brand/topBanner.svg?raw";

/*
 * Bandeau décoratif « fait main » (charte ABS), tout en haut du site,
 * au-dessus du logo. Tracé unique extrait de `topBanner.svg` ; la couleur se
 * pilote par la prop `fill` (lavande par défaut, comme dessiné à l'origine).
 */
const VIEW_BOX = raw.match(/viewBox="([^"]*)"/)?.[1] ?? "0 0 2000 250";

function recolor(inner: string): string {
  return inner
    .replace(/fill:\s*rgba?\([^)]*\)/gi, "fill: currentColor")
    .replace(/stroke:\s*rgba?\([^)]*\)/gi, "stroke: none")
    .replace(/\bfill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/\bstroke="(?!none)[^"]*"/gi, 'stroke="none"');
}

const INNER = recolor(
  raw
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, ""),
);

export function TopBanner({
  className,
  fill = "var(--lavande)",
  style,
}: {
  className?: string;
  fill?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio="none"
      className={cn("block w-full", className)}
      style={{ color: fill, ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: INNER }}
    />
  );
}
