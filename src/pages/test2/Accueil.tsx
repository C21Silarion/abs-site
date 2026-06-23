import { Hero } from "@/components/site/sections/Hero";
import { Plaidoyer } from "@/components/site/sections/Plaidoyer";
import { ChiffresCles } from "@/components/site/sections/ChiffresCles";
import { GalerieMedias } from "@/components/site/sections/GalerieMedias";

/* Page 1 — Accueil vitrine (CDC §5). CTA jumeaux redirigeant vers les pages dédiées. */
export default function Accueil() {
  return (
    <>
      <Hero
        ctaMode="link"
        hebergerTarget="/test2/heberger"
        referentTarget="/test2/referent"
      />
      <Plaidoyer />
      <ChiffresCles />
      <GalerieMedias
        title="Un aperçu de la vie de l'asso"
        count={3}
        withVideo={false}
        more={{ label: "Voir plus de souvenirs", to: "/test2/ressources" }}
      />
    </>
  );
}
