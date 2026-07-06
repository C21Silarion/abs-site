# CLAUDE.md — abs-site

Site web **public** de l'association ABS — Accueil Bienveillant et Solidaire (Limoges).
Dépôt distinct de l'outil interne `abs-app` (dossier voisin `../abs-app`).

## Contexte

ABS met en relation des personnes sans hébergement stable avec des citoyens
hébergeurs bénévoles. Ce dépôt est le **site vitrine public** : présentation de
l'association, information du public, appel aux bénévoles/hébergeurs/dons. Pas de
données sensibles ni de logique métier interne ici (celle-ci est dans `abs-app`). L'app est connu sous le surnom Le116 celui ci ne doit PAS être visible sur le site. 

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 + shadcn/ui (config `components.json`, variables CSS)
- React Router (`react-router-dom`)
- Polices self-hostées (pas de CDN Google) :
  - **Arial Rounded MT** (`public/fonts/Arial Rounded MT + Helvetica.ttf`, licence acquise) — corps de texte (`font-sans`)
  - **Nunito** (`@fontsource-variable/nunito`) — repli si le fichier Arial Rounded MT ne charge pas
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
- **Typographies** : *Euripides Semibold* (titres, licence gratuite association —
  fichier `public/fonts/Euripides-SemiBold.woff2`, `@font-face` dans
  `src/index.css`, crédit auteur obligatoire affiché dans `SiteFooter`) et
  **Arial Rounded MT** (corps, licence acquise — fichier
  `public/fonts/Arial Rounded MT + Helvetica.ttf`, `@font-face` dans `src/index.css` ;
  `Nunito Variable` reste importé comme repli si ce fichier ne charge pas).
- **Éléments graphiques « fait main »** dans `src/components/site/brand/` :
  `HouseMark` (silhouette de maison, tracé de `maison.svg` inliné et recolorable
  via `fill`, utilisée en filigrane) et `DuotonePhoto` (placeholder photo
  bichromie/tramée).

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
  photo bichromie), `ui/` (Button, Disclosure — accordéon `<details>` natif qui
  propage sa teinte claire/aubergine aux formulaires via `FormToneContext`),
  `form/` (primitives de champ `Field.tsx` — `TextField`/`TextArea`/`FormDone`/
  `FormErrors`/`Honeypot`, `ChipMulti` pastilles multi-sélection, `CreneauGrid`),
  `forms/` (formulaires publics complets — voir plus bas), `sections/` (Hero,
  Plaidoyer, ChiffresCles, Parcours*, GalerieMedias, Ressources, SiteFooter).
  Le contenu éditorial est centralisé dans `src/components/site/content.ts`.
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

### Déploiement sur le VPS

Après un `git pull` sur le VPS, rebuilder via Docker (pas de Node natif) :

```bash
docker run --rm -v "$PWD":/app -w /app node:22-alpine sh -c "npm ci && npm run build"
```

Le dossier `dist/` est ensuite servi par le serveur web.

## Site (monopage)

Architecture retenue : **monopage** (CDC §4), accessible en interne sur `/test` —
parcours descendant, CTA jumeaux qui défilent vers les ancres `#heberger` /
`#referent`. La maquette multipage (CDC §5) a été abandonnée et supprimée.

Le nom de l'outil interne (Le116) ne doit jamais apparaître côté site public —
ni en texte ni en nom de composant (visible via React DevTools).

HelloAsso (dons/adhésions) et les embeds vidéo restent des **placeholders** :
aucune intégration tierce réelle pour l'instant. **Les formulaires de
candidature (bénévole/hébergeur/disponibilité), eux, sont réels** — voir
section suivante.

## Formulaires publics (candidature bénévole/hébergeur, disponibilité, orientation)

L'UI de ces formulaires a été migrée ici depuis `abs-app` (qui en conservait
des pages désormais mortes/commentées dans son routeur — voir son
`CLAUDE.md`). Le **backend reste dans `abs-app`** : ce dépôt n'a aucune clé
Grist, il appelle `POST /api/public/*` en relatif (`src/lib/publicApi.ts`) —
même origine en prod via le proxy Caddy `/api`, proxy Vite en dev
(`vite.config.ts`).

- **Candidature bénévole/hébergeur + dispo** : embarquées dans le monopage
  (`src/pages/HomePage.tsx`) via `Disclosure` (accordéon, `tone="aubergine"`
  pour les mettre en avant), composants `src/components/site/forms/
  {BenevoleForm,HebergeurForm,DispoForm}.tsx`.
- **Orientation demandeur** : page autonome dédiée (`src/pages/Orienter.tsx`
  → `OrienterForm.tsx`), route `/orienter`, URL « need-to-know » non diffusée
  depuis la navigation du site.
- **Contrat anti-abus** (identique côté abs-app) : jeton récupéré au montage
  (`getPublicFormToken`) + renvoyé à la soumission (nonce + piège temporel
  ≥ 3 s), honeypot `hp`, POST sans cookie de session.
- **`src/lib/profilOptions.ts`** : miroir statique des énumérations Grist
  (types d'aide, créneaux) — page publique non authentifiée, pas d'accès aux
  choices Grist. **DOIT rester aligné manuellement** avec
  `abs-app/pwa/src/lib/profilOptions.ts` et `schema/enums/*.yaml` ; a été pris
  en défaut une fois déjà (types d'aide périmés, session 88 côté abs-app).

## À faire / en attente

- Intégrations réelles restantes : HelloAsso (dons/adhésions), embeds vidéo.
- Vraies photos traitées en bichromie/tramées, vrais PDF de ressources.
