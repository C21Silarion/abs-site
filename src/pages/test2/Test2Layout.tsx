import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/brand/Logo";
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
          <NavLink to="/test/test2" end aria-label="Accueil ABS">
            <Logo variant="wordmark" className="h-11" />
          </NavLink>
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

      <main className="grow">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
