import bannerSvg from "@/assets/brand/banner.svg?raw";
import { chiffres } from "@/components/site/content";

/*
 * Compteurs textuels simples et fixes (pas de base de données, cf. CDC), posés
 * sur le bandeau « papier découpé » banner.svg (étiré en fond, plein cadre).
 * SVG inline + preserveAspectRatio="none" (un <img> ne remplirait pas la bande).
 */
const bannerHtml = bannerSvg
  .replace(/<\?xml[^>]*\?>/, "")
  .replace("<svg", '<svg preserveAspectRatio="none"');

export function ChiffresCles() {
  return (
    <section className="relative overflow-hidden px-5 py-20 text-creme sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: bannerHtml }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
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
      </div>
    </section>
  );
}
