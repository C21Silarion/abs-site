# Assets de marque ABS

Déposez ici les éléments graphiques fournis (logo, formes de maisons, etc.)
exportés depuis la charte (`styleGuide/document_technique.pdf`).

## Où placer quoi

- **`src/assets/brand/`** (ce dossier) → éléments **importés dans les composants**
  React (logo, formes décoratives). Permet le tree-shaking et, pour les SVG, la
  recoloration via les variables de marque. **C'est le dossier par défaut.**
- **`public/`** → uniquement les fichiers servis à une URL fixe
  (favicon, image Open Graph, PDF téléchargeables). Référencés par `/nom.ext`.

## Format recommandé

- **SVG de préférence** (net à toute taille, recolorable, léger).
- Sinon **PNG sur fond transparent**, en haute résolution (≥ 2× la taille d'affichage).
- Évitez le JPEG pour les logos/illustrations (pas de transparence, artefacts).

## Noms de fichiers attendus (pour câblage automatique)

Nommez les fichiers ainsi — je les brancherai directement dans les composants :

| Fichier                                | Usage                                                          | Composant |
| -------------------------------------- | -------------------------------------------------------------- | --------- |
| `logo-abs-orange-baseline-wide.svg`    | Logotype orange large (sigle + baseline) → `variant="full"`    | héros, accueil |
| `logo-abs-no-baseline.svg`             | Sigle ABS orange seul (sans baseline) → `variant="wordmark"`   | header de nav |
| `logo-abs-mono-creme.svg`              | Sigle ABS en crème (fonds sombres) → `variant="creme"`         | footer aubergine |
| `maison.svg`                           | Silhouette de maison « fait main » (tracé inliné dans `HouseMark`) | filigranes héros/entêtes |
| `logo-abs.svg`                         | Ancien logotype carré — **non utilisé** (conservé au cas où)   | — |
| `fil-conducteur.svg`                   | Ligne courbe orange — **non utilisée** actuellement            | — |

> Les autres formes (chaînes humaines, motifs…) : déposez-les avec un nom
> descriptif en kebab-case (ex. `chaine-humaine.svg`) et dites-moi où les utiliser.

## Conseils pour les SVG recolorables

Si vous voulez que je puisse teinter une forme avec les couleurs de marque
(crème / orange / lavande / aubergine), exportez le SVG **sans couleur figée** :
remplacez les `fill="#432663"` par `fill="currentColor"`. Sinon, fournissez une
version par couleur (ex. `maison-aubergine.svg`, `maison-orange.svg`) — ça marche aussi.
