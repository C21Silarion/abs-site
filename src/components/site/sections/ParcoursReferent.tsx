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
      <p className="mt-4 max-w-2xl text-lg text-foreground/80">{parcoursReferent.intro}</p>

      <ul className="mt-8 space-y-4">
        {parcoursReferent.points.map((p) => (
          <li
            key={p.slice(0, 20)}
            className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lavande">
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
