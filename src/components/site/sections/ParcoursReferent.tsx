import { Check } from "lucide-react";
import { Section } from "@/components/site/ui/Section";
import { parcoursReferent } from "@/components/site/content";

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
          className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-[2.5rem] bg-background/40 blur-2xl"
        />
        <p className="relative mx-auto text-lg text-foreground/100">{parcoursReferent.intro}</p>
      </div>

      <ul className="mt-8 space-y-4">
        {parcoursReferent.points.map((p) => (
          <li
            key={p.slice(0, 20)}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lavande">
              <Check className="h-4 w-4 text-creme" />
            </span>
            <span className="text-foreground/85">{p}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (bare) return content;
  return <Section id={id}>{content}</Section>;
}
