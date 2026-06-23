import { cn } from "@/lib/utils";
import { association } from "@/components/site/content";
import logoOrange from "@/assets/brand/logo-abs-orange-baseline-wide.svg";
import logoWordmark from "@/assets/brand/logo-abs-no-baseline.svg";
import logoCreme from "@/assets/brand/logo-abs-mono-creme.svg";

/*
 * Logotype officiel ABS (charte).
 * - variant="full"     : logotype orange complet (sigle + baseline). Fonds clairs.
 * - variant="wordmark" : sigle ABS orange seul (sans baseline). Usages compacts (header).
 * - variant="creme"    : sigle ABS en crème, pour fonds sombres (footer).
 * La hauteur se règle via `className` (ex. h-12).
 */
const SOURCES = {
  full: logoOrange,
  wordmark: logoWordmark,
  creme: logoCreme,
} as const;

export function Logo({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: keyof typeof SOURCES;
}) {
  const src = SOURCES[variant];
  return (
    <img
      src={src}
      alt={`${association.nom} — ${association.baseline}`}
      className={cn("block h-12 w-auto select-none", className)}
      draggable={false}
    />
  );
}
