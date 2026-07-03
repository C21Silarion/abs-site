import { ShieldCheck, Check } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { NumberMark } from "@/components/site/brand/NumberMark";
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
      <div className="relative mt-4 max-w-2xl">
        <p className="relative text-lg text-foreground/100">{parcoursHebergeur.intro}</p>
      </div>

      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {parcoursHebergeur.etapes.map((e, i) => (
          <li
            key={e.numero}
            className="relative flex min-h-56 flex-col justify-center overflow-hidden rounded-2xl border border-border bg-card p-5"
          >
            <div className="relative">
              <NumberMark
                variant={i}
                fill="var(--orange)"
                className="pointer-events-none absolute -top-5 -left-4 h-20 w-20"
              />
              <h3 className="mx-14 mt-1 text-xl text-aubergine">{e.titre}</h3>
            </div>
            <p className="mt-4 mx-auto text-foreground/100">{e.texte}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex items-start gap-3 rounded-xl bg-lavande/90 p-5">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
        <p className="text-white/100">{parcoursHebergeur.assurance}</p>
      </div>

      {showTypes && (
        <div className="mt-8">
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
