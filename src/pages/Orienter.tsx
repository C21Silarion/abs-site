import { Logo } from "@/components/site/brand/Logo";
import { OrienterForm } from "@/components/site/forms/OrienterForm";

/*
 * Page publique d'orientation par une structure tierce (URL « need-to-know »,
 * non diffusée et non liée depuis la navigation). Autonome : pas de header/footer
 * de site, juste le formulaire dans l'identité de marque.
 */
export default function Orienter() {
  return (
    <div className="min-h-svh bg-background px-5 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 flex flex-col items-center gap-4 text-center">
          <Logo variant="full" className="h-auto w-full" />
          <div>
            <h1 className="font-display text-2xl text-aubergine">Orienter une personne ou une famille</h1>
            <p className="mt-2 text-foreground/75">
              Vous accompagnez une personne qui va se retrouver sans hébergement ?
              Transmettez sa situation à l'association — ajoutez chaque membre de la
              famille avec son rôle.
            </p>
          </div>
        </header>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <OrienterForm />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ces données ne servent qu'au suivi de la situation par l'association.
        </p>
      </div>
    </div>
  );
}
