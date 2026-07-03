/*
 * Chiffres « fait main » (charte ABS), extraits de `One.svg` / `Two.svg` /
 * `Three.svg` du dossier de marque via `import.meta.glob`. Même mécanique que
 * `houseVariants.ts` : les fills figés du fichier sont remplacés par
 * `currentColor`, donc la couleur se pilote par une prop côté composant.
 * Index 0 = un, 1 = deux, 2 = trois.
 */
const RAW = import.meta.glob("../../../assets/brand/{One,Two,Three}.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const ORDER = ["One.svg", "Two.svg", "Three.svg"];

function recolor(inner: string): string {
  return inner
    .replace(/fill:\s*rgb\([^)]*\)/gi, "fill: currentColor")
    .replace(/stroke:\s*rgba?\([^)]*\)/gi, "stroke: none")
    .replace(/\bfill="(?!none)[^"]*"/gi, 'fill="currentColor"')
    .replace(/\bstroke="(?!none)[^"]*"/gi, 'stroke="none"');
}

export const NUMBER_VARIANTS = ORDER.map((name) => {
  const key = Object.keys(RAW).find((k) => k.endsWith(`/${name}`));
  const raw = key ? RAW[key] : "";
  const viewBox = raw.match(/viewBox="([^"]*)"/)?.[1] ?? "0 0 500 500";
  const inner = raw
    .replace(/<\?xml[^>]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "");
  return { viewBox, inner: recolor(inner) };
});
