# Préparation SEO — abs-site

> Document de cadrage. Domaine verrouillé : `abs87.org` (apex canonical,
> `www.abs87.org` redirige dessus — déjà en place côté Caddy/DNS, confirmé en
> prod le 2026-08-31). Voir aussi
> `abs-app/docs/notes/lancement-public-seo-abs-site.md` pour le suivi
> détaillé de la bascule de lancement. **Bascule code faite le 2026-09-03** :
> `/` sert désormais `HomePage`, `/test` et `ComingSoon` sont supprimés.
> Reste le rebuild/déploiement VPS et la vérification post-lancement (§5).

## 1. Pré-requis bloquants — état au 2026-09-03

| Décision | Statut | Impact si non figé |
| --- | --- | --- |
| Domaine public définitif | **Figé** : `abs87.org` | — |
| Plan de site (URLs publiques réelles) | **Figé** (cf. §3) | — |
| Image de partage `og:image` (1200×630) | **Fait** — `public/og-image.png` en place | — |
| Page publique livrée vs maquette | **Bascule faite** — `/` sert `HomePage`, reste à redéployer sur le VPS | Voir §5 pour les vérifications post-déploiement |

Centralisé dans `src/lib/site.ts` (`SITE_URL`, `OG_IMAGE`) — un seul endroit
à changer si le domaine évolue.

## 2. État actuel (mis à jour le 2026-09-03)

- `index.html` : `lang="fr"`, `<title>`/`<meta description>` génériques +
  bloc OG/Twitter statique (fallback pour les robots sociaux sans JS) +
  JSON-LD `schema.org/NGO` + `theme-color` + `manifest.json`. **Fait.**
- Par page (`HomePage`, `Orienter`, `ViePrivee`) : composant
  `src/components/site/Seo.tsx` (hissage natif React 19, pas de
  `react-helmet`) posant `<title>`, `meta description`, `link canonical`,
  OG/Twitter dédiés. **Fait.**
- `public/robots.txt` et `public/sitemap.xml` : **faits**, voir §4.3/4.4.
- Bascule faite : `/` sert désormais le vrai monopage (`HomePage`), `/test`
  et `ComingSoon.tsx` sont supprimés. Reste à redéployer sur le VPS (§6).

### Routes actuelles

| Route | Composant | Nature | Indexable ? |
| --- | --- | --- | --- |
| `/` | `HomePage` | Vrai monopage, racine officielle | Oui |
| `/orienter` | `Orienter` | Page publique réelle, non liée depuis la navigation, diffusée au cas par cas à des structures partenaires | **Non** (`meta robots noindex`, cf. §3) |
| `/vie-privee` | `ViePrivee` | Page publique réelle | Oui |

## 3. Plan de site cible — figé

Architecture réelle : **monopage à ancres** (pas de routes séparées
`/heberger`/`/referent`/`/ressources`, contrairement à une hypothèse
antérieure de ce document) :

- `/` — Accueil (monopage : Hero, Plaidoyer, `#heberger`, `#referent`,
  `#projets`, `#ressources`)
- `/vie-privee` — Notice RGPD
- `/orienter` — Orientation par une structure tierce (URL need-to-know,
  diffusée au cas par cas). Volontairement exclue de l'indexation, mais
  **via `meta name="robots" content="noindex, nofollow"` sur la page
  (`<Seo noindex />`), pas via `Disallow` dans `robots.txt`** — un
  `Disallow` empêcherait Googlebot de crawler la page et donc de voir le
  `noindex` ; l'URL nue pourrait alors quand même être listée sans extrait
  si elle est un jour liée depuis ailleurs. Autoriser le crawl + `noindex`
  garantit l'exclusion, conformément à la recommandation de Google. Absente
  du sitemap dans tous les cas.

Sitemap (`public/sitemap.xml`) : uniquement `/` et `/vie-privee`.

**Limite connue** : le site est une SPA pure sans SSR (§7 de l'audit
initial). Le `noindex` n'est visible qu'après exécution du JS — fiable pour
Googlebot (moteur JS moderne), moins garanti pour des robots plus simples qui
n'exécutent pas React. Si une confidentialité plus stricte est nécessaire,
l'option robuste est un en-tête `X-Robots-Tag: noindex` posé par Caddy sur
`/orienter` spécifiquement (visible même sans JS) — pas fait ici, ça touche
`abs-app/caddy/Caddyfile.prod` (infra partagée), à discuter si besoin.

## 4. Travaux à réaliser (checklist d'implémentation)

### 4.1 Titres & métadonnées par page (React 19, sans lib)

- [x] Composant `src/components/site/Seo.tsx` rendant `<title>`, `<meta name="description">`,
      `<link rel="canonical">`, `og:title/description/url/image/type`, `twitter:card`.
- [x] Props alimentées depuis `content.ts` (export `seo`, source éditoriale unique).
- [x] Branché sur chaque page publique réelle (`HomePage`, `Orienter`, `ViePrivee`) —
      pas sur `ComingSoon`, remplacée à la bascule de vendredi.

### 4.2 Open Graph statiques (crawlers sociaux sans JS)

- [x] Bloc OG/Twitter **générique en dur** dans `index.html` (fallback partage).
- [x] `public/og-image.png` (1200×630) — déjà fourni, vérifié valide.
- [ ] *Optionnel étape 2* : prérendu statique (SSG) pour des OG **par page**.
      Non requis tant que le site reste une SPA pure côté crawlers sociaux.

### 4.3 robots.txt — fait le 2026-08-31, `Disallow: /test` retiré le 2026-09-03

- [x] `public/robots.txt` (version post-lancement, `/test` supprimé) :
  ```
  User-agent: *
  Allow: /
  Sitemap: https://abs87.org/sitemap.xml
  ```
  `/orienter` n'est **pas** dans ce fichier — protégée par `meta robots
  noindex` sur la page elle-même à la place (cf. §3), plus robuste qu'un
  `Disallow`.

### 4.4 sitemap.xml — fait le 2026-08-31

- [x] `public/sitemap.xml` listant `/` et `/vie-privee` (base `SITE_URL`), avec `lastmod`.

### 4.5 Données structurées JSON-LD — fait le 2026-08-31

- [x] Bloc `schema.org/NGO` dans `index.html` : `name`, `url`, `logo`
      (`/og-image.png`, faute d'un logo à URL statique stable — les fichiers
      de charte réels sont importés par Vite avec un nom haché), `areaServed`
      (Limoges / Haute-Vienne), `email`, `telephone`, `address`, `sameAs`
      (Instagram/Facebook/YouTube).

### 4.6 Détails techniques

- [x] `theme-color` (aubergine `#432663`) + `public/manifest.json` minimal
      (référence `favicon.svg`, pas de nouvel asset requis).
- [ ] Favicon multi-formats (`.ico`, `apple-touch-icon`) — pas fait, nécessite
      de nouveaux assets, non bloquant pour le lancement.
- [x] `/test` et `ComingSoon` supprimés le 2026-09-03 — plus de route à exclure.
- [x] Vérifié : `<h1>` unique par page, `alt` présents sur les images réelles
      (constat de l'audit du 2026-08-31, aucune régression introduite ici).
- [x] Landmark `<main>` ajouté sur `HomePage`, `Orienter`, `ViePrivee`
      (absent auparavant).

## 5. Vérification après mise en ligne

- [ ] `https://abs87.org/robots.txt` et `/sitemap.xml` accessibles.
- [ ] Aperçu de partage : validateurs Facebook / LinkedIn / X (ou `curl` du HTML
      pour confirmer la présence des OG sans JS).
- [ ] Google Search Console : propriété ajoutée, sitemap soumis.
- [ ] Recherche `site:abs87.org` ne remonte **aucune** URL `/test/*`.
- [ ] Le surnom interne **Le116 n'apparaît nulle part** (texte, nom de composant,
      JSON-LD, sitemap).

## 6. Lien avec l'outil interne

L'app interne (sous-domaine dédié) suit la démarche **inverse** : interdiction
d'indexation (`X-Robots-Tag: noindex`, `meta robots noindex`, `robots.txt Disallow: /`).
Voir la prochaine itération côté `abs-app`. Aucun lien sortant du site public ne
doit pointer vers ce sous-domaine.
