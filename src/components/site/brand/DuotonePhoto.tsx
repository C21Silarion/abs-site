import { useId } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

/*
 * Placeholder « photo » traitée en bichromie + tramée (effet dithering),
 * cf. CDC §3. Pas de vraies photos disponibles : on évoque le rendu final
 * (dégradé lavande → crème + trame de points) avec une légende.
 */
export function DuotonePhoto({
  label,
  className,
  ratio = "aspect-[4/3]",
}: {
  label?: string;
  className?: string;
  ratio?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-lg border border-lavande-soft",
        ratio,
        className,
      )}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--aubergine)" />
            <stop offset="55%" stopColor="var(--lavande)" />
            <stop offset="100%" stopColor="var(--peach)" />
          </linearGradient>
          <pattern id={`d-${id}`} width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="var(--creme)" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${id})`} />
        <rect width="100%" height="100%" fill={`url(#d-${id})`} />
      </svg>
      {label && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-aubergine/70 px-3 py-2 text-xs font-medium text-creme backdrop-blur-sm">
          <ImageIcon className="h-3.5 w-3.5 shrink-0" />
          {label}
        </figcaption>
      )}
    </figure>
  );
}
