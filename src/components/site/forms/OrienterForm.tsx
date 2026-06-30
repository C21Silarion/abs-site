import { useState } from "react";
import { submitPublicDemandeur, type MembreOrientation, type RoleFamille } from "@/lib/publicApi";
import { usePublicFormToken } from "@/lib/usePublicFormToken";
import { NATIONALITES, LANGUES } from "@/lib/demandeurEnums";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/site/ui/Button";
import {
  Field, TextField, TextArea, SelectField, DateField, Honeypot, FormErrors, FormDone,
} from "@/components/site/form/Field";
import { MentionRgpd } from "@/components/site/forms/MentionRgpd";

/** Sélecteur multi-langues (puces + saisie assistée par datalist). */
function LangueMultiSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const selected = value ? value.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const [text, setText] = useState("");

  function add(raw: string) {
    const match = LANGUES.find((l) => l.toLowerCase() === raw.trim().toLowerCase());
    const val = match ?? raw.trim();
    if (val && !selected.includes(val)) onChange([...selected, val].join(", "));
    setText("");
  }
  function remove(l: string) {
    onChange(selected.filter((x) => x !== l).join(", "));
  }

  return (
    <div className="space-y-1.5">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selected.map((l) => (
            <span key={l} className="inline-flex items-center gap-1 rounded bg-peach px-2 py-0.5 text-xs text-aubergine">
              {l}
              <button type="button" onClick={() => remove(l)} className="text-muted-foreground hover:text-red-600" aria-label={`Retirer ${l}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <TextField
        list="langues-list"
        value={text}
        placeholder="Ajouter une langue…"
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          // Sélection depuis le datalist → valeur exacte → on ajoute la puce.
          if (LANGUES.some((l) => l.toLowerCase() === v.trim().toLowerCase())) add(v);
        }}
      />
    </div>
  );
}

const ROLE_LABELS: Record<RoleFamille, string> = {
  parent: "Adulte (référent·e)",
  conjoint: "Conjoint·e",
  enfant: "Enfant",
};

function emptyMembre(role: RoleFamille): MembreOrientation {
  return {
    role,
    Nom: "", Prenom: "", DateNaissance: "", Genre: "",
    Nationalite: "", Langues: "", Tel: "", Email: "",
    Situation: "", DateBesoin: "",
  };
}

/**
 * Formulaire public d'orientation d'un demandeur (ou d'une famille) par une
 * structure tierce (/orienter — URL non diffusée). La liste de membres
 * dynamique impose un état contrôlé. La soumission atterrit dans la file de
 * revue admin de l'outil interne ; à l'approbation, toutes les fiches sont
 * créées avec leurs liens familiaux.
 */
export function OrienterForm() {
  const formToken = usePublicFormToken();
  const [organisation, setOrganisation] = useState("");
  const [agent, setAgent] = useState("");
  const [contact, setContact] = useState("");
  const [hp, setHp] = useState("");
  const [members, setMembers] = useState<MembreOrientation[]>([emptyMembre("parent")]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function updateMembre(idx: number, patch: Partial<MembreOrientation>) {
    setMembers((prev) => prev.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
  }
  function addMembre() {
    // Par défaut : conjoint·e si aucun encore, sinon enfant.
    const hasConjoint = members.some((m) => m.role === "conjoint");
    setMembers((prev) => [...prev, emptyMembre(hasConjoint ? "enfant" : "conjoint")]);
  }
  function removeMembre(idx: number) {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  }

  /** Validation puis ouverture de la confirmation (n'envoie pas encore). */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!organisation.trim()) { setError("Indiquez le nom de votre structure."); return; }
    const cleaned = members.filter((m) => (m.Nom ?? "").trim() || (m.Prenom ?? "").trim());
    if (cleaned.length === 0) { setError("Renseignez au moins une personne (nom ou prénom)."); return; }
    setError("");
    setConfirmOpen(true);
  }

  /** Empêche la touche Entrée d'envoyer le formulaire (sauf dans un Textarea). */
  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    const tag = (e.target as HTMLElement).tagName;
    if (e.key === "Enter" && tag !== "TEXTAREA") e.preventDefault();
  }

  async function doSubmit() {
    setConfirmOpen(false);
    const cleaned = members.filter((m) => (m.Nom ?? "").trim() || (m.Prenom ?? "").trim());
    setLoading(true);
    try {
      await submitPublicDemandeur({
        organisation: organisation.trim(),
        agent: agent.trim(),
        contact: contact.trim(),
        members: cleaned,
        hp,
      }, formToken);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  const nbPersonnes = members.filter((m) => (m.Nom ?? "").trim() || (m.Prenom ?? "").trim()).length;

  if (done) {
    return (
      <FormDone
        titre="Merci pour ce signalement !"
        message="Un membre de l'association le relira et reviendra vers vous."
      />
    );
  }

  return (
    <>
      {/* Datalists partagés par toutes les lignes de membre. */}
      <datalist id="nationalites-list">
        {NATIONALITES.map((n) => <option key={n} value={n} />)}
      </datalist>
      <datalist id="langues-list">
        {LANGUES.map((l) => <option key={l} value={l} />)}
      </datalist>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
        <FormErrors errors={error ? [error] : []} />
        <Honeypot value={hp} onChange={(e) => setHp(e.target.value)} />

        {/* Structure orientante */}
        <div className="space-y-4 rounded-xl border border-border bg-peach/30 p-4">
          <p className="text-sm font-medium text-aubergine">Votre structure</p>
          <Field label="Structure / organisation *" hint="Service, administration ou association qui oriente." htmlFor="o-orga">
            <TextField id="o-orga" value={organisation} onChange={(e) => setOrganisation(e.target.value)} />
          </Field>
          <div className="grid items-end gap-3 sm:grid-cols-2">
            <Field label="Votre nom" htmlFor="o-agent">
              <TextField id="o-agent" value={agent} onChange={(e) => setAgent(e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Votre contact" hint="Téléphone ou email pour vous joindre." htmlFor="o-contact">
              <TextField id="o-contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            </Field>
          </div>
        </div>

        {/* Membres */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-aubergine">Personne(s) à orienter</p>
          {members.map((m, idx) => {
            const isEnfant = m.role === "enfant";
            return (
              <div key={idx} className="space-y-3 rounded-xl border border-border p-4">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Field label="Rôle dans la famille" htmlFor={`o-role-${idx}`}>
                      <SelectField
                        id={`o-role-${idx}`}
                        value={m.role}
                        onChange={(e) => updateMembre(idx, { role: e.target.value as RoleFamille })}
                      >
                        {(Object.keys(ROLE_LABELS) as RoleFamille[]).map((r) => (
                          <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                        ))}
                      </SelectField>
                    </Field>
                  </div>
                  {members.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeMembre(idx)}
                      aria-label="Retirer cette personne"
                      className="h-11 w-11 px-0 text-muted-foreground hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Prénom" htmlFor={`o-prenom-${idx}`}>
                    <TextField id={`o-prenom-${idx}`} value={m.Prenom} onChange={(e) => updateMembre(idx, { Prenom: e.target.value })} />
                  </Field>
                  <Field label="Nom" htmlFor={`o-nom-${idx}`}>
                    <TextField id={`o-nom-${idx}`} value={m.Nom} onChange={(e) => updateMembre(idx, { Nom: e.target.value })} />
                  </Field>
                </div>

                <div className="grid items-end gap-3 sm:grid-cols-2">
                  <Field label="Date de naissance" htmlFor={`o-ddn-${idx}`}>
                    <DateField id={`o-ddn-${idx}`} value={m.DateNaissance ?? ""} onChange={(v) => updateMembre(idx, { DateNaissance: v })} />
                  </Field>
                  <Field label="Genre" htmlFor={`o-genre-${idx}`}>
                    <SelectField
                      id={`o-genre-${idx}`}
                      value={m.Genre || ""}
                      onChange={(e) => updateMembre(idx, { Genre: e.target.value })}
                    >
                      <option value="">—</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                      <option value="Autre">Autre</option>
                    </SelectField>
                  </Field>
                </div>

                <Field label="Nationalité" htmlFor={`o-nat-${idx}`}>
                  <TextField id={`o-nat-${idx}`} list="nationalites-list" value={m.Nationalite} onChange={(e) => updateMembre(idx, { Nationalite: e.target.value })} />
                </Field>

                <Field label="Langues" hint="Choisissez une ou plusieurs langues.">
                  <LangueMultiSelect value={m.Langues ?? ""} onChange={(v) => updateMembre(idx, { Langues: v })} />
                </Field>

                {!isEnfant && (
                  <>
                    <div className="grid items-end gap-3 sm:grid-cols-2">
                      <Field label="Téléphone" htmlFor={`o-tel-${idx}`}>
                        <TextField id={`o-tel-${idx}`} type="tel" inputMode="tel" value={m.Tel} onChange={(e) => updateMembre(idx, { Tel: e.target.value })} />
                      </Field>
                      <Field label="Email" htmlFor={`o-email-${idx}`}>
                        <TextField id={`o-email-${idx}`} type="email" inputMode="email" value={m.Email} onChange={(e) => updateMembre(idx, { Email: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Date de besoin" hint="À partir de quand la personne sera sans hébergement." htmlFor={`o-besoin-${idx}`}>
                      <DateField id={`o-besoin-${idx}`} value={m.DateBesoin ?? ""} onChange={(v) => updateMembre(idx, { DateBesoin: v })} />
                    </Field>
                    <Field label="Situation" hint="Contexte utile pour comprendre la situation." htmlFor={`o-situ-${idx}`}>
                      <TextArea id={`o-situ-${idx}`} className="min-h-[4rem]" value={m.Situation} onChange={(e) => updateMembre(idx, { Situation: e.target.value })} />
                    </Field>
                  </>
                )}
              </div>
            );
          })}

          <Button type="button" variant="outline" className="w-full" onClick={addMembre}>
            <Plus className="h-4 w-4" />
            Ajouter un membre de la famille
          </Button>
        </div>

        <Button variant="warm" type="submit" className="w-full" disabled={loading} aria-label="Envoyer le signalement">
          {loading ? "Envoi…" : "Envoyer le signalement"}
        </Button>
      </form>

      <MentionRgpd>
        Les données de la (ou des) personne(s) orientée(s) seront traitées par ABS dans le but
        de les mettre à l'abri. La personne concernée en sera{" "}
        <strong>informée par ABS dès le premier contact</strong>. Base légale : intérêt légitime.
        Conservation : 1 an après le dernier contact, puis anonymisation. Droits :{" "}
        <a href="mailto:rgpd@abs87.org" className="underline underline-offset-2">rgpd@abs87.org</a>.
      </MentionRgpd>

      {/* Confirmation avant envoi (overlay léger, sans dépendance) */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-aubergine-deep/40 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setConfirmOpen(false)}
        >
          <div className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-aubergine">Confirmer le signalement</h3>
            <p className="text-sm text-foreground/80">
              Vous allez transmettre {nbPersonnes} personne{nbPersonnes > 1 ? "s" : ""} à l'association
              {organisation.trim() ? ` au nom de « ${organisation.trim()} »` : ""}. Confirmez-vous l'envoi ?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConfirmOpen(false)}>Annuler</Button>
              <Button variant="warm" onClick={doSubmit} disabled={loading}>
                {loading ? "Envoi…" : "Confirmer l'envoi"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
