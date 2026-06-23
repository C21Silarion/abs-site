import { ShieldCheck, Check } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import {
  parcoursHebergeur,
  typesHebergement,
} from "@/components/site/content";

/*
 * Parcours hébergeur : frise en 3 étapes + encart assurance.
 * `showTypes` ajoute la liste des formes d'hébergement possibles.
 * `as` permet d'utiliser un <section id> (monopage) ou un simple bloc.
 */
export function ParcoursHebergeur({
  id,
  showTypes = false,
  bare = false,
}: {
  id?: string;
  showTypes?: boolean;
  bare?: boolean;
}) {
  const content = (
    <>
      <h2 className="text-3xl text-aubergine sm:text-4xl">{parcoursHebergeur.titre}</h2>
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">{parcoursHebergeur.intro}</p>

      <ol className="mt-10 grid gap-6 md:grid-cols-3">
        {parcoursHebergeur.etapes.map((e) => (
          <li
            key={e.numero}
            className="relative rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange font-display text-xl font-semibold text-orange-foreground">
              {e.numero}
            </span>
            <h3 className="mt-4 text-xl text-aubergine">{e.titre}</h3>
            <p className="mt-2 text-foreground/80">{e.texte}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-start gap-3 rounded-xl bg-lavande/15 p-5">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-lavande" />
        <p className="text-foreground/90">{parcoursHebergeur.assurance}</p>
      </div>

      {showTypes && (
        <div className="mt-10">
          <h3 className="text-2xl text-aubergine">Ce que vous pouvez proposer</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {typesHebergement.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                <span className="text-foreground/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  if (bare) return content;
  return <Section id={id}>{content}</Section>;
}
