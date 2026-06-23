import { PageHeader } from "@/components/site/ui/PageHeader";
import { Section } from "@/components/site/ui/Section";
import { ParcoursReferent } from "@/components/site/sections/ParcoursReferent";
import { Faq } from "@/components/site/ui/Faq";
import { Le116FormPlaceholder } from "@/components/site/ui/Le116FormPlaceholder";
import { faqReferent } from "@/components/site/content";

/* Page 3 — Devenir référent·e (CDC §5) : valoriser le rôle pivot des bénévoles. */
export default function Referent() {
  return (
    <>
      <PageHeader
        surtitre="S'engager autrement"
        titre="Devenir référent·e"
        intro="Le rôle de l'ombre qui change tout : faire le lien, rassurer, accompagner. Sans être expert·e, juste présent·e."
      />

      <ParcoursReferent />

      <Section className="bg-peach/40">
        <h2 className="text-3xl text-aubergine sm:text-4xl">Questions fréquentes</h2>
        <div className="mt-8">
          <Faq items={faqReferent} />
        </div>
      </Section>

      <Section>
        <Le116FormPlaceholder
          titre="Je deviens bénévole / référent·e"
          intitule="Rejoignez l'équipe : indiquez vos disponibilités et votre secteur, on vous explique tout lors d'un premier échange."
        />
      </Section>
    </>
  );
}
