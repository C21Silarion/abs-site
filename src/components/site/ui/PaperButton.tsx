import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import warmSvg from "@/assets/brand/buttonOrange.svg?raw";
import solidSvg from "@/assets/brand/buttonAubergine.svg?raw";
import warmShortSvg from "@/assets/brand/buttonOrangerShort.svg?raw";
import lavandeShortSvg from "@/assets/brand/buttonLavanderShort.svg?raw";
import warmSmallSvg from "@/assets/brand/buttonOrangerSmall.svg?raw";
import warmHoverSvg from "@/assets/brand/buttonOrangeHover.svg?raw";
import solidHoverSvg from "@/assets/brand/buttonAubergineHover.svg?raw";
import warmShortHoverSvg from "@/assets/brand/buttonOrangerShortHover.svg?raw";
import lavandeShortHoverSvg from "@/assets/brand/buttonLavanderShortHover.svg?raw";
import warmSmallHoverSvg from "@/assets/brand/buttonOrangerSmallHover.svg?raw";

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

/** Forme alternative affichée en fondu au survol/focus (silhouette légèrement différente, même teinte). */
const HOVER_SHAPES: Partial<Record<PaperVariant, string>> = {
  warm: warmHoverSvg,
  solid: solidHoverSvg,
  warmShort: warmShortHoverSvg,
  lavandeShort: lavandeShortHoverSvg,
  warmSmall: warmSmallHoverSvg,
};

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
    "group relative inline-flex shrink-0 cursor-pointer items-center justify-center h-14 px-8 text-lg font-bold text-white whitespace-nowrap",
    "transition-transform duration-200 ease-out hover:scale-[1.04] hover:-rotate-1 active:scale-95 active:rotate-0",
    "focus-visible:scale-[1.04] focus-visible:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavande focus-visible:ring-offset-2",
    className,
  );
  const hoverShape = HOVER_SHAPES[variant];
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 pointer-events-none transition-[opacity,filter] duration-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full",
          hoverShape
            ? "group-hover:opacity-0 group-active:opacity-0 group-focus-visible:opacity-0"
            : "group-hover:drop-shadow-[0_11px_10px_rgba(0,0,0,0.15)] group-active:drop-shadow-[0_11px_1px_rgba(0,0,0,0.15)] group-focus-visible:drop-shadow-[0_11px_1px_rgba(0,0,0,0.15)]",
        )}
        dangerouslySetInnerHTML={{ __html: stretch(SHAPES[variant]) }}
      />
      {hoverShape && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-0 drop-shadow-[9px_9px_2px_rgba(0,0,0,0.15)] transition-opacity duration-0 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: stretch(hoverShape) }}
        />
      )}
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
