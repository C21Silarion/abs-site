import { createContext, useContext } from "react";

/*
 * Teinte de surface d'un formulaire, propagée aux primitives via contexte pour
 * éviter le prop-drilling :
 *  - "light"     : carte claire (défaut) — texte aubergine, champs sur fond clair.
 *  - "aubergine" : carte aubergine — texte crème, champs crème.
 * Le fournisseur est posé par `Disclosure` selon sa prop `tone`.
 */
export type FormTone = "light" | "aubergine";

export const FormToneContext = createContext<FormTone>("light");

export function useFormTone(): FormTone {
  return useContext(FormToneContext);
}

/** Classes des pastilles/cases sélectionnables (ChipMulti, CreneauGrid). */
export function chipClasses(tone: FormTone): { on: string; off: string } {
  if (tone === "aubergine") {
    return {
      on: "border-creme bg-creme text-aubergine",
      off: "border-creme/40 bg-transparent text-creme hover:bg-creme/10",
    };
  }
  return {
    on: "border-aubergine bg-aubergine text-creme",
    off: "border-input bg-background hover:bg-peach",
  };
}
