// GÉNÉRÉ depuis schema/enums/type_aide.yaml — ne pas éditer.
// Régénérer : cd scripts/seed && python schema_tool.py gen-ts

/** Types de tâche (= Taches.TypeTache, SaisiesHeures.TypeTache, Benevoles.TypesAide), ordre Grist. */
export const TYPES_AIDE = ["Transport", "Rendez-vous", "Appel téléphonique", "Aide administrative", "Autre", "Réunion", "Événement", "Admin ABS", "Communication", "Gestion bénévoles", "Lien associatif"] as const;

/** Groupe « Suivi » (accompagnement des demandeurs). */
export const TYPES_AIDE_SUIVI = ["Transport", "Rendez-vous", "Appel téléphonique", "Aide administrative", "Autre"] as const;

/** Groupe « Fonctionnement ABS interne » — alimente le sous-détail HeuresAbs* des bilans. */
export const TYPES_AIDE_INTERNE = ["Réunion", "Événement", "Admin ABS", "Communication", "Gestion bénévoles", "Lien associatif"] as const;

/** Regroupement pour les sélecteurs groupés (TypeTacheSelect, StringListSelect, ChipMulti). */
export const TYPES_AIDE_GROUPS = [
  { label: "Suivi", options: TYPES_AIDE_SUIVI },
  { label: "Fonctionnement ABS interne", options: TYPES_AIDE_INTERNE },
] as const;
