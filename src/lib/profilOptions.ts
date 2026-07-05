/**
 * Options partagées des formulaires publics : types d'aide + créneaux de disponibilité.
 *
 * Miroir statique des énumérations Grist de l'outil interne ABS
 * (`schema/enums/type_aide.yaml`, `schema/enums/creneaux.yaml`). Le site public
 * étant non authentifié, il ne peut pas charger les choix Grist : ces constantes
 * DOIVENT rester alignées avec celles de l'outil interne (cf. abs-app
 * `pwa/src/lib/profilOptions.ts`).
 */

/** Types d'aide proposables (= Taches.TypeTache). */
export const TYPES_AIDE = [
  "Transport",
  "Rendez-vous",
  "Appel téléphonique",
  "Aide administrative",
  "Autre",
  "Réunion",
  "Événement",
  "Admin ABS",
  "Communication",
  "Gestion bénévoles",
  "Lien associatif",
] as const;

/** Sous-groupe "Suivi" pour l'affichage groupé de ChipMulti (cf. abs-app). */
export const TYPES_AIDE_SUIVI = ["Transport", "Rendez-vous", "Appel téléphonique", "Aide administrative", "Autre"] as const;
/** Sous-groupe "Fonctionnement ABS interne" — même usage. */
export const TYPES_AIDE_INTERNE = ["Réunion", "Événement", "Admin ABS", "Communication", "Gestion bénévoles", "Lien associatif"] as const;

/** Regroupement pour ChipMulti (Types d'aide) — mêmes deux sections que côté abs-app. */
export const TYPES_AIDE_GROUPS = [
  { label: "Suivi", options: TYPES_AIDE_SUIVI },
  { label: "Fonctionnement ABS interne", options: TYPES_AIDE_INTERNE },
] as const;

export const JOURS = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche",
] as const;

export const PARTS = ["matin", "après-midi", "soir"] as const;

/** Jeton créneau « <Jour> <part> » — doit matcher exactement creneaux.yaml. */
export function creneauToken(jour: string, part: string): string {
  return `${jour} ${part}`;
}
