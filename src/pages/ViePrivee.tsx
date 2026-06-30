import { Link } from "react-router-dom";
import { Logo } from "@/components/site/brand/Logo";

/*
 * Page statique de protection des données (notice générale art. 12-14 RGPD).
 * Liée depuis les mentions courtes sous chaque formulaire public.
 */
export default function ViePrivee() {
  return (
    <div className="min-h-svh bg-background px-5 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-10">
          <Link to="/" aria-label="Retour à l'accueil">
            <Logo variant="full" className="h-auto w-[21.5rem]" />
          </Link>
        </header>

        <article className="space-y-6 text-sm leading-relaxed text-foreground/80">
          <h1 className="font-display text-2xl text-aubergine">
            Protection de vos données personnelles
          </h1>

          <p>
            L'association <strong>ABS — Accueil Bienveillant et Solidaire</strong>,
            Maison des Droits de l'Homme — 119 avenue du Général Leclerc, 87100 Limoges,
            collecte et traite des données vous concernant pour mener à bien sa mission :
            mettre en relation des personnes sans hébergement stable avec des hébergeurs
            bénévoles, et assurer leur accompagnement.
          </p>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Pourquoi nous traitons vos données</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>gérer votre demande d'hébergement et vous mettre en relation avec un hébergeur ;</li>
              <li>assurer votre suivi et votre accompagnement ;</li>
              <li>gérer les hébergeurs et les bénévoles ;</li>
              <li>établir des statistiques d'activité <strong>anonymes</strong> pour le pilotage et nos financeurs.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Base juridique</h2>
            <p>
              Selon le cas : l'exécution de notre mission d'accompagnement, notre intérêt
              légitime, une obligation légale (justification de subventions, sous forme agrégée),
              ou votre <strong>consentement</strong> pour toute donnée sensible.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Quelles données</h2>
            <p>
              Votre identité et vos coordonnées, et — selon votre situation — des informations
              sur votre situation familiale et sociale, vos préférences, et les échanges liés à
              votre accompagnement. Nous appliquons un principe de <strong>minimisation</strong> :
              nous ne collectons que ce qui est nécessaire.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Qui y a accès</h2>
            <p>
              Uniquement les bénévoles et administrateurs d'ABS <strong>habilités</strong>, selon
              leur rôle. Vos données ne sont <strong>ni vendues, ni cédées</strong> à des tiers
              à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Prestataires techniques</h2>
            <p>
              Notre hébergeur <strong>OVH</strong> (France/UE), notre service d'envoi d'emails{" "}
              <strong>Brevo</strong> (pour les bénévoles), et des services de cartographie{" "}
              <strong>OpenStreetMap/OSRM</strong> (pour calculer des trajets à partir d'adresses).
              Vos données métier sont hébergées <strong>en France (Union européenne)</strong>.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Durée de conservation</h2>
            <p>
              Vos données sont conservées en base active <strong>1 an à compter de notre
              dernier contact</strong>, puis anonymisées. Les demandes envoyées via nos
              formulaires en ligne et non suivies d'effet sont supprimées automatiquement
              (90 jours à 1 an selon le cas).
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg text-aubergine">Vos droits</h2>
            <p>
              Vous disposez d'un droit d'<strong>accès</strong>, de <strong>rectification</strong>,
              d'<strong>effacement</strong>, d'<strong>opposition</strong>, de{" "}
              <strong>limitation</strong> et de <strong>portabilité</strong>. Pour les exercer,
              contactez notre référent RGPD :{" "}
              <a href="mailto:rgpd@abs87.org" className="underline underline-offset-2">
                rgpd@abs87.org
              </a>
              . Vous pouvez aussi introduire une réclamation auprès de la{" "}
              <strong>CNIL</strong> (
              <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="underline underline-offset-2">
                www.cnil.fr
              </a>
              ).
            </p>
          </section>

          <section className="rounded-lg bg-peach/40 px-4 py-3">
            <h2 className="mb-2 font-display text-base text-aubergine">Informations par formulaire</h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-aubergine">Candidature bénévole</p>
                <p>
                  Identité et coordonnées collectées pour traiter votre candidature et, si elle est
                  retenue, créer votre compte. Conservation : jusqu'à 1 an sans suite. Emails de
                  compte envoyés via Brevo.
                </p>
              </div>

              <div>
                <p className="font-medium text-aubergine">Proposition d'hébergement</p>
                <p>
                  Identité, coordonnées, adresse et caractéristiques du logement collectées pour
                  étudier votre proposition et organiser un accueil. Calcul de trajets via
                  OpenStreetMap. Conservation : 1 an après le dernier contact, puis anonymisation.
                </p>
              </div>

              <div>
                <p className="font-medium text-aubergine">Déclaration de disponibilité</p>
                <p>
                  Ces informations mettent à jour votre fiche hébergeur dans notre outil. Conservation :
                  2 ans après le dernier contact, puis anonymisation.
                </p>
              </div>

              <div>
                <p className="font-medium text-aubergine">Orientation par une structure tierce</p>
                <p>
                  Ce formulaire permet à une structure partenaire de signaler à ABS une personne
                  (ou une famille) ayant besoin d'un hébergement. La personne concernée sera
                  <strong> informée par ABS dès le premier contact</strong> et dispose des mêmes
                  droits. Conservation : 1 an après le dernier contact, puis anonymisation.
                </p>
              </div>
            </div>
          </section>
        </article>

        <footer className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          <Link to="/" className="underline underline-offset-2">
            ← Retour à l'accueil
          </Link>
        </footer>
      </div>
    </div>
  );
}
