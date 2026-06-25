import { useState } from "react";
import { submitPublicHebergeurDispo } from "@/lib/publicApi";
import { usePublicFormToken } from "@/lib/usePublicFormToken";
import { Button } from "@/components/site/ui/Button";
import { Field, TextField, TextArea, DateField, Honeypot, FormErrors, FormDone } from "@/components/site/form/Field";

function addOneDay(ymd: string): string {
  if (!ymd) return "";
  const d = new Date(ymd + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

function ymdToSec(ymd: string): number | null {
  if (!ymd) return null;
  const t = new Date(ymd + "T00:00:00Z").getTime();
  return isNaN(t) ? null : t / 1000;
}

const PERIODES = [
  { debut: "dateDebut",  fin: "dateFin",  label: "Période 1" },
  { debut: "dateDebut2", fin: "dateFin2", label: "Période 2" },
  { debut: "dateDebut3", fin: "dateFin3", label: "Période 3" },
] as const;

type PeriodeKey = typeof PERIODES[number]["debut"] | typeof PERIODES[number]["fin"];

function validatePeriodes(dates: Record<PeriodeKey, string>, visible: number): string[] {
  const errors: string[] = [];
  const todaySec = Math.floor(Date.now() / 86_400_000) * 86_400;

  const parsed = PERIODES.slice(0, visible).map((p) => ({
    d: ymdToSec(dates[p.debut]),
    f: ymdToSec(dates[p.fin]),
    label: visible > 1 ? p.label : "La plage de dates",
  }));

  for (const { d, f, label } of parsed) {
    if (d !== null && f === null) {
      errors.push(`${label} : la date de fin est manquante.`);
    } else if (d === null && f !== null) {
      errors.push(`${label} : la date de début est manquante.`);
    } else if (d !== null && f !== null) {
      if (f < d) errors.push(`${label} : la date de fin est avant la date de début.`);
      else if (f < todaySec) errors.push(`${label} : ces dates sont dans le passé.`);
    }
  }

  // Chevauchements entre périodes complètes
  const full = parsed.filter(({ d, f }) => d !== null && f !== null);
  for (let i = 0; i < full.length; i++) {
    for (let j = i + 1; j < full.length; j++) {
      if (Math.max(full[i].d!, full[j].d!) <= Math.min(full[i].f!, full[j].f!)) {
        errors.push(`${full[i].label} et ${full[j].label} se chevauchent.`);
      }
    }
  }

  return errors;
}

/**
 * Déclaration de disponibilité d'un hébergeur déjà connu d'ABS (page publique).
 * Il s'identifie par téléphone OU email, indique 1 à 3 plages de dates et/ou un
 * texte libre. Formulaire contrôlé.
 */
export function DispoForm() {
  const formToken = usePublicFormToken();
  const [identifiant, setIdentifiant] = useState("");
  const [dates, setDates] = useState<Record<PeriodeKey, string>>({
    dateDebut: "", dateFin: "", dateDebut2: "", dateFin2: "", dateDebut3: "", dateFin3: "",
  });
  const [visiblePeriodes, setVisiblePeriodes] = useState(1);
  const [texteLibre, setTexteLibre] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function setDate(key: PeriodeKey, value: string) {
    setDates((prev) => {
      const next = { ...prev, [key]: value };
      if (key.startsWith("dateDebut") && value) {
        const finKey = key.replace("dateDebut", "dateFin") as PeriodeKey;
        if (!prev[finKey]) next[finKey] = addOneDay(value);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!identifiant.trim()) {
      setErrors(["Indiquez le téléphone ou l'email que connaît ABS, pour vous reconnaître."]);
      return;
    }
    const validationErrors = validatePeriodes(dates, visiblePeriodes);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);
    setLoading(true);
    try {
      await submitPublicHebergeurDispo({
        identifiant,
        dateDebut:  dates.dateDebut  || undefined,
        dateFin:    dates.dateFin    || undefined,
        dateDebut2: dates.dateDebut2 || undefined,
        dateFin2:   dates.dateFin2   || undefined,
        dateDebut3: dates.dateDebut3 || undefined,
        dateFin3:   dates.dateFin3   || undefined,
        texteLibre,
        hp: website,
      }, formToken);
      setDone(true);
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "Erreur inconnue"]);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <FormDone
        titre="Merci, c'est bien noté !"
        message="Votre disponibilité a été transmise à l'association."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormErrors errors={errors} />
      <Honeypot value={website} onChange={(e) => setWebsite(e.target.value)} />

      <Field label="Téléphone ou email" hint="Celui que vous avez communiqué à ABS, pour vous reconnaître." htmlFor="d-id">
        <TextField
          id="d-id"
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          placeholder="06 12 34 56 78  ou  vous@exemple.fr"
        />
      </Field>

      {PERIODES.slice(0, visiblePeriodes).map((p) => (
        <div key={p.debut} className="space-y-2">
          {visiblePeriodes > 1 && (
            <p className="text-xs font-medium text-muted-foreground">{p.label}</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Disponible à partir du" htmlFor={`d-${p.debut}`}>
              <DateField id={`d-${p.debut}`} value={dates[p.debut]} onChange={(v) => setDate(p.debut, v)} />
            </Field>
            <Field label="Jusqu'au" htmlFor={`d-${p.fin}`}>
              <DateField id={`d-${p.fin}`} value={dates[p.fin]} onChange={(v) => setDate(p.fin, v)} />
            </Field>
          </div>
        </div>
      ))}

      {visiblePeriodes < 3 && (
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => setVisiblePeriodes((n) => Math.min(n + 1, 3))}
        >
          + Ajouter une période
        </Button>
      )}

      <Field label="Précisions (optionnel)" hint="Conditions, contraintes, ou autres détails." htmlFor="d-texte">
        <TextArea id="d-texte" value={texteLibre} onChange={(e) => setTexteLibre(e.target.value)} className="min-h-[4rem]" />
      </Field>

      <Button variant="warm" type="submit" className="w-full" disabled={loading} aria-label="Envoyer ma disponibilité">
        {loading ? "Envoi…" : "Envoyer ma disponibilité"}
      </Button>
    </form>
  );
}
