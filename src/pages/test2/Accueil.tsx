import { Hero } from "@/components/site/sections/Hero";
import { Plaidoyer } from "@/components/site/sections/Plaidoyer";
import { ChiffresCles } from "@/components/site/sections/ChiffresCles";
import { Projets } from "@/components/site/sections/Projets";

/* Page 1 — Accueil vitrine (CDC §5). CTA jumeaux redirigeant vers les pages dédiées. */
export default function Accueil() {
  return (
    <>
      <Hero
        ctaMode="link"
        hebergerTarget="/test/test2/heberger"
        referentTarget="/test/test2/referent"
      />
      <Plaidoyer />
      <ChiffresCles />
      <Projets
        title="Nos projets"
        more={{ label: "Voir plus de projets", to: "/test/test2/ressources" }}
      />
    </>
  );
}
