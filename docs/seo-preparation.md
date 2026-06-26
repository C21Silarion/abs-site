# Préparation SEO — abs-site

> Document de cadrage. **À exécuter une fois le domaine et le plan de site
> verrouillés.** Domaine de travail actuel : `abs87.org` (susceptible de changer).
> Rien n'est implémenté tant que ces deux points ne sont pas figés.

## 1. Pré-requis bloquants (à verrouiller avant d'implémenter)

| Décision | Statut | Impact si non figé |
| --- | --- | --- |
| Domaine public définitif | Provisoire : `abs87.org` | Canonical, `og:url`, `sitemap.xml` faux/à refaire |
| Plan de site (URLs publiques réelles) | À figer (cf. §3) | Sitemap + maillage interne incomplets |
| Image de partage `og:image` (1200×630) | À produire | Aperçus sociaux cassés |
| Page publique livrée vs maquette | Site en *Coming Soon* | Risque d'indexer des maquettes |

Tout est centralisé sur une constante `SITE_URL` (un seul endroit à changer).
Recommandé : `src/lib/site.ts` exportant `export const SITE_URL = "https://abs87.org"`.

## 2. État actuel (constaté le 2026-06-26)

- `index.html` : `lang="fr"`, un `<title>` et une `<meta description>` uniques pour
  tout le SPA. Pas d'Open Graph, pas de Twitter Cards, pas de canonical, pas de JSON-LD.
- Pas de `public/robots.txt`, pas de `public/sitemap.xml`.
- Le site est en mode **Coming Soon** (`/`). Les pages de contenu sont des
  **maquettes** sous `/test/*` (à NE PAS indexer).
- Stack **React 19** : le hissage natif des balises `<head>` est disponible
  (pas besoin de `react-helmet`).

### Routes actuelles

| Route | Composant | Nature | Indexable ? |
| --- | --- | --- | --- |
| `/` | `ComingSoon` | Page d'attente publique | Oui (temporaire) |
| `/orienter` | `Orienter` | Page publique | Oui |
| `/test` | `HomePage` | Maquette | **Non** |
| `/test/test1` | `Test1` | Maquette monopage | **Non** |
| `/test/test2` (+ `heberger`/`referent`/`ressources`) | `Test2Layout` | Maquette multipage | **Non** |

> Quand le vrai site remplacera le Coming Soon, mettre à jour ce tableau et le §3.

## 3. Plan de site cible (à compléter une fois figé)

URLs publiques pressenties (base `SITE_URL`). À ajuster selon l'architecture retenue
(monopage `/test1` vs multipage `/test2`) :

- `/` — Accueil
- `/heberger` — Devenir hébergeur
- `/referent` — Devenir référent / bénévole
- `/orienter` — Orienter une personne
- `/ressources` — Ressources / FAQ / dons

À chaque URL réelle : titre, meta description, et entrée sitemap dédiés.

## 4. Travaux à réaliser (checklist d'implémentation)

### 4.1 Titres & métadonnées par page (React 19, sans lib)

- [ ] Composant `src/components/site/Seo.tsx` rendant `<title>`, `<meta name="description">`,
      `<link rel="canonical">`, `og:title/description/url/image/type`, `twitter:card`.
- [ ] Props alimentées depuis `content.ts` (source éditoriale unique).
- [ ] Branché sur chaque page publique (pas sur les maquettes `/test/*`).

### 4.2 Open Graph statiques (crawlers sociaux sans JS)

- [ ] Bloc OG/Twitter **générique en dur** dans `index.html` (fallback partage).
- [ ] `public/og-image.png` (1200×630), basé sur le logo / une photo bichromie.
- [ ] *Optionnel étape 2* : prérendu statique (SSG) pour des OG **par page**.
      Non requis tant que le contenu reste en maquette.

### 4.3 robots.txt

- [ ] `public/robots.txt` :
  ```
  User-agent: *
  Allow: /
  Disallow: /test
  Disallow: /orienter   # à retirer quand la page sera finalisée si besoin
  Sitemap: https://abs87.org/sitemap.xml
  ```

### 4.4 sitemap.xml

- [ ] `public/sitemap.xml` listant uniquement les URLs publiques réelles (§3),
      base `SITE_URL`, avec `lastmod`.

### 4.5 Données structurées JSON-LD

- [ ] Bloc `schema.org/NGO` (ou `Organization`) dans `index.html` :
      `name`, `url`, `logo`, `areaServed` (Limoges / Haute-Vienne),
      `contactPoint`, liens réseaux sociaux quand connus.

### 4.6 Détails techniques

- [ ] `theme-color`, favicon multi-formats, `og:image` vérifiés.
- [ ] Exclure explicitement `/test/*` de l'indexation (robots + pas de `Seo` dessus).
- [ ] Vérifier les niveaux de titres sémantiques (`<h1>` unique par page) et les `alt`.

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
