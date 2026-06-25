import { Section } from "@/components/site/ui/Section";
import { plaidoyer } from "@/components/site/content";

export function Plaidoyer() {
  return (
    <Section>
      <div className="relative mx-auto max-w-3xl">
        {/* Halo crème flou : atténue le fil conducteur derrière le texte avec des
            bords FONDUS (pas d'arête nette comme un panneau plein). Régler
            l'intensité via l'opacité (/80) et l'ampleur du fondu via le flou. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-[3rem] bg-background/80 blur-2xl"
        />
        <div className="relative">
          <h2 className="text-3xl text-aubergine sm:text-4xl">{plaidoyer.titre}</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-foreground/85">
            {plaidoyer.paragraphes.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
