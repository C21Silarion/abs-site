import { cn } from "@/lib/utils";

/*
 * Silhouette de maison « fait main » (charte ABS, maison.svg).
 * Tracé inliné pour rester recolorable via `fill` (filigranes lavande/orange…).
 */
const HOUSE_POINTS =
  "260.025 35.088 204.887 85.84 165.414 129.699 162.281 112.782 133.459 120.301 134.712 151.629 108.396 169.799 92.732 189.223 70.175 203.634 57.018 224.937 102.13 223.684 92.732 318.922 96.491 353.383 93.358 433.584 394.737 432.331 396.617 337.093 391.604 246.867 399.749 231.83 445.489 233.083 389.724 160.401 331.454 89.599";

export function HouseMark({
  className,
  fill = "var(--aubergine)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      viewBox="0 0 500 500"
      className={cn("h-10 w-10", className)}
      aria-hidden="true"
    >
      <polygon points={HOUSE_POINTS} fill={fill} />
    </svg>
  );
}
