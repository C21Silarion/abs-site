import { cn } from "@/lib/utils";

/*
 * Silhouette de maison « fait main » (charte ABS).
 *
 * Les tracés viennent des fichiers `maison*.svg` (assets/brand) chargés via
 * import.meta.glob → déposer `maison1.svg`, `maison2.svg`… ajoute des variantes
 * sans toucher au code (live en dev). Sélection par `variant` (0 = maison.svg,
 * 1 = maison1.svg, 2 = maison2.svg…, dans l'ordre alphabétique des noms).
 *
 * Recoloration : les fills du fichier sont remplacés par `currentColor` et le
 * trait noir neutralisé, donc la couleur se pilote par la prop `fill` (filigrane
 * lavande/orange/aubergine).
 */
const RAW = import.meta.glob("../../../assets/brand/maison*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function recolor(inner: string): string {
  return inner
    .replace(/fill:\s*rgb\([^)]*\)/gi, "fill: currentColor")
    .replace(/stroke:\s*rgb\([^)]*\)/gi, "stroke: none")
    .replace(/\bfill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/\bstroke="(?!none)[^"]*"/gi, 'stroke="none"');
}

/** Une variante = { viewBox, contenu interne recoloré } extraite du fichier. */
const VARIANTS = Object.keys(RAW)
  .sort()
  .map((k) => {
    const raw = RAW[k];
    const viewBox = raw.match(/viewBox="([^"]*)"/)?.[1] ?? "0 0 500 500";
    const inner = raw
      .replace(/<\?xml[^>]*\?>/, "")
      .replace(/<svg[^>]*>/, "")
      .replace(/<\/svg>/, "");
    return { viewBox, inner: recolor(inner) };
  });

export function HouseMark({
  className,
  fill = "var(--aubergine)",
  variant = 0,
}: {
  className?: string;
  fill?: string;
  variant?: number;
}) {
  const v = VARIANTS[variant] ?? VARIANTS[0];
  return (
    <svg
      viewBox={v.viewBox}
      className={cn("h-10 w-10", className)}
      style={{ color: fill }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: v.inner }}
    />
  );
}
