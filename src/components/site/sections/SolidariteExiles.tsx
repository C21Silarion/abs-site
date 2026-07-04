import cutOutBanner from "@/assets/brand/cutOutBanner.svg?raw";
import fresque from "@/assets/brand/Fresque3.jpg";
import { solidariteExiles } from "@/components/site/content";

/*
 * Bandeau « papier découpé » plein bord : la forme lavande (`cutOutBanner.svg`)
 * est un tracé unique auto-intersectant qui, sous la règle nonzero, rend un
 * bandeau aux bords ondulés avec une fenêtre rectangulaire ajourée au centre
 * (mesurée : left 21.5 %, top 20.5 %, largeur 57.75 %, hauteur 52 % de la
 * viewBox 2000×1000). La photo de la fresque est calée sur cette fenêtre et
 * placée SOUS le SVG (le SVG doit rester au-dessus en z pour découper l'image).
 *
 * Même technique que `PaperButton` : SVG importé en `?raw`, étiré au calque
 * (`preserveAspectRatio="none"`, injecté ici car absent du fichier source) et
 * inliné via `dangerouslySetInnerHTML` — un `<img src>` respecterait le
 * `preserveAspectRatio` interne et ne remplirait pas le bandeau.
 */
const STRETCHED_BANNER = cutOutBanner.includes("preserveAspectRatio")
  ? cutOutBanner
  : cutOutBanner.replace("<svg", '<svg preserveAspectRatio="none"');

export function SolidariteExiles() {
  return (
    <div className="relative aspect-[20/9] w-full overflow-hidden">
      <img
        src={fresque}
        alt="Fresque peinte par les personnes accueillies par ABS"
        className="absolute object-cover"
        style={{ left: "21.5%", top: "20.5%", width: "58%", height: "54%" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: STRETCHED_BANNER }}
      />

      <p className="absolute inset-x-0 top-8 flex h-[20%] items-center justify-center px-5 text-center font-display text-[6vw] leading-none text-creme sm:text-[5.5vw]">
        {solidariteExiles.titre}
      </p>

      <p className="absolute inset-x-0 bottom-40 px-4 px-5 text-left ml-160 font-display text-[4vw] leading-none text-creme sm:text-[1.8vw]">
        {solidariteExiles.sousTitreLigne1}
      </p>

      <p className="absolute inset-x-0 bottom-12 px-5 text-left ml-200 font-display text-[5.5vw] leading-none text-creme sm:text-[5.5vw]">
        {solidariteExiles.sousTitreLigne2}
      </p>
    </div>
  );
}
