/*
 * Variantes de la silhouette « maison » (charte ABS), extraites des fichiers
 * `maison*.svg` du dossier de marque via `import.meta.glob`. Déposer un nouveau
 * `maisonN.svg` ajoute une variante sans toucher au code (live en dev).
 *
 * Recoloration : les fills du fichier sont remplacés par `currentColor` et le
 * trait noir neutralisé, donc la couleur se pilote par une prop `fill`/`color`
 * côté composant. Sélection par index (0 = maison.svg, 1 = maison1.svg…, dans
 * l'ordre alphabétique des noms).
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
export const HOUSE_VARIANTS = Object.keys(RAW)
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

/** Nombre de variantes disponibles (= fichiers `maison*.svg` du dossier). */
export const HOUSE_VARIANT_COUNT = HOUSE_VARIANTS.length;
