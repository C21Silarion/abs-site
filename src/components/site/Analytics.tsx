/*
 * Traceur Umami — mesure d'audience agrégée (pages vues, durée de session),
 * sans cookie ni donnée personnelle. Instance auto-hébergée (voir
 * docs/guides/deploiement-vps.md côté abs-app), tableau de bord sur
 * stats.app.abs87.org. Divulgué dans /vie-privee.
 *
 * Chargé UNIQUEMENT en production pour ne pas polluer les stats avec du
 * trafic de dev local. UUID à renseigner après création du "website" dans
 * le dashboard Umami (cf. runbook de déploiement).
 */
const UMAMI_SCRIPT_URL = "https://stats.app.abs87.org/script.js";
const UMAMI_WEBSITE_ID = "983e73df-9ca0-4684-a345-0fb241993a14";

export function Analytics() {
  if (!import.meta.env.PROD) return null;
  return <script defer src={UMAMI_SCRIPT_URL} data-website-id={UMAMI_WEBSITE_ID} />;
}
