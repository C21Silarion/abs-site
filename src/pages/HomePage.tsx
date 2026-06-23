import { Link } from "react-router-dom";
import { ArrowRight, LayoutList, Files } from "lucide-react";
import { Logo } from "@/components/site/brand/Logo";

/* Page d'index : accès aux deux maquettes comparatives (CDC §4 vs §5). */
export default function HomePage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-10 bg-background px-6 py-16">
      <Logo className="h-20" />

      <div className="max-w-xl text-center">
        <h1 className="text-3xl text-aubergine sm:text-4xl">Maquettes du site public</h1>
        <p className="mt-4 text-foreground/75">
          Deux architectures candidates pour le même contenu, à comparer.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
        <Link
          to="/test1"
          className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-orange"
        >
          <LayoutList className="h-8 w-8 text-orange" />
          <h2 className="mt-4 text-xl text-aubergine">Version 1 — Monopage</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Parcours descendant sur une seule page (CDC §4).
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange">
            Voir /test1 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/test2"
          className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-orange"
        >
          <Files className="h-8 w-8 text-lavande" />
          <h2 className="mt-4 text-xl text-aubergine">Version 2 — Multipage</h2>
          <p className="mt-2 text-sm text-foreground/70">
            Arborescence de 4 pages dédiées (CDC §5).
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange">
            Voir /test2 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </main>
  );
}
