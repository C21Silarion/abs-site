import { PageHeader } from "@/components/site/ui/PageHeader";
import { Section } from "@/components/site/ui/Section";
import { ParcoursReferent } from "@/components/site/sections/ParcoursReferent";
import { Faq } from "@/components/site/ui/Faq";
import { Disclosure } from "@/components/site/ui/Disclosure";
import { BenevoleForm } from "@/components/site/forms/BenevoleForm";
import { faqReferent, formulaires } from "@/components/site/content";

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

      <Section band>
        <h2 className="text-3xl text-aubergine sm:text-4xl">Questions fréquentes</h2>
        <div className="mt-8">
          <Faq items={faqReferent} />
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Disclosure tone="aubergine" titre={formulaires.benevole.titre} hint={formulaires.benevole.hint}>
          <BenevoleForm />
        </Disclosure>
      </Section>
    </>
  );
}
