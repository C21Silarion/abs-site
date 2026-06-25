import { cn } from "@/lib/utils";

/* Conteneur de section : largeur max + rythme vertical homogènes. */
export function Section({
  id,
  className,
  containerClassName,
  style,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-5 py-16 sm:py-20", className)} style={style}>
      <div className={cn("mx-auto w-full max-w-5xl", containerClassName)}>{children}</div>
    </section>
  );
}
