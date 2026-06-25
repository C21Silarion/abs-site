import { Hero } from "@/components/site/sections/Hero";
import { Plaidoyer } from "@/components/site/sections/Plaidoyer";
import { ChiffresCles } from "@/components/site/sections/ChiffresCles";
import { ParcoursHebergeur } from "@/components/site/sections/ParcoursHebergeur";
import { ParcoursReferent } from "@/components/site/sections/ParcoursReferent";
import { Projets } from "@/components/site/sections/Projets";
import { Ressources } from "@/components/site/sections/Ressources";
import { SiteFooter } from "@/components/site/sections/SiteFooter";
import { Section } from "@/components/site/ui/Section";
import { Fil } from "@/components/site/brand/Fil";
import { HouseMark } from "@/components/site/brand/HouseMark";
import { Disclosure } from "@/components/site/ui/Disclosure";
import { HebergeurForm } from "@/components/site/forms/HebergeurForm";
import { BenevoleForm } from "@/components/site/forms/BenevoleForm";
import { DispoForm } from "@/components/site/forms/DispoForm";
import { formulaires } from "@/components/site/content";

/*
 * Maquette MONOPAGE (CDC §4) — parcours descendant sur une seule page.
 * Les CTA jumeaux du héros défilent vers les ancres #heberger / #referent.
 * Chaque tunnel de réassurance est suivi de son formulaire (replié par défaut).
 */
export default function Test1() {
  return (
    <div
      className="relative min-h-svh overflow-hidden bg-background"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--creme-deep) 0, var(--creme) 400px, var(--creme) calc(100% - 400px), var(--creme-deep) 100%)",
      }}
    >
      {/* Fil conducteur orange — couche décorative derrière le contenu. */}
      <Fil className="absolute inset-0 z-0 h-full w-full" />

      {/* Maisons « fait main » en filigrane, dispersées en marge (variantes
          maison1–5), derrière le contenu. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <HouseMark variant={1} fill="var(--lavande)"  className="absolute left-[12%] top-[18%] h-40 w-40 -rotate-6 opacity-[0.08]" />
        <HouseMark variant={2} fill="var(--orange)"   className="absolute right-[14%] top-[33%] h-36 w-36 rotate-12 opacity-[0.07]" />
        <HouseMark variant={3} fill="var(--aubergine)" className="absolute left-[40%] top-[48%] h-28 w-28 rotate-3 opacity-[0.06]" />
        <HouseMark variant={4} fill="var(--lavande)"  className="absolute right-[22%] top-[62%] h-44 w-44 -rotate-12 opacity-[0.08]" />
        <HouseMark variant={5} fill="var(--orange)"   className="absolute left-[26%] top-[78%] h-32 w-32 rotate-6 opacity-[0.07]" />
      </div>

      <div className="relative z-10">
        <Hero ctaMode="scroll" hebergerTarget="heberger" referentTarget="referent" />
        <Plaidoyer />
        <ChiffresCles />

        {/* Tunnels de réassurance : « Comment ça marche ? » + passage à l'action */}
        <ParcoursHebergeur id="heberger" showTypes />
        <Section className="pt-0 sm:pt-0">
          <Disclosure tone="aubergine" titre={formulaires.hebergeur.titre} hint={formulaires.hebergeur.hint}>
            <HebergeurForm />
          </Disclosure>
          <div className="mt-6">
            <Disclosure quiet titre={formulaires.dispo.titre}>
              <DispoForm />
            </Disclosure>
          </div>
        </Section>

        <ParcoursReferent id="referent" />
        <Section className="pt-0 sm:pt-0">
          <Disclosure tone="aubergine" titre={formulaires.benevole.titre} hint={formulaires.benevole.hint}>
            <BenevoleForm />
          </Disclosure>
        </Section>

        <Projets id="projets" withVideo />
        <Ressources id="ressources" />
        <SiteFooter />
      </div>
    </div>
  );
}
