import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Bouton de marque ABS.
 * - warm    : orange chaleureux (parcours hébergeur)
 * - solid   : aubergine solide (parcours référent)
 * - outline : contour aubergine sur fond clair
 * Respect a11y CDC : texte clair sur fonds orange/aubergine, jamais l'inverse.
 *
 * Rend un <Link> (prop `to`), un <a> (prop `href`) ou un <button> (sinon).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        warm: "bg-orange text-orange-foreground hover:bg-orange/90 shadow-sm",
        solid: "bg-aubergine text-creme hover:bg-aubergine-deep shadow-sm",
        lavande: "bg-lavande text-creme hover:bg-lavande/90 shadow-sm",
        outline:
          "border-2 border-aubergine text-aubergine hover:bg-aubergine hover:text-creme",
        ghost: "text-aubergine hover:bg-peach",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: { variant: "warm", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  /** Lien interne (react-router) */
  to?: string;
  /** Lien externe */
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function Button({
  variant,
  size,
  className,
  children,
  to,
  href,
  target,
  rel,
  download,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (to !== undefined) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  if (href !== undefined) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        download={download}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <button className={classes} type={type} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
