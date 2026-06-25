import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/brand/Logo";
import { association } from "@/components/site/content";
import { Fil } from "@/components/site/brand/Fil";
import { HouseMark } from "@/components/site/brand/HouseMark";
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

        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <HouseMark variant={1} fill="var(--lavande)"  className="absolute left-[12%] top-[18%] h-40 w-40 -rotate-6 opacity-[0.08]" />
          <HouseMark variant={2} fill="var(--orange)"   className="absolute right-[14%] top-[33%] h-36 w-36 rotate-12 opacity-[0.07]" />
          <HouseMark variant={3} fill="var(--aubergine)" className="absolute left-[40%] top-[48%] h-28 w-28 rotate-3 opacity-[0.06]" />
          <HouseMark variant={4} fill="var(--lavande)"  className="absolute right-[22%] top-[62%] h-44 w-44 -rotate-12 opacity-[0.08]" />
          <HouseMark variant={5} fill="var(--orange)"   className="absolute left-[26%] top-[78%] h-32 w-32 rotate-6 opacity-[0.07]" />
        </div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
