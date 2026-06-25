import { Hero } from "@/components/site/sections/Hero";
import { Plaidoyer } from "@/components/site/sections/Plaidoyer";
import { ChiffresCles } from "@/components/site/sections/ChiffresCles";
import { ParcoursHebergeur } from "@/components/site/sections/ParcoursHebergeur";
import { ParcoursReferent } from "@/components/site/sections/ParcoursReferent";
import { GalerieMedias } from "@/components/site/sections/GalerieMedias";
import { Ressources } from "@/components/site/sections/Ressources";
import { SiteFooter } from "@/components/site/sections/SiteFooter";
import { Section } from "@/components/site/ui/Section";
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
    <div className="min-h-svh bg-background">
      <Hero ctaMode="scroll" hebergerTarget="heberger" referentTarget="referent" />
      <Plaidoyer />
      <ChiffresCles />

      {/* Tunnels de réassurance : « Comment ça marche ? » + passage à l'action */}
      <ParcoursHebergeur id="heberger" showTypes />
      <Section>
        <Disclosure titre={formulaires.hebergeur.titre} hint={formulaires.hebergeur.hint}>
          <HebergeurForm />
        </Disclosure>
        <div className="mt-6">
          <Disclosure quiet titre={formulaires.dispo.titre}>
            <DispoForm />
          </Disclosure>
        </div>
      </Section>

      <ParcoursReferent id="referent" />
      <Section>
        <Disclosure titre={formulaires.benevole.titre} hint={formulaires.benevole.hint}>
          <BenevoleForm />
        </Disclosure>
      </Section>

      <GalerieMedias id="galerie" />
      <Ressources id="ressources" />
      <SiteFooter />
    </div>
  );
}
