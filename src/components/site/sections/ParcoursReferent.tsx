import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { paperCorners } from "@/components/site/brand/paperCorners";
import { parcoursReferent, missionsBenevolat } from "@/components/site/content";

export function ParcoursReferent({
  id,
  bare = false,
}: {
  id?: string;
  bare?: boolean;
}) {
  const content = (
    <>
      <h2 className="text-3xl text-aubergine sm:text-4xl">{parcoursReferent.titre}</h2>
      <div className="relative mt-4 max-w-2xl">
        {/* Halo crème flou : atténue le fil conducteur derrière l'intro. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-[2.5rem] bg-background/60 blur-2xl"
        />
        <p className="relative mx-auto text-lg text-foreground/100">{parcoursReferent.intro}</p>
      </div>

      {/* Cartes de points (liste `parcoursReferent.points`) désactivées au profit
          des missions bénévoles officielles ci-dessous — à réactiver au besoin. */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {missionsBenevolat.map((m, index) => {
          const pc = paperCorners(110 + index, 16);
          return (
            <a
              key={m.titre}
              href={m.url}
              target="_blank"
              rel="noreferrer"
              style={pc.outer}
              className="group block bg-border transition hover:bg-orange"
            >
              <div style={pc.inner} className="flex h-full flex-col bg-card p-6">
                <h3 className="text-xl text-aubergine">{m.titre}</h3>
                <p className="mt-2 grow text-base text-foreground/75">{m.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-base font-semibold text-orange">
                  Découvrir la mission
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );

  if (bare) return content;
  return <Section id={id}>{content}</Section>;
}
