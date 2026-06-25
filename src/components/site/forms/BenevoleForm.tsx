import { useState } from "react";
import { submitPublicBenevole } from "@/lib/publicApi";
import { usePublicFormToken } from "@/lib/usePublicFormToken";
import { TYPES_AIDE } from "@/lib/profilOptions";
import { Button } from "@/components/site/ui/Button";
import { Field, TextField, TextArea, Honeypot, FormErrors, FormDone } from "@/components/site/form/Field";
import { ChipMulti } from "@/components/site/form/ChipMulti";
import { CreneauGrid } from "@/components/site/form/CreneauGrid";

/**
 * Candidature bénévole (page publique). Champs texte non contrôlés (FormData,
 * cf. HebergeurForm) ; types d'aide et créneaux contrôlés.
 */
export function BenevoleForm() {
  const formToken = usePublicFormToken();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [typesAide, setTypesAide] = useState<string[]>([]);
  const [creneaux, setCreneaux] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      Prenom: get("Prenom"), Nom: get("Nom"),
      Email: get("Email"), Tel: get("Tel"), Adresse: get("Adresse"),
      TypesAide: typesAide,
      AideProposee: get("AideProposee"),
      DisponibiliteCreneaux: creneaux,
      Disponibilite: get("Disponibilite"),
      DetailContact: get("DetailContact"), Message: get("Message"),
      hp: get("hp"),
    };

    if (!payload.Prenom && !payload.Nom) { setError("Indiquez votre nom ou prénom."); return; }
    if (!payload.Email) { setError("Indiquez votre email — nous vous recontacterons à cette adresse."); return; }

    setError("");
    setLoading(true);
    try {
      await submitPublicBenevole(payload, formToken);
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
        titre="Merci pour votre candidature !"
        message="Un membre de l'association la relira et reviendra vers vous par email."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormErrors errors={error ? [error] : []} />
      <Honeypot />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Prénom" htmlFor="b-prenom">
          <TextField id="b-prenom" name="Prenom" autoComplete="given-name" />
        </Field>
        <Field label="Nom" htmlFor="b-nom">
          <TextField id="b-nom" name="Nom" autoComplete="family-name" />
        </Field>
      </div>

      <Field label="Email" hint="Nous vous recontacterons à cette adresse." htmlFor="b-email">
        <TextField id="b-email" name="Email" type="email" autoComplete="email" inputMode="email" />
      </Field>

      <Field label="Téléphone (optionnel)" htmlFor="b-tel">
        <TextField id="b-tel" name="Tel" type="tel" autoComplete="tel" inputMode="tel" />
      </Field>

      <Field label="Adresse (optionnel)" hint="Ville ou quartier suffit — utile pour les trajets éventuels." htmlFor="b-adresse">
        <TextField id="b-adresse" name="Adresse" autoComplete="street-address" />
      </Field>

      <Field label="Comment pouvez-vous aider ?" hint="Cochez les types d'aide qui vous correspondent.">
        <ChipMulti values={typesAide} options={TYPES_AIDE} onChange={setTypesAide} />
      </Field>

      <Field label="Précisions sur l'aide (optionnel)" hint="Hébergement, traduction, compétences particulières…" htmlFor="b-aide">
        <TextArea id="b-aide" name="AideProposee" className="min-h-[4rem]" />
      </Field>

      <Field label="Vos disponibilités" hint="Cochez vos créneaux habituels (indicatif).">
        <CreneauGrid values={creneaux} onChange={setCreneaux} />
      </Field>

      <Field label="Précisions sur vos disponibilités (optionnel)" hint="Ponctuel ou régulier, périodes d'absence…" htmlFor="b-dispo">
        <TextArea id="b-dispo" name="Disponibilite" className="min-h-[4rem]" />
      </Field>

      <Field label="Comment avez-vous connu ABS ? (optionnel)" hint="Bouche-à-oreille, réseau associatif, recommandation…" htmlFor="b-contact">
        <TextArea id="b-contact" name="DetailContact" className="min-h-[4rem]" />
      </Field>

      <Field label="Message libre (optionnel)" htmlFor="b-message">
        <TextArea id="b-message" name="Message" className="min-h-[4rem]" />
      </Field>

      <Button variant="warm" type="submit" className="w-full" disabled={loading} aria-label="Envoyer ma candidature">
        {loading ? "Envoi…" : "Envoyer ma candidature"}
      </Button>
    </form>
  );
}
