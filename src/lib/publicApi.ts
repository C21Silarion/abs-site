/**
 * Accès aux formulaires publics de l'outil interne ABS depuis le site vitrine.
 *
 * Le site et l'outil interne partagent la même origine en production (Caddy sert
 * le site à `/` et proxifie `/api` vers le backend) ; en dev, le proxy Vite
 * (`vite.config.ts`) renvoie `/api` vers `http://localhost:3000`. La base reste
 * donc relative par défaut. `VITE_API_BASE` permet de basculer en cross-origin
 * si le site venait à être hébergé sur un domaine distinct.
 *
 * Contrat anti-abus (identique côté outil interne) :
 *  - jeton récupéré au montage du formulaire (`getPublicFormToken`) → renvoyé à
 *    la soumission (nonce + piège temporel ≥ 3 s) ;
 *  - honeypot `hp` ;
 *  - POST sans cookie de session (`credentials` omis).
 * NB : ne jamais exposer le nom de l'outil interne côté site public (cf. CLAUDE.md).
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

/** Jeton anti-abus à récupérer au chargement d'un formulaire public, puis à
 *  renvoyer dans la soumission. "" si indisponible. */
export async function getPublicFormToken(): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/public/form-token`);
    if (!res.ok) return "";
    return ((await res.json()) as { token?: string }).token ?? "";
  } catch {
    return "";
  }
}

async function postPublic(path: string, payload: Record<string, unknown>, formToken: string): Promise<void> {
  const res = await fetch(`${API_BASE}/public/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, formToken }),
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error ?? `Erreur ${res.status}`);
  }
}

/** Candidature bénévole — sans cookie de session. */
export function submitPublicBenevole(payload: Record<string, unknown>, formToken: string): Promise<void> {
  return postPublic("benevole", payload, formToken);
}

/** Candidature hébergeur potentiel — sans cookie de session. */
export function submitPublicHebergeur(payload: Record<string, string>, formToken: string): Promise<void> {
  return postPublic("hebergeur", payload, formToken);
}

/** Déclaration de disponibilité d'un hébergeur existant — sans cookie. */
export function submitPublicHebergeurDispo(payload: {
  identifiant: string;
  dateDebut?: string;
  dateFin?: string;
  dateDebut2?: string;
  dateFin2?: string;
  dateDebut3?: string;
  dateFin3?: string;
  texteLibre?: string;
  hp?: string; // honeypot
}, formToken: string): Promise<void> {
  return postPublic("hebergeur-dispo", payload, formToken);
}
