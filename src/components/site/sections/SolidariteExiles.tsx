import cutOutBanner from "@/assets/brand/cutOutBanner.svg?raw";
import fresque from "@/assets/brand/Fresque3.jpg";
import { solidariteExiles } from "@/components/site/content";

/*
 * Bandeau « papier découpé » traité comme une seule unité rigide (image + SVG
 * + texte), jamais déformée : le ratio 20/9 (desktop, notre référence) est
 * verrouillé en permanence via `aspectRatio`. Tous les enfants sont
 * positionnés en % de cette unité (+ `cqh` pour le texte) — aucune valeur
 * `vw`/breakpoint, donc aucun saut de mise en page entre mobile et desktop.
 *
 * Le conteneur externe fixe la hauteur affichée via `clamp()` plutôt que de
 * la dériver de la largeur : `45vw` reproduit exactement le ratio 20/9 (donc
 * rendu desktop inchangé), mais plafonne à 260px sur petit écran au lieu de
 * rétrécir. L'unité interne, elle, garde toujours sa hauteur à 100 % de ce
 * conteneur et calcule sa largeur depuis le ratio 20/9 : sur mobile elle
 * devient donc plus large que l'écran, et déborde à gauche/droite — c'est le
 * « zoom », les bords qui dépassent sont simplement rognés par
 * l'`overflow-hidden` du conteneur externe.
 *
 * `containerType: size` sur le conteneur externe active les unités `cqh`
 * (container query height) utilisées par le texte, pour que sa taille suive
 * la hauteur réellement affichée (donc le zoom) plutôt que la largeur d'écran.
 *
 * Même technique que `PaperButton` pour le SVG : importé en `?raw`,
 * `preserveAspectRatio="none"` injecté, inliné via `dangerouslySetInnerHTML`
 * (un `<img src>` respecterait le `preserveAspectRatio` interne et ne
 * remplirait pas l'unité).
 */
const STRETCHED_BANNER = cutOutBanner.includes("preserveAspectRatio")
  ? cutOutBanner
  : cutOutBanner.replace("<svg", '<svg preserveAspectRatio="none"');

export function SolidariteExiles() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(300px, 45vw, 950px)", containerType: "size" }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2"
        style={{ aspectRatio: "20/9" }}
      >
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

        <p
          className="absolute inset-x-0 flex h-[20%] items-center justify-center px-5 text-center font-display leading-none text-creme"
          style={{ top: "4.9%", fontSize: "12.2cqh" }}
        >
          {solidariteExiles.titre}
        </p>

        <p
          className="absolute whitespace-nowrap text-left font-display leading-none text-creme"
          style={{ left: "34.4%", bottom: "18.7%", fontSize: "5.6cqh" }}
        >
          {solidariteExiles.sousTitreLigne1}
        </p>

        <p
          className="absolute whitespace-nowrap text-left font-display leading-none text-creme"
          style={{ left: "45.6%", bottom: "6.4%", fontSize: "11.2cqh" }}
        >
          {solidariteExiles.sousTitreLigne2}
        </p>
      </div>
    </div>
  );
}
