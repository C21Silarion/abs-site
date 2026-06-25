import { PageHeader } from "@/components/site/ui/PageHeader";
import { Section } from "@/components/site/ui/Section";
import { ParcoursHebergeur } from "@/components/site/sections/ParcoursHebergeur";
import { Faq } from "@/components/site/ui/Faq";
import { Disclosure } from "@/components/site/ui/Disclosure";
import { HebergeurForm } from "@/components/site/forms/HebergeurForm";
import { DispoForm } from "@/components/site/forms/DispoForm";
import { faqHebergeur, formulaires } from "@/components/site/content";

/* Page 2 — Devenir hébergeur·euse (CDC §5) : rassurance + processus + action. */
export default function Heberger() {
  return (
    <>
      <PageHeader
        surtitre="Accueillir chez soi"
        titre="Ouvrir sa porte, en toute sécurité"
        intro="Un cadre clair, réversible et accompagné. Vous offrez un toit ; ABS s'occupe du reste."
      />

      <ParcoursHebergeur showTypes />

      <Section band>
        <h2 className="text-3xl text-aubergine sm:text-4xl">Le cadre de sécurité</h2>
        <div className="relative mt-4 max-w-2xl">
          {/* Halo crème flou : atténue le fil conducteur derrière le texte. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-[2.5rem] bg-background/70 blur-2xl"
          />
          <p className="relative text-lg text-foreground/80">
            Vous n'êtes jamais seul·e : un·e référent·e veille sur chaque accueil, et
            l'assurance est prise en charge par l'association.
          </p>
        </div>
        <div className="mt-8">
          <Faq items={faqHebergeur} />
        </div>
      </Section>

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
    </>
  );
}
