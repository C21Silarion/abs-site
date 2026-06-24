import { ArrowRight, HeartHandshake } from "lucide-react";
import { Logo } from "@/components/site/brand/Logo";
import { HouseMark } from "@/components/site/brand/HouseMark";
import { PaperButton } from "@/components/site/ui/PaperButton";
import { hero } from "@/components/site/content";

/*
 * Bloc héros avec les deux CTA jumeaux (aiguillage double voie, cf. CDC §4/§5).
 * ctaMode="scroll" → défile vers une ancre (maquette monopage /test1).
 * ctaMode="link"   → redirige vers une page dédiée (maquette multipage /test2).
 */
export function Hero({
  ctaMode,
  hebergerTarget,
  referentTarget,
}: {
  ctaMode: "scroll" | "link";
  hebergerTarget: string;
  referentTarget: string;
}) {
  const scrollTo = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const hebergerCta =
    ctaMode === "scroll"
      ? { onClick: scrollTo(hebergerTarget) }
      : { to: hebergerTarget };
  const referentCta =
    ctaMode === "scroll"
      ? { onClick: scrollTo(referentTarget) }
      : { to: referentTarget };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach/70 to-background px-5 pb-20 pt-10">
      {/* maisons « fait main » en filigrane */}
      <HouseMark
        className="absolute -right-6 top-10 h-44 w-44 rotate-6 opacity-10"
        fill="var(--lavande)"
      />
      <HouseMark
        className="absolute -left-8 bottom-0 h-32 w-32 -rotate-12 opacity-10"
        fill="var(--orange)"
      />

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <Logo className="mx-auto mb-10 h-32 sm:h-44" />

        <h1 className="mx-auto max-w-3xl text-balance text-4xl leading-tight text-aubergine sm:text-6xl">
          {hero.accroche}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl">
          {hero.sousTitre}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <PaperButton variant="warm" {...hebergerCta}>
            <HeartHandshake className="h-5 w-5" />
            {hero.ctaHeberger}
          </PaperButton>
          <PaperButton variant="solid" {...referentCta}>
            {hero.ctaReferent}
            <ArrowRight className="h-5 w-5" />
          </PaperButton>
        </div>
      </div>
    </section>
  );
}
