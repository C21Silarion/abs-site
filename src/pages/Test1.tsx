import { Hero } from "@/components/site/sections/Hero";
import { Plaidoyer } from "@/components/site/sections/Plaidoyer";
import { ChiffresCles } from "@/components/site/sections/ChiffresCles";
import { ParcoursHebergeur } from "@/components/site/sections/ParcoursHebergeur";
import { ParcoursReferent } from "@/components/site/sections/ParcoursReferent";
import { GalerieMedias } from "@/components/site/sections/GalerieMedias";
import { Ressources } from "@/components/site/sections/Ressources";
import { SiteFooter } from "@/components/site/sections/SiteFooter";

/*
 * Maquette MONOPAGE (CDC §4) — parcours descendant sur une seule page.
 * Les CTA jumeaux du héros défilent vers les ancres #heberger / #referent.
 */
export default function Test1() {
  return (
    <div className="min-h-svh bg-background">
      <Hero ctaMode="scroll" hebergerTarget="heberger" referentTarget="referent" />
      <Plaidoyer />
      <ChiffresCles />

      {/* Tunnels de réassurance : « Comment ça marche ? » */}
      <ParcoursHebergeur id="heberger" showTypes />
      <ParcoursReferent id="referent" />

      <GalerieMedias id="galerie" />
      <Ressources id="ressources" />
      <SiteFooter />
    </div>
  );
}
