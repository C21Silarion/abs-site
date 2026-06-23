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
    <header className="relative overflow-hidden bg-gradient-to-b from-peach/70 to-background px-5 py-16 sm:py-20">
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
        {intro && <p className="mt-5 max-w-2xl text-lg text-foreground/80">{intro}</p>}
      </div>
    </header>
  );
}
