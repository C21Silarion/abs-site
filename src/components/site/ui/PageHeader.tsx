import { HouseMark } from "@/components/site/brand/HouseMark";

/* Entête de page interne (maquette multipage). */
export function PageHeader({
  surtitre,
  titre,
  intro,
}: {
  surtitre?: string;
  titre: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-peach/70 to-transparent px-5 py-16 sm:py-20">
      <HouseMark
        className="absolute -right-6 -top-6 h-40 w-40 rotate-6 opacity-10"
        fill="var(--lavande)"
      />
      <div className="relative mx-auto w-full max-w-5xl">
        {surtitre && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange">
            {surtitre}
          </p>
        )}
        <h1 className="max-w-3xl text-balance text-4xl text-aubergine sm:text-5xl">
          {titre}
        </h1>
        {intro && (
          <div className="relative mt-5 max-w-2xl">
            {/* Halo crème flou : atténue le fil conducteur derrière l'intro. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-[2.5rem] bg-background/70 blur-2xl"
            />
            <p className="relative text-lg text-foreground/80">{intro}</p>
          </div>
        )}
      </div>
    </header>
  );
}
