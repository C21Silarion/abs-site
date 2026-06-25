import { cn } from "@/lib/utils";

/*
 * Primitives de formulaire stylées à l'identité du site (crème/aubergine).
 * Toute la présentation des formulaires publics passe par ici : un futur
 * changement de look & feel ne touche que ce fichier + les tokens d'index.css.
 */

/** Classe partagée des champs texte (cf. pattern InscriptionForm). */
const CONTROL =
  "rounded-lg border border-input bg-background px-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Libellé + texte d'aide optionnel + contrôle. */
export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-aubergine">
        {label}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

export function TextField({ className, ...props }: React.ComponentProps<"input">) {
  return <input {...props} className={cn(CONTROL, "h-11", className)} />;
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(CONTROL, "min-h-[5rem] py-2", className)} />;
}

/** Champ date léger (input natif), valeur interne "yyyy-MM-dd". */
export function DateField({
  value,
  onChange,
  className,
  ...props
}: {
  value: string;
  onChange: (v: string) => void;
} & Omit<React.ComponentProps<"input">, "value" | "onChange" | "type">) {
  return (
    <input
      {...props}
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(CONTROL, "h-11", className)}
    />
  );
}

/**
 * Honeypot anti-bot : champ caché aux humains, parfois rempli par les bots.
 * Nom neutre + data-*-ignore pour échapper à l'autocomplétion et aux
 * gestionnaires de mots de passe (évite les faux positifs).
 */
export function Honeypot(props: React.ComponentProps<"input">) {
  return (
    <input
      type="text"
      name="hp"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      data-1p-ignore="true"
      data-lpignore="true"
      data-form-type="other"
      style={{ display: "none" }}
      {...props}
    />
  );
}

/** Bandeau d'erreur(s) de validation, au-dessus du formulaire. */
export function FormErrors({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  return (
    <div className="space-y-0.5 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
      {errors.map((e, i) => <p key={i}>{e}</p>)}
    </div>
  );
}

/** Écran de confirmation après envoi réussi. */
export function FormDone({ titre, message }: { titre: string; message: string }) {
  return (
    <div className="space-y-2 py-6 text-center">
      <p className="font-display text-xl text-aubergine">{titre}</p>
      <p className="text-foreground/75">{message}</p>
    </div>
  );
}
