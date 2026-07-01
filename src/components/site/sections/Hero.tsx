import { HandHeart, HouseHeart } from "lucide-react";
import { Logo } from "@/components/site/brand/Logo";
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
    <section className="relative overflow-hidden bg-gradient-to-b from-peach/70 to-transparent px-5 pb-20 pt-10">
      <div className="relative mx-auto w-full max-w-5xl text-center">
        <Logo variant="wordmark" className="mx-auto mb-0 h-24 sm:h-52" />

        <h1 className="mx-auto max-w-3xl text-balance text-4xl leading-tight text-aubergine sm:text-5xl">
          {hero.accroche}
        </h1>
        <div className="relative mx-auto mt-9 max-w-2xl">
          {/* Halo crème flou : atténue le fil conducteur derrière le sous-titre
              (même traitement que le bloc « Pourquoi nous agissons »). */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-4 rounded-[3rem] bg-background/70 blur-2xl"
          />
          <p className="relative text-lg text-foreground/90 sm:text-xl">
            {hero.sousTitre}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <PaperButton variant="warm" {...hebergerCta}>
            <HouseHeart className="h-5 w-5" />
            {hero.ctaHeberger}
          </PaperButton>
          <PaperButton variant="solid" {...referentCta}>
            <HandHeart className="h-5 w-5" />
            {hero.ctaReferent}
          </PaperButton>
        </div>
      </div>
    </section>
  );
}
