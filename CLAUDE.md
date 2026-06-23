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
- Tailwind CSS v4 + shadcn/ui (style `radix-nova`, base `neutral`, variables CSS)
- React Router (`react-router-dom`)
- Police Nunito, self-hostée via `@fontsource-variable/nunito` (pas de CDN Google)
- Alias d'import `@/` → `src/`

La stack reprend celle de `abs-app/pwa` pour permettre le partage de composants.

## Conventions

- **Langue : français** pour l'UI, les commentaires et les messages de commit.
- **Commits : Conventional Commits en français** (ex. `feat: ajoute la page contact`),
  comme dans `abs-app`.
- Composants UI dans `src/components/ui/` (gérés par `npx shadcn@latest add ...`).
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

## À faire / en attente

- Cahier des charges : `designRequirements/CDC-v0.1.md` (à rédiger).
- Charte graphique : `styleGuide/document_technique.pdf` (à intégrer dans le thème).
