import { cn } from "@/lib/utils";

/* Bande « papier » peach en fondu haut/bas (30px) — au lieu d'un aplat à arêtes
   nettes, se fond dans le dégradé de fond. Utilisée via la prop `band`. */
const BAND_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to bottom, transparent 0, rgb(253 231 223 / 0.4) 30px, rgb(253 231 223 / 0.4) calc(100% - 30px), transparent 100%)",
};

/* Conteneur de section : largeur max + rythme vertical homogènes. */
export function Section({
  id,
  className,
  containerClassName,
  style,
  band = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  band?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 px-5 py-16 sm:py-20", className)}
      style={band ? { ...BAND_STYLE, ...style } : style}
    >
      <div className={cn("mx-auto w-full max-w-5xl", containerClassName)}>{children}</div>
    </section>
  );
}
