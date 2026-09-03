import { useEffect, useState } from "react";
import bannerSvg from "@/assets/brand/banner.svg?raw";
import { chiffres } from "@/components/site/content";
import { getPublicStats, type PublicStats } from "@/lib/publicApi";

/*
 * Compteurs posés sur le bandeau « papier découpé » banner.svg (étiré en fond).
 * Les valeurs viennent de l'API publique (GET /api/public/stats, snapshot
 * précalculé côté outil interne) ; en attendant la réponse — ou si elle échoue —
 * on affiche les placeholders de content.ts (repli « zéro maintenance »).
 * SVG inline + preserveAspectRatio="none" (un <img> ne remplirait pas la bande).
 */
const bannerHtml = bannerSvg
  .replace(/<\?xml[^>]*\?>/, "")
  .replace("<svg", '<svg preserveAspectRatio="none"');

const nf = new Intl.NumberFormat("fr-FR");

/* Liseré blanc « papier découpé » des chiffres — réglages regroupés ici. */
const STROKE_WIDTH = "3px";
const STROKE_COLOR = "var(--aubergine-deep)";
const STROKE_OPACITY = 0.5; // 0 = invisible, 1 = couleur pleine
const STROKE_STYLE: React.CSSProperties = {
  WebkitTextStroke: `${STROKE_WIDTH} color-mix(in srgb, ${STROKE_COLOR} ${STROKE_OPACITY * 100}%, transparent)`,
  color: "transparent",
};

/**
 * Résout un chemin pointé (« total.personnesAccueillies.total ») dans le payload.
 * `$year` dans le chemin est remplacé par l'année courante (ex. « parAnnee.$year.nuitees »)
 * pour un chiffre borné à l'année en cours plutôt que cumulé depuis le début.
 */
function resolveValeur(stats: PublicStats | null, key?: string): number | null {
  if (!stats || !key) return null;
  const path = key.replace("$year", String(new Date().getFullYear()));
  let cur: unknown = stats;
  for (const part of path.split(".")) {
    if (cur && typeof cur === "object" && part in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return null;
    }
  }
  return typeof cur === "number" ? cur : null;
}

export function ChiffresCles() {
  const [stats, setStats] = useState<PublicStats | null>(null);

  useEffect(() => {
    let alive = true;
    getPublicStats().then((s) => {
      if (alive) setStats(s);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-5 py-20 text-creme sm:py-28">
      <div
        aria-hidden
        className="absolute inset-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: bannerHtml }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid gap-8 text-center sm:grid-cols-3">
          {chiffres.map((c) => {
            const live = resolveValeur(stats, c.key);
            const valeur = live !== null ? nf.format(live) : c.valeur;
            return (
              <div key={c.label}>
                <div className="relative inline-block">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 font-display text-6xl font-semibold sm:text-8xl"
                    style={STROKE_STYLE}
                  >
                    {valeur}
                  </div>
                  <div className="relative font-display text-6xl font-semibold text-orange sm:text-8xl">
                    {valeur}
                  </div>
                </div>
                <div className="mt-2 text-lg text-creme/85">{c.label}</div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-creme/60">
          Un aperçu en temps réel de l'activité du réseau ABS en Haute-Vienne, pour l'année en cours.
          <br />
          *dans le cadre d'un hébergement familial nous comptabilisons une nuitée pour l'ensemble de la famille.
        </p>
      </div>
    </section>
  );
}
