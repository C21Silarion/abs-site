import { ShieldCheck, Check } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { NumberMark } from "@/components/site/brand/NumberMark";
import { paperCorners } from "@/components/site/brand/paperCorners";
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
      <div className="relative max-w-2xl">
        {/* Halo crème flou : atténue le fil conducteur derrière le titre et l'intro. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-[2.5rem] bg-background/40 blur-2xl"
        />
        <h2 className="relative text-3xl text-aubergine sm:text-4xl">{parcoursHebergeur.titre}</h2>
        <p className="relative mt-4 text-lg text-foreground/100">{parcoursHebergeur.intro}</p>
      </div>

      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {parcoursHebergeur.etapes.map((e, i) => {
          const pc = paperCorners(70 + i, 16);
          return (
            <li key={e.numero} style={pc.outer} className="bg-border">
              <div
                style={pc.inner}
                className="flex h-full min-h-56 flex-col justify-start overflow-hidden bg-card p-5"
              >
                <div className="relative min-h-16">
                  <NumberMark
                    variant={i}
                    fill="var(--orange)"
                    className="pointer-events-none absolute -top-4 -left-4 h-20 w-20"
                  />
                  <h3 className="ml-12 text-center mt-1 text-xl text-aubergine">{e.titre}</h3>
                </div>
                <p className="mt-4 mx-auto text-left text-foreground/100">{e.texte}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div style={paperCorners(120, 16).inner} className="mt-8 flex items-start gap-3 bg-lavande/100 p-5">
        <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-white" />
        <p className="text-white/100">{parcoursHebergeur.assurance}</p>
      </div>

      {showTypes && (
        <div className="mt-8">
          <h3 className="text-2xl text-aubergine">Ce que vous pouvez proposer</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {typesHebergement.map((t, i) => {
              const pc = paperCorners(90 + i, 9);
              return (
                <li key={t} style={pc.outer} className="bg-border">
                  <div style={pc.inner} className="flex h-full items-start gap-3 bg-card px-4 py-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
                    <span className="text-foreground/85">{t}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );

  if (bare) return content;
  return <Section id={id}>{content}</Section>;
}
