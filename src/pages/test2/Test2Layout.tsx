import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/brand/Logo";
import { association } from "@/components/site/content";
import { Fil } from "@/components/site/brand/Fil";
import { HouseScatter } from "@/components/site/brand/HouseScatter";
import { SiteFooter } from "@/components/site/sections/SiteFooter";

/*
 * Maquette MULTIPAGE (CDC §5) — header de navigation commun + pied de page
 * commun aux 4 pages, contenu injecté via <Outlet/>.
 */
const nav = [
  { to: "/test/test2", label: "Accueil", end: true },
  { to: "/test/test2/heberger", label: "Héberger" },
  { to: "/test/test2/referent", label: "Référent·e" },
  { to: "/test/test2/ressources", label: "Ressources" },
];

export default function Test2Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <NavLink to="/test/test2" end aria-label="Accueil ABS">
              <Logo variant="wordmark" className="h-11" />
            </NavLink>
            <span className="hidden whitespace-nowrap text-base font-medium text-orange lg:block">
              {association.baseline}
            </span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-aubergine text-creme"
                      : "text-aubergine hover:bg-peach",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Décor de marque (comme le monopage) : dégradé crème latéral, fil
          conducteur et maisons filigranes, derrière le contenu de chaque page.
          Posé sur <main> (pas sur le conteneur du header sticky : overflow-hidden
          casserait le sticky). */}
      <main
        className="relative grow overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--creme-deep) 0, var(--creme) 400px, var(--creme) calc(100% - 400px), var(--creme-deep) 100%)",
        }}
      >
        <Fil variant="short" className="absolute inset-0 z-0 h-full w-full" />

        <HouseScatter />

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
