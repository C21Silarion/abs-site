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
  "Réunion",
  "Événement",
  "Autre",
] as const;

export const JOURS = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche",
] as const;

export const PARTS = ["matin", "après-midi", "soir"] as const;

/** Jeton créneau « <Jour> <part> » — doit matcher exactement creneaux.yaml. */
export function creneauToken(jour: string, part: string): string {
  return `${jour} ${part}`;
}
