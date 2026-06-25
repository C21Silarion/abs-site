import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import warmSvg from "@/assets/brand/buttonOrange.svg?raw";
import solidSvg from "@/assets/brand/buttonAubergine.svg?raw";
import warmShortSvg from "@/assets/brand/buttonOrangerShort.svg?raw";
import lavandeShortSvg from "@/assets/brand/buttonLavanderShort.svg?raw";
import warmSmallSvg from "@/assets/brand/buttonOrangerSmall.svg?raw";

/*
 * Bouton « papier découpé » : la forme est le fichier SVG lui-même (importé en
 * ?raw → mis à jour dynamiquement quand tu édites le .svg, HMR en dev), étirée
 * pour remplir le bouton, texte crème centré par-dessus.
 *
 * Pourquoi inline (dangerouslySetInnerHTML) et pas <img src> : un <img> honore
 * le preserveAspectRatio interne du SVG (≈ object-fit: contain) et ne remplit
 * pas le bouton. On injecte donc preserveAspectRatio="none" dans le SVG et on
 * l'embarque inline. Contenu = nos propres assets build-time (pas de risque XSS).
 */
const SHAPES = {
  warm: warmSvg,
  solid: solidSvg,
  warmShort: warmShortSvg,
  lavandeShort: lavandeShortSvg,
  warmSmall: warmSmallSvg,
} as const;

export type PaperVariant = keyof typeof SHAPES;

/** Force le SVG à s'étirer à la boîte du bouton (sinon il garde son aspect). */
function stretch(raw: string): string {
  return raw.includes("preserveAspectRatio")
    ? raw
    : raw.replace("<svg", '<svg preserveAspectRatio="none"');
}

type Props = {
  variant?: PaperVariant;
  className?: string;
  children: React.ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function PaperButton({
  variant = "warm",
  className,
  children,
  to,
  href,
  target,
  rel,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: Props) {
  const cls = cn(
    "relative inline-flex shrink-0 items-center justify-center h-14 px-8 text-lg font-semibold text-creme whitespace-nowrap",
    className,
  );
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: stretch(SHAPES[variant]) }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (to) return <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>{inner}</Link>;
  if (href)
    return (
      <a href={href} className={cls} target={target} rel={rel} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  return <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>{inner}</button>;
}
