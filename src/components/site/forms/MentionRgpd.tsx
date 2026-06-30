import { Link } from "react-router-dom";
import { useFormTone } from "@/components/site/form/tone";

export function MentionRgpd({ children }: { children: React.ReactNode }) {
  const tone = useFormTone();
  const cls =
    tone === "aubergine"
      ? "border-creme/20 text-creme/60"
      : "border-border text-muted-foreground";
  return (
    <p className={`mt-4 border-t pt-4 text-xs leading-relaxed ${cls}`}>
      {children}{" "}
      <Link to="/vie-privee" className="underline underline-offset-2">
        En savoir plus sur vos données
      </Link>
    </p>
  );
}
