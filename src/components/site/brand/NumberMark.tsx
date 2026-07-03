import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { NUMBER_VARIANTS } from "@/components/site/brand/numberVariants";

/*
 * Chiffre « fait main » (charte ABS), en filigrane derrière un titre de carte
 * par ex. La couleur se pilote par la prop `fill` ; `variant` = 0 (un), 1
 * (deux), 2 (trois).
 */
export function NumberMark({
  className,
  fill = "var(--orange)",
  variant = 0,
  style,
}: {
  className?: string;
  fill?: string;
  variant?: number;
  style?: CSSProperties;
}) {
  const v = NUMBER_VARIANTS[variant] ?? NUMBER_VARIANTS[0];
  return (
    <svg
      viewBox={v.viewBox}
      className={cn("h-10 w-10", className)}
      style={{ color: fill, ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: v.inner }}
    />
  );
}
