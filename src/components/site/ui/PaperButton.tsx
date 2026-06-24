import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const ORANGE_POINTS =
  "6.03 12.254 17.026 4.607 89.143 5.244 164.816 2.696 234.346 3.651 255.367 2.058 249.546 16.396 254.072 53.038 241.137 55.906 168.373 53.676 79.117 54.313 35.136 53.676 15.733 43.48 5.707 44.754";

const AUBERGINE_PATH =
  "M 7.988 14.865 L 11.478 2.323 L 57.813 3.612 L 163.837 7.265 L 215.744 2.672 L 247.534 6.627 L 252.157 20.639 C 252.163 20.546 249.985 41.551 249.829 41.289 L 251.907 56.232 L 167.394 56.94 L 84.339 49.418 L 30.567 54.329 L 10.185 53.923 L 5.707 44.754 Z";

function Shape({ variant }: { variant: "warm" | "solid" }) {
  return (
    <svg
      viewBox="0 0 260 60"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {variant === "warm" ? (
        <polygon points={ORANGE_POINTS} fill="var(--orange)" />
      ) : (
        <path d={AUBERGINE_PATH} fill="var(--aubergine)" />
      )}
    </svg>
  );
}

type Props = {
  variant?: "warm" | "solid";
  className?: string;
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

export function PaperButton({ variant = "warm", className, children, to, onClick }: Props) {
  const cls = cn(
    "relative inline-flex shrink-0 items-center h-14 px-8 text-lg font-semibold text-creme whitespace-nowrap",
    className,
  );

  if (to)
    return (
      <Link to={to} className={cls}>
        <Shape variant={variant} />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      <Shape variant={variant} />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
