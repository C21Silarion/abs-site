import { useState } from "react";
import { Mail, Phone, MapPin, Heart, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/site/brand/Logo";
import { PaperButton } from "@/components/site/ui/PaperButton";
import { footer } from "@/components/site/content";

/* lucide v1 ne fournit plus les icônes de marque : on les dessine en inline. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  );
}

/*
 * Pied de page commun aux deux maquettes.
 * Centralise les tunnels de conversion externalisés (HelloAsso), le contact
 * tri-canal, la newsletter et l'aiguillage réseaux sociaux (cf. CDC §4/§5).
 */
/* Bord "papier découpé" du haut du footer : mêmes points que le tracé du
   bandeau chiffres clés (banner.svg), repris ici en clip-path (x en %, y en
   px pour garder une amplitude de découpe constante quelle que soit la
   hauteur du footer) plutôt qu'en SVG étiré — inutile de dupliquer l'asset
   puisque seul le bord haut nous intéresse (le bas reste un rectangle plein).
   Tracé retourné horizontalement (miroir en x) pour ne pas répéter à
   l'identique la découpe du bandeau chiffres clés. */
const FOOTER_TORN_EDGE: React.CSSProperties = {
  clipPath:
    "polygon(-1.48% 3px, 10.04% 11px, 19.34% 33px, 33.73% 10px, 53.29% 16px, 76.59% 26px, 104.44% 5px, 104.44% 100%, -1.48% 100%)",
};

export function SiteFooter() {
  const [newsletterDone, setNewsletterDone] = useState(false);
  return (
    <footer className="bg-aubergine text-creme" style={FOOTER_TORN_EDGE}>
      {/* Bandeau soutien / HelloAsso */}
      <div className="border-b border-creme/10 px-5 py-14">
        <div className="mx-auto grid w-full max-w-5xl gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl text-creme">Soutenir ABS</h2>
            <p className="mt-3 text-creme/75">
              Chaque adhésion et chaque don font vivre le réseau. Les paiements sont
              gérés en toute sécurité via HelloAsso.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <PaperButton variant="warmShort" href={footer.helloAsso.don} target="_blank" rel="noreferrer">
              <Heart className="h-5 w-5" />
              Faire un don
            </PaperButton>
            <PaperButton variant="lavandeShort" href={footer.helloAsso.adhesion} target="_blank" rel="noreferrer">
              <HeartHandshake className="h-5 w-5" />
              Adhérer à l'association
            </PaperButton>
          </div>
        </div>
      </div>

      {/* Contact, newsletter, réseaux */}
      <div className="px-5 py-14">
        <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-3">
          {/* Contact tri-canal */}
          <div>
            <h3 className="font-display text-xl text-creme">Nous contacter</h3>
            <ul className="mt-4 space-y-3 text-creme/80">
              <li>
                <a href={`mailto:${footer.contact.email}`} className="flex items-center gap-2 hover:text-orange">
                  <Mail className="h-4 w-4 shrink-0" /> {footer.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${footer.contact.telephone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-orange">
                  <Phone className="h-4 w-4 shrink-0" /> {footer.contact.telephone}
                </a>
              </li>
              <li>
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(footer.contact.adresse)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2 hover:text-orange"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {footer.contact.adresse}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter — POST direct vers le formulaire Brevo, dans un iframe
              caché pour rester sur le site. Honeypot Brevo `email_address_check`
              conservé (doit rester vide). */}
          <div>
            <h3 className="font-display text-xl text-creme">Rester informé·e</h3>
            {newsletterDone ? (
              <p className="mt-4 text-sm text-creme/80">
                Merci ! Votre inscription est prise en compte. Pensez à valider
                l'email de confirmation si on vous le demande.
              </p>
            ) : (
              <>
                <p className="mt-4 text-sm text-creme/70">
                  Recevez nos rares mais précieuses nouvelles par courriel.
                </p>
                <form
                  action={footer.newsletterAction}
                  method="POST"
                  target="brevo-newsletter"
                  onSubmit={() => {
                    // Laisser la soumission native (POST vers l'iframe Brevo)
                    // s'effectuer AVANT de démonter le formulaire ; sinon le
                    // navigateur l'annule (« form is not connected »).
                    window.setTimeout(() => setNewsletterDone(true), 0);
                  }}
                  className="mt-4 flex items-center gap-2"
                >
                  <input
                    type="email"
                    name="EMAIL"
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    className="h-11 w-full rounded-lg border border-creme/20 bg-creme/5 px-3 text-creme placeholder:text-creme/40"
                  />
                  {/* Honeypot Brevo — doit rester vide */}
                  <input type="text" name="email_address_check" defaultValue="" tabIndex={-1} aria-hidden="true" autoComplete="off" className="hidden" />
                  <input type="hidden" name="locale" value="fr" />
                  <PaperButton variant="warmSmall" type="submit" className="h-11 px-6 text-base">
                    OK
                  </PaperButton>
                </form>
              </>
            )}
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="font-display text-xl text-creme">Nous suivre</h3>
            <div className="mt-4 flex gap-3">
              <a href={footer.reseaux.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-lg bg-creme/10 hover:bg-orange">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={footer.reseaux.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-lg bg-creme/10 hover:bg-orange">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href={footer.reseaux.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-11 w-11 items-center justify-center rounded-lg bg-creme/10 hover:bg-orange">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm italic text-creme/65">{footer.reseaux.note}</p>
          </div>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-5xl flex-col gap-4 border-t border-creme/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo variant="creme" className="h-[70px] shrink-0" />
          <p className="text-xs mt-0 text-creme/50 sm:text-left">
            © ABS, Accueil Bienveillant et Solidaire · Haute-Vienne ·{" "}
            <Link to="/vie-privee" className="underline underline-offset-2 hover:text-creme/80">
              Vie privée
            </Link>
            <br />
            Police des titres Euripides:{" "}
            <a href="https://tanvi.network/" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-creme/80">
              Tanvi
            </a>{" "}
            — Police du corps Arial Rounded MT: Patricia Saunders, Robin Nicholas 1982
            <br />
            Identité visuelle:{" "}
            <a
              href="https://www.instagram.com/lirem_ipsum/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2 hover:text-creme/80"
            >
              Lilou Rougemont
            </a>{" "}
            — Conseil design: Thibault Menz — Site : Yvan Galtié
          </p>
        </div>
      </div>

      {/* Cible cachée pour la soumission du formulaire newsletter Brevo
          (évite de quitter le site). */}
      <iframe name="brevo-newsletter" title="Inscription newsletter" className="hidden" />
    </footer>
  );
}
