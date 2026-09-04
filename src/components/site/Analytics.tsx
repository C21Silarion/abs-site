import { useEffect } from "react";

/*
 * Traceur Umami — mesure d'audience agrégée (pages vues, durée de session),
 * sans cookie ni donnée personnelle. Instance auto-hébergée (voir
 * docs/guides/deploiement-vps.md côté abs-app), tableau de bord sur
 * stats.app.abs87.org. Divulgué dans /vie-privee.
 *
 * Chargé UNIQUEMENT en production pour ne pas polluer les stats avec du
 * trafic de dev local. UUID à renseigner après création du "website" dans
 * le dashboard Umami (cf. runbook de déploiement).
 *
 * Insertion manuelle via document.createElement (pas de <script> rendu
 * directement en JSX) : un <script src> rendu par React apparaît bien dans le
 * DOM mais ne déclenche pas systématiquement le fetch du navigateur — constaté
 * en prod (nœud visible dans l'inspecteur, aucune requête réseau). La création
 * manuelle est le pattern fiable pour charger un script tiers depuis React.
 */
const UMAMI_SCRIPT_URL = "https://stats.app.abs87.org/script.js";
const UMAMI_WEBSITE_ID = "983e73df-9ca0-4684-a345-0fb241993a14";

export function Analytics() {
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    const script = document.createElement("script");
    script.defer = true;
    script.src = UMAMI_SCRIPT_URL;
    script.dataset.websiteId = UMAMI_WEBSITE_ID;
    document.body.appendChild(script);
  }, []);
  return null;
}
