# abs-site

Site web public de l'association **ABS — Accueil Bienveillant et Solidaire** (Limoges).

ABS met en relation des personnes sans hébergement stable avec des citoyens hébergeurs bénévoles. Ce dépôt contient le site vitrine public ; l'outil interne de gestion des bénévoles vit dans le dépôt voisin [`abs-app`](../abs-app).

## Statut

**En construction.** Mise en place du dépôt et de la stack.

## Stack

- **[React](https://react.dev/) 19 + [Vite](https://vite.dev/)** (TypeScript) — application
- **[Tailwind CSS](https://tailwindcss.com/) v4 + [shadcn/ui](https://ui.shadcn.com/)** — styles et composants (style `radix-nova`, base `neutral`)
- **[React Router](https://reactrouter.com/)** — routage
- Police : **Nunito** (self-hostée via `@fontsource-variable/nunito`)

La stack reprend volontairement celle de la PWA `abs-app/pwa` pour faciliter le partage de composants et la cohérence visuelle.

## Démarrer en local

### Pré-requis

- [Node.js](https://nodejs.org/) 20+ et npm

### Installation

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:5174` (5173 est réservé à la PWA `abs-app`).

### Scripts

| Commande          | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Serveur de développement Vite            |
| `npm run build`   | Build de production (`tsc -b && vite build`) |
| `npm run preview` | Prévisualise le build de production      |
| `npm run lint`    | ESLint                                   |

## Structure

```
src/
  components/ui/   composants shadcn/ui
  lib/utils.ts     helper cn()
  pages/           pages (routes)
  App.tsx          déclaration des routes
  main.tsx         point d'entrée
designRequirements/  cahier des charges (CDC)
styleGuide/          charte graphique / document technique
```

## Documentation projet

- `designRequirements/` — cahier des charges
- `styleGuide/` — charte graphique
- `CLAUDE.md` — conventions pour les agents IA
