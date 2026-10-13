/**
 * Options partagées des formulaires publics : types d'aide + créneaux de disponibilité.
 *
 * Le site public étant non authentifié, il ne peut pas charger les choix Grist :
 * - types d'aide : `./generated/typesAide.ts`, GÉNÉRÉ depuis abs-app
 *   `schema/enums/type_aide.yaml` (`python schema_tool.py gen-ts` côté abs-app) ;
 * - créneaux : miroir manuel de abs-app `schema/enums/creneaux.yaml`, à garder aligné.
 */

// Types d'aide / de tâche : générés depuis schema/enums/type_aide.yaml (source unique).
export { TYPES_AIDE, TYPES_AIDE_SUIVI, TYPES_AIDE_INTERNE, TYPES_AIDE_GROUPS } from "./generated/typesAide";

export const JOURS = [
  "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche",
] as const;

export const PARTS = ["matin", "après-midi", "soir"] as const;

/** Jeton créneau « <Jour> <part> » — doit matcher exactement creneaux.yaml. */
export function creneauToken(jour: string, part: string): string {
  return `${jour} ${part}`;
}
