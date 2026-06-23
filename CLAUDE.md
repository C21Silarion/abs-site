# CLAUDE.md — abs-site

Site web **public** de l'association ABS — Accueil Bienveillant et Solidaire (Limoges).
Dépôt distinct de l'outil interne `abs-app` (dossier voisin `../abs-app`).

## Contexte

ABS met en relation des personnes sans hébergement stable avec des citoyens
hébergeurs bénévoles. Ce dépôt est le **site vitrine public** : présentation de
l'association, information du public, appel aux bénévoles/hébergeurs/dons. Pas de
données sensibles ni de logique métier interne ici (celle-ci est dans `abs-app`).

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 + shadcn/ui (config `components.json`, variables CSS)
- React Router (`react-router-dom`)
- Polices self-hostées via Fontsource (pas de CDN Google) :
  - **Nunito** (`@fontsource-variable/nunito`) — corps de texte
  - **Fraunces** (`@fontsource-variable/fraunces`) — titres (`font-display`)
- Alias d'import `@/` → `src/`

La stack reprend celle de `abs-app/pwa` pour permettre le partage de composants.

## Identité visuelle (cf. `designRequirements/CDC-v0.1.md` §3)

Le thème de marque ABS est défini dans `src/index.css` (variables + `@theme inline`) :

- **Palette** : Crème `#FFFFF1` (fond), Orange `#EF7749` (CTA chaleureux),
  Lavande `#9172B0`, Aubergine `#432663` (texte/structure), Peach `#FDE7DF` (teinte douce).
  Utilitaires Tailwind : `bg-creme`, `text-aubergine`, `bg-orange`, `text-lavande`, etc.
- **Règle a11y stricte** : jamais de texte orange sur fond violet (ni l'inverse).
  Orange/Aubergine s'emploient en *fond* avec texte clair ; le texte sur fond clair
  est en aubergine/quasi-noir.
- **Substitution de polices** : la charte spécifie *Euripides Semibold* (titres) et
  *Arial Rounded MT* (corps), non libres pour le web. Substituts retenus :
  **Fraunces** (serif doux, effet « découpé main ») et **Nunito** (terminaisons
  arrondies). À remplacer si les licences des polices d'origine sont acquises.
- **Éléments graphiques « fait main »** dans `src/components/site/brand/` :
  `HouseMark` (silhouette de maison, tracé de `maison.svg` inliné et recolorable
  via `fill`, utilisée en filigrane), `DuotonePhoto` (placeholder photo
  bichromie/tramée), `FilConducteur` (séparateur — actuellement non utilisé).

### Logos & assets de marque

Les fichiers de charte sont dans `src/assets/brand/` (importés comme URL par Vite).
Le composant `Logo` (`brand/Logo.tsx`) expose trois variantes via la prop `variant` :

| `variant`         | Fichier                              | Usage |
| ----------------- | ------------------------------------ | ----- |
| `full` (défaut)   | `logo-abs-orange-baseline-wide.svg`  | héros, page d'accueil (sigle + baseline, format large) |
| `wordmark`        | `logo-abs-no-baseline.svg`           | header de nav (sigle ABS orange, compact) |
| `creme`           | `logo-abs-mono-creme.svg`            | footer aubergine (sigle ABS crème) |

La hauteur se règle via `className` (ex. `h-44`). Le `viewBox` de
`logo-abs-orange-baseline-wide.svg` a été **rogné** (`38.7 0 1422.8 400`) pour
supprimer le padding interne et aligner le logo à gauche avec le texte ; à
refaire si le fichier est ré-exporté depuis l'outil de design.
`logo-abs.svg` (ancien logo carré) n'est plus utilisé.

## Conventions

- **Langue : français** pour l'UI, les commentaires et les messages de commit.
- **Commits : Conventional Commits en français** (ex. `feat: ajoute la page contact`),
  comme dans `abs-app`.
- Composants de site dans `src/components/site/` : `brand/` (logo, maison, fil,
  photo bichromie), `ui/` (Button cva, Section, Faq, PageHeader, formulaire LE116),
  `sections/` (Hero, Plaidoyer, ChiffresCles, Parcours*, GalerieMedias, Ressources,
  SiteFooter). Le contenu éditorial est centralisé dans `src/components/site/content.ts`.
- Helper `cn()` depuis `@/lib/utils` pour composer les classes Tailwind.
- Une page = un fichier dans `src/pages/`, branchée dans `src/App.tsx`.
- Le site est public et orienté SEO : soigner les balises `<title>`/`<meta>`,
  le texte sémantique et l'accessibilité.

## Commandes

```bash
npm install        # installer les dépendances
npm run dev        # dev server → http://localhost:5174
npm run build      # build de production
npm run lint       # ESLint
```

## Maquettes comparatives

Deux architectures candidates pour le même contenu (cf. CDC §4 et §5), accessibles
depuis la page d'accueil :

- **`/test1`** — version **monopage** (CDC §4) : parcours descendant, CTA jumeaux
  qui défilent vers les ancres `#heberger` / `#referent`.
- **`/test2`** — version **multipage** (CDC §5) : `Test2Layout` (header + footer
  communs) avec routes imbriquées `index` / `heberger` / `referent` / `ressources` ;
  CTA jumeaux qui redirigent vers les pages dédiées.

Les deux consomment les mêmes composants `src/components/site/`. Conversion
(HelloAsso, formulaire LE116, réseaux) figurée par des **placeholders** : aucune
intégration tierce réelle pour l'instant.

## À faire / en attente

- Intégrations réelles : HelloAsso (dons/adhésions), formulaire LE116, embeds vidéo.
- Vraies photos traitées en bichromie/tramées, vrais PDF de ressources.
- Acquérir/licencier les polices d'origine (Euripides, Arial Rounded MT) si besoin.
