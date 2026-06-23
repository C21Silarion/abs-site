import { ShieldCheck } from "lucide-react";
import { Button } from "./Button";

/*
 * Placeholder du formulaire d'inscription LE116 (intégré inline dans les pages
 * Héberger / Référent du site définitif). Non fonctionnel : sert à figurer
 * l'emplacement et le rendu. La logique réelle vit dans l'outil interne ABS.
 */
export function Le116FormPlaceholder({
  titre = "Passer à l'action",
  intitule,
}: {
  titre?: string;
  intitule: string;
}) {
  return (
    <section className="rounded-2xl border-2 border-dashed border-lavande/60 bg-card p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-2 text-sm font-medium text-lavande">
        <ShieldCheck className="h-4 w-4" />
        Formulaire sécurisé LE116 — aperçu de maquette
      </div>
      <h3 className="mb-1 font-display text-2xl text-aubergine">{titre}</h3>
      <p className="mb-6 text-foreground/80">{intitule}</p>

      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-aubergine">
          Prénom & nom
          <input
            type="text"
            disabled
            placeholder="Votre nom"
            className="h-11 rounded-lg border border-input bg-background px-3 text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-aubergine">
          Courriel
          <input
            type="email"
            disabled
            placeholder="vous@exemple.fr"
            className="h-11 rounded-lg border border-input bg-background px-3 text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-aubergine">
          Téléphone
          <input
            type="tel"
            disabled
            placeholder="06 12 34 56 78"
            className="h-11 rounded-lg border border-input bg-background px-3 text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-aubergine">
          Code postal
          <input
            type="text"
            disabled
            placeholder="87000"
            className="h-11 rounded-lg border border-input bg-background px-3 text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-aubergine sm:col-span-2">
          Votre message
          <textarea
            disabled
            rows={3}
            placeholder="Dites-nous en quelques mots ce que vous pouvez proposer…"
            className="rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground"
          />
        </label>
        <div className="sm:col-span-2">
          <Button variant="warm" size="lg" type="submit" className="w-full sm:w-auto">
            Envoyer ma demande
          </Button>
        </div>
      </form>
    </section>
  );
}
