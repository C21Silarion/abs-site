import { Logo } from "@/components/site/brand/Logo";
import { HouseMark } from "@/components/site/brand/HouseMark";

export default function ComingSoon() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-creme px-6 py-16">
      <HouseMark className="absolute -bottom-16 right-0 h-96 w-auto opacity-20" fill="var(--lavande)" />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center">
        <Logo className="h-24" />

        <div className="max-w-lg">
          <h1 className="font-display text-4xl leading-tight text-aubergine sm:text-5xl">
            Site en cours de construction
          </h1>
          <p className="mt-5 text-lg text-foreground/70">
            L'association ABS prépare son site public. Revenez bientôt !
          </p>
        </div>

      </div>
    </main>
  );
}
