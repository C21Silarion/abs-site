import { useState } from "react";
import { submitPublicHebergeur } from "@/lib/publicApi";
import { usePublicFormToken } from "@/lib/usePublicFormToken";
import { Button } from "@/components/site/ui/Button";
import { Field, TextField, TextArea, Honeypot, FormErrors, FormDone } from "@/components/site/form/Field";

/**
 * Candidature hébergeur (page publique). Champs non contrôlés : valeurs lues via
 * FormData à la soumission — un input contrôlé rate parfois l'autocomplétion du
 * navigateur (onChange non déclenché), laissant l'état vide ; FormData capture
 * toujours la valeur réelle.
 */
export function HebergeurForm() {
  const formToken = usePublicFormToken();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      Prenom: get("Prenom"), Nom: get("Nom"),
      Tel: get("Tel"), Email: get("Email"),
      Adresse: get("Adresse"),
      Description: get("Description"),
      PreferenceContact: get("PreferenceContact"),
      hp: get("hp"),
    };

    if (!payload.Prenom && !payload.Nom) { setError("Indiquez votre nom ou prénom."); return; }
    if (!payload.Tel && !payload.Email) { setError("Indiquez un téléphone ou un email pour vous recontacter."); return; }

    setError("");
    setLoading(true);
    try {
      await submitPublicHebergeur(payload, formToken);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <FormDone
        titre="Merci pour votre proposition !"
        message="Un·e bénévole d'ABS la relira et reviendra vers vous pour faire connaissance, sans engagement."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormErrors errors={error ? [error] : []} />
      <Honeypot />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Prénom" htmlFor="h-prenom">
          <TextField id="h-prenom" name="Prenom" autoComplete="given-name" />
        </Field>
        <Field label="Nom" htmlFor="h-nom">
          <TextField id="h-nom" name="Nom" autoComplete="family-name" />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Téléphone" htmlFor="h-tel">
          <TextField id="h-tel" name="Tel" type="tel" autoComplete="tel" inputMode="tel" />
        </Field>
        <Field label="Email" htmlFor="h-email">
          <TextField id="h-email" name="Email" type="email" autoComplete="email" inputMode="email" />
        </Field>
      </div>

      <Field label="Adresse" hint="Ville ou quartier suffit." htmlFor="h-adresse">
        <TextField id="h-adresse" name="Adresse" autoComplete="street-address" />
      </Field>

      <Field label="Petite description du lieu (optionnel)" hint="Une chambre, un logement vide, quelques nuits…" htmlFor="h-desc">
        <TextArea id="h-desc" name="Description" />
      </Field>

      <Field label="Comment préférez-vous être recontacté·e ? (optionnel)" htmlFor="h-pref">
        <TextArea id="h-pref" name="PreferenceContact" className="min-h-[4rem]" />
      </Field>

      <Button variant="warm" type="submit" className="w-full" disabled={loading} aria-label="Envoyer ma proposition">
        {loading ? "Envoi…" : "Envoyer ma proposition"}
      </Button>
    </form>
  );
}
