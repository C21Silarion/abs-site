import { PageHeader } from "@/components/site/ui/PageHeader";
import { Section } from "@/components/site/ui/Section";
import { ParcoursHebergeur } from "@/components/site/sections/ParcoursHebergeur";
import { Faq } from "@/components/site/ui/Faq";
import { Le116FormPlaceholder } from "@/components/site/ui/Le116FormPlaceholder";
import { faqHebergeur } from "@/components/site/content";

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

      <Section className="bg-peach/40">
        <h2 className="text-3xl text-aubergine sm:text-4xl">Le cadre de sécurité</h2>
        <p className="mt-4 max-w-2xl text-lg text-foreground/80">
          Vous n'êtes jamais seul·e : un·e référent·e veille sur chaque accueil, et
          l'assurance est prise en charge par l'association.
        </p>
        <div className="mt-8">
          <Faq items={faqHebergeur} />
        </div>
      </Section>

      <Section>
        <Le116FormPlaceholder
          titre="Je propose un hébergement"
          intitule="Laissez-nous vos coordonnées : un·e bénévole vous recontacte pour faire connaissance, sans engagement."
        />
      </Section>
    </>
  );
}
