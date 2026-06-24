import { Section } from "@/components/site/ui/Section";
import { plaidoyer } from "@/components/site/content";

export function Plaidoyer() {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl text-aubergine sm:text-4xl">{plaidoyer.titre}</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/85">
          {plaidoyer.paragraphes.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
