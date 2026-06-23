import { cn } from "@/lib/utils";

/*
 * « Fil conducteur » : ligne courbe orange qui relie les blocs et guide la
 * lecture (cf. CDC §3). Utilisé comme séparateur entre sections.
 */
export function FilConducteur({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none w-full", className)} aria-hidden="true">
      <svg viewBox="0 0 1200 60" className="h-10 w-full" fill="none" preserveAspectRatio="none">
        <path
          d="M0 30 C 150 -10 260 70 420 30 C 580 -10 690 70 840 32 C 980 0 1080 60 1200 28"
          stroke="var(--orange)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 14"
        />
      </svg>
    </div>
  );
}
