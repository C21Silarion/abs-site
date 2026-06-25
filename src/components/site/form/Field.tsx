import { useState } from "react";
import { Calendar } from "lucide-react";
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

export function SelectField({ className, ...props }: React.ComponentProps<"select">) {
  return <select {...props} className={cn(CONTROL, "h-11", className)} />;
}

/* Helpers de saisie au format français jj/mm/aaaa (valeur interne "yyyy-MM-dd"). */
function isoToDisplay(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : iso;
}
function autoFormat(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}
function displayToIso(text: string): string {
  const m = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!m) return "";
  return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

/**
 * Champ date au format français (saisie texte jj/mm/aaaa), comme les anciens
 * formulaires. Valeur interne "yyyy-MM-dd". Léger : pas de calendrier ni de
 * dépendance date externe.
 */
export function DateField({
  value,
  onChange,
  className,
  ...props
}: {
  value: string;
  onChange: (v: string) => void;
} & Omit<React.ComponentProps<"input">, "value" | "onChange" | "type">) {
  const [local, setLocal] = useState(() => isoToDisplay(value));
  const [lastValue, setLastValue] = useState(value);

  // Reflète les changements externes de `value` (ex. auto-remplissage de la
  // date de fin) sans gêner la frappe : ajustement à la volée quand la prop
  // change (la frappe ne modifie que `local`, pas `value`).
  if (value !== lastValue) {
    setLastValue(value);
    setLocal(isoToDisplay(value));
  }

  return (
    <div className="flex items-center gap-1">
      <input
        {...props}
        type="text"
        inputMode="numeric"
        placeholder="jj/mm/aaaa"
        value={local}
        onChange={(e) => setLocal(autoFormat(e.target.value))}
        onBlur={() => {
          const iso = displayToIso(local);
          onChange(iso);
          setLocal(isoToDisplay(iso));
        }}
        className={cn(CONTROL, "h-11 min-w-0 flex-1", className)}
      />
      {/* Sélecteur calendrier : input date natif transparent superposé à l'icône
          (zéro dépendance ; valeur "yyyy-MM-dd" alimentée directement). */}
      <span className="relative inline-flex h-11 w-11 shrink-0">
        <span
          aria-hidden
          className="pointer-events-none flex h-11 w-11 items-center justify-center rounded-lg border border-input bg-background text-muted-foreground"
        >
          <Calendar className="h-4 w-4" />
        </span>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Choisir une date dans le calendrier"
          tabIndex={-1}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </span>
    </div>
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
