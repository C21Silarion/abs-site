import { useState } from "react";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useFormTone, type FormTone } from "./tone";

/*
 * Primitives de formulaire stylées à l'identité du site (crème/aubergine).
 * Toute la présentation des formulaires publics passe par ici : un futur
 * changement de look & feel ne touche que ce fichier + les tokens d'index.css.
 * La teinte (light / aubergine) est lue dans le contexte FormTone.
 */

const CONTROL_BASE =
  "rounded-lg px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function controlTone(tone: FormTone): string {
  return tone === "aubergine"
    ? "border border-creme/30 bg-creme text-aubergine placeholder:text-aubergine/50"
    : "border border-input bg-background text-foreground placeholder:text-muted-foreground";
}

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
  const tone = useFormTone();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className={cn("text-sm font-medium", tone === "aubergine" ? "text-creme" : "text-aubergine")}>
        {label}
      </label>
      {hint && <p className={cn("text-xs", tone === "aubergine" ? "text-creme/70" : "text-muted-foreground")}>{hint}</p>}
      {children}
    </div>
  );
}

export function TextField({ className, ...props }: React.ComponentProps<"input">) {
  const tone = useFormTone();
  return <input {...props} className={cn(CONTROL_BASE, controlTone(tone), "h-11", className)} />;
}

export function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
  const tone = useFormTone();
  return <textarea {...props} className={cn(CONTROL_BASE, controlTone(tone), "min-h-[5rem] py-2", className)} />;
}

export function SelectField({ className, ...props }: React.ComponentProps<"select">) {
  const tone = useFormTone();
  return <select {...props} className={cn(CONTROL_BASE, controlTone(tone), "h-11", className)} />;
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
function isoToDate(iso: string): Date | undefined {
  if (!iso) return undefined;
  const d = new Date(`${iso}T12:00:00`);
  return isValid(d) ? d : undefined;
}

/**
 * Champ date au format français : saisie texte jj/mm/aaaa + calendrier
 * (react-day-picker, locale fr) dans un Popover — identique à l'outil interne.
 * Valeur interne "yyyy-MM-dd".
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
  const tone = useFormTone();
  const [local, setLocal] = useState(() => isoToDisplay(value));
  const [lastValue, setLastValue] = useState(value);
  const [open, setOpen] = useState(false);

  // Reflète les changements externes de `value` (ex. auto-remplissage de la date
  // de fin) sans gêner la frappe : ajustement à la volée quand la prop change.
  if (value !== lastValue) {
    setLastValue(value);
    setLocal(isoToDisplay(value));
  }

  const selectedDate = isoToDate(value);

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
        className={cn(CONTROL_BASE, controlTone(tone), "h-11 min-w-0 flex-1", className)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "h-11 w-11 shrink-0",
              tone === "aubergine" && "border-creme/30 bg-creme text-aubergine hover:bg-creme/90",
            )}
            aria-label="Choisir une date dans le calendrier"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            defaultMonth={selectedDate ?? new Date()}
            captionLayout="dropdown"
            locale={fr}
            onSelect={(date) => {
              if (!date) return;
              onChange(format(date, "yyyy-MM-dd"));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
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
  const tone = useFormTone();
  return (
    <div className="space-y-2 py-6 text-center">
      <p className={cn("font-display text-xl", tone === "aubergine" ? "text-creme" : "text-aubergine")}>{titre}</p>
      <p className={tone === "aubergine" ? "text-creme/80" : "text-foreground/75"}>{message}</p>
    </div>
  );
}
