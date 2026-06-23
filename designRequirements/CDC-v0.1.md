# 📖 Cahier des Charges Design & Fonctionnel : Site Web ABS

**Version : 2026 — Intégration des principes d'analyse comparative (Benchmarks)**

## 1. Philosophie & Contrainte Clé : La Résilience

- **Règle d'or : Minimalisme et Maintenance Zéro.** L'association fonctionne entièrement grâce à des bénévoles et ne dispose d'aucun poste salarié. Le site doit être pensé comme une vitrine statique robuste capable de survivre sans aucune mise à jour technique ou éditoriale régulière.
    
- **Pas d'Espace Personnel / Comptes utilisateurs :** Jugé trop complexe à sécuriser et à maintenir. Conformément aux standards des grandes structures solidaires (_Utopia 56_, _J'accueille_), le site web n'est pas un espace de travail mais un point d'entrée informationnel.
    
- **Pas de système de mise en relation directe (Hébergeur / Réfugié) :** Trop lourd à gérer et nécessite une modération humaine permanente.
    
- **Pas d'agenda dynamique ou de calendrier d'événements :** Risque de donner l'image d'un site "mort" si personne ne l'alimente de manière régulière. On préférera renvoyer vers les réseaux sociaux pour les actualités chaudes.
    
- **Principe d'externalisation administrative :** Le site ne contient aucune logique métier complexe. Toutes les actions de conversion (dons, adhésions) ou de communication chaude sont déportées vers des infrastructures tierces robustes (HelloAsso, WhatsApp, Instagram, Facebook).


## 2. Objectifs & Publics Cibles

Le site s'adresse en priorité au Grand Public avec une stratégie d'**Aiguillage à Double Voie (Dual-Track Onboarding)** dès le premier coup d'œil.

### Les Deux Messages Clés Prioritaires (Niveau égal sur la page d'accueil)

1. **Trouver des hébergeurs :** Des citoyens prêts à accueillir temporairement (familles, personnes exilées).
    
2. **Trouver des référents / bénévoles :** Des personnes clés pour accompagner et sécuriser ces binômes d'accueil.


### Cartographie des contenus par public

- **Futurs Accueillants (Principe de Rassurance) :** Centralisation des réponses aux freins psychologiques et logistiques (explication de la période de test, rôle protecteur du référent, gestion des assurances).
    
- **Donateurs :** Accès direct et sécurisé au financement de la solidarité.
    
- **Bénévoles & Personnes accueillies :** Le site web n'est pas un outil de gestion interne (Le116 est prévu pour ça). En revanche, le livret de l'association (incluant les contacts des autres structures et les fiches pratiques) ainsi que les flyers/affiches de l'association seront disponibles en téléchargement direct.

## 3. Direction Artistique (Identité Visuelle)

Le design doit transmettre trois sentiments principaux : **Solidarité, Inclusion, Soutien**. Visuellement, l'identité repose sur les notions de fait main (action citoyenne), de sécurité (stabilité du toit) et de douceur (enfance/joie).

### 🎨 Palette de Couleurs

Quatre couleurs principales composent l'univers d'ABS, complétées par le noir et le blanc si nécessaire :

- **Crème (`#FFFFF1`) :** Couleur de fond principale pour adoucir le site (alternative au blanc pur).
    
- **Orange (`#EF7749`) :** Évoque la chaleur humaine, l'accueil et le dynamisme.
    
- **Lavande (`#9172B0`) :** Évoque les luttes sociales locales et politiques (féministes, antiracistes, de classes) tout en adoucissant l'orange.
    
- **Aubergine (`#432663`) :** Teinte sombre pour assurer les contrastes et la structure.
    

> ⚠️ **Règle d'accessibilité stricte :** Le contraste direct entre l'Orange et les deux violets (Lavande/Aubergine) est insuffisant pour respecter les standards de lisibilité des textes. Ne jamais superposer du texte orange sur fond violet, ni l'inverse. Utiliser l'Aubergine ou le Noir pour les textes sur fond clair.

### 🔤 Typographies

- **Titres & Sous-titres :** _Euripides Semibold_. Apporte de la singularité, des courbes douces et des empattements solides, donnant un effet "découpé à la main".
    
- **Textes courants :** _Arial Rounded MT_ (ou _Bold_ pour la hiérarchie). Ses terminaisons arrondies évoquent la douceur, la convivialité et le lien humain, tout en garantissant une parfaite lisibilité.

### 📐 Éléments Graphiques & Iconographie

- **Formes "Fait Main" & Imparfaites :** Utilisation d'illustrations aux contours simplifiés, tracés grossièrement avec peu de points d'ancrage (effet papier découpé sur logiciel ou aux ciseaux). Éviter les lignes géométriques parfaites et stériles pour valoriser l'action avec les "moyens du bord" (ex: silhouettes de maisons violettes, chaînes humaines).
    
- **Traitement Texturé des Photos :** Les photos réelles (événements passés, portraits) doivent être traitées en **bichromie** (ex: nuances de Lavande/Aubergine vers le Crème) et **tramées** (effet _dithering_ / texture pixel) pour s'intégrer harmonieusement au style illustré.
    
- **Le Fil Conducteur :** Des lignes courbes oranges (représentant le lien qui guide la lecture) peuvent s'entremêler autour des photos et des blocs de texte.

## 4. Structure de l'Interface & Parcours Utilisateur

Le site s'organise sous la forme d'une page unique (_Single Page_) ou d'une arborescence ultra-courte, optimisée pour un chargement rapide et une clarté immédiate, s'inspirant de la convivialité des grands modèles de l'hébergement citoyen.

### 🟦 Page d'Accueil : Parcours Descendant

#### 1. Bloc Héros

- Le Logotype principal d'ABS bien visible avec sa baseline : "réseau d'hébergement solidaire en Haute-Vienne".
    
- **L'Accroche Prioritaire :** Un message fort, clair mettant en avant le double besoin de l'association.
    
- **Boutons d'Appels à l'Action (CTA) Jumeaux :** Deux boutons massifs, côte à côte, pour séparer immédiatement les flux de visiteurs (s'inspirant du benchmark _J'accueille / Utopia 56_) :
    
    - Button 1 (Style Orange/Chaleureux) : **"Je propose un hébergement"**
        
    - Button 2 (Style Aubergine/Solide) : **"Je deviens bénévole / référent"**


#### 2. Le Plaidoyer (Le "Pourquoi")

- Courte section textuelle présentant la démarche de l'association, son combat politique et solidaire pour la dignité des personnes exilées et sans abri.

#### 3. Les Chiffres Clés (Preuve d'Impact & Transparence)

- Un bloc visuel mettant en valeur la force du réseau local via des compteurs textuels simples (Lien temps réel avec Le116) :
    
    - _Nombre de personnes accueillies_
        
    - _Nombre d'hébergeurs / familles citoyennes engagées_
        
    - _Nombre de bénévoles / adhérents_

#### 4. Les Tunnels de Reassurance (Le "Comment ça marche ?")

Section divisée en deux colonnes distinctes ou deux sous-sections claires pour lever les freins à l'action :

- **Parcours Hébergeur :** Schéma simple en 3 étapes clés inspiré du dépliant (1. La Rencontre / 2. La Période de test & signature de la convention / 3. La Fin de l'hébergement accompagné). Mention explicite de la prise en charge de l'assurance.
    
- **Parcours Référent :** Explication transparente du rôle de pivot du référent (le bénévole qui fait le lien, rassure les familles et assure le suivi régulier).

#### 5. Galerie Visuelle & Médias (Convivialité)

- Mise en valeur de la vie de l'association à travers des photos texturées/tramées des activités passées.
    
- Intégration d'un bloc vidéo statique (ex: reportage France 3) pour humaniser le site sans alourdir la maintenance.

#### 6. Espace Ressources & Boîte à Outils (Zone de téléchargement)

- Boutons de téléchargement direct (fichiers PDF statiques) :
    
    - Le Livret d'accueil complet (avec la liste des associations partenaires et leurs fonctions).
        
    - Le kit de communication pour les militants (Affiches et flyers ABS à imprimer).
        
    - La dernière newsletter au format PDF (en complément de l'aiguillage vers les réseaux).

### 🟪 Pied de Page (Footer) & Tunnels de Conversion

Cette section basse centralise tous les outils tiers automatisés pour couper court à toute maintenance technique sur le site.

- **Intégration HelloAsso :** Insertion propre des widgets ou boutons d'action d'HelloAsso (sans redirection agressive si possible) pour :
    
    - L'adhésion officielle à l'association pour l'année en cours.
        
    - Le module de don unique/régulier ou participation à une cagnotte spécifique.
        
- **Contact direct Tri-Canal :** Affichage textuel brut et accessible pour éviter les pannes de formulaires :
    
    - Courriel direct + Numéro de Téléphone officiel + Formulaire HTML ultra-basique.
        
    - Mention claire des canaux WhatsApp pour les échanges opérationnels du quotidien.
        
- **Newsletter :** Un champ d'inscription minimaliste pour collecter les emails des sympathisants.
    
- **Aiguillage Réseaux Sociaux :** Liens vers Instagram et Facebook avec la mention explicite : _"Pas de fioritures ici ! Pour suivre nos actualités au jour le jour et voir la vie de l'asso, rejoignez-nous sur nos réseaux sociaux !"_


## 5. Structure de l'Interface & Architecture Multi-Pages

Le site web abandonne la page unique interminable pour s'organiser autour d'une arborescence ultra-courte de **4 fichiers HTML statiques indépendants**, garantissant une maintenance technique nulle et des liens directs faciles à partager sur WhatsApp.

```
├── index.html        (Accueil : Vitrine, Émotion, Chiffres & Action)
├── heberger.html     (Le Guide de l'Hébergeur : Sécurité, Processus & Assurance)
├── referent.html     (Le Guide du Référent : Rôle, Engagement & Pivot)
└── ressources.html   (Médiathèque : Téléchargements PDF & Vidéos)
```

### 🟦 Page 1 : `index.html` (L'Accueil Vitrine)

Cette page principale est allégée. Elle sert de point d'entrée émotionnel, valide la crédibilité de l'association par les chiffres, et propulse immédiatement l'utilisateur vers son parcours dédié.

- **1. Bloc Héros (Engagement)**
    
    - Le Logotype principal d'ABS bien visible avec sa baseline : "réseau d'hébergement solidaire en Haute-Vienne".
        
    - **L'Accroche Prioritaire :** Un message fort et clair mettant en avant le double besoin de l'association.
        
    - **Boutons d'Appels à l'Action (CTA) Jumeaux :** Deux boutons massifs, côte à côte, pour séparer immédiatement les flux de visiteurs. **Modification majeure :** Ces boutons ne font plus défiler la page, ils redirigent vers les pages dédiées.
        
        - Bouton 1 (Style Orange/Chaleureux) : `href="heberger.html"` ➔ **"Je propose un hébergement"**
            
        - Bouton 2 (Style Aubergine/Solide) : `href="referent.html"` ➔ **"Je deviens bénévole / référent"**
            
- **2. Le Plaidoyer (Le "Pourquoi")**
    
    - Courte section textuelle présentant la démarche de l'association, son combat politique et solidaire pour la dignité des personnes exilées et sans abri.
        
- **3. Les Chiffres Clés (Preuve d'Impact & Transparence)**
    
    - Un bloc visuel mettant en valeur la force du réseau local via des compteurs textuels simples et fixes (sans base de données complexe) :
        
        - _Nombre de personnes accueillies_
            
        - _Nombre d'hébergeurs / familles citoyennes engagées_
            
        - _Nombre de bénévoles / adhérents_
            
- **4. Aperçu de la Vie de l'Association (Convivialité)**
    
    - Une mini-galerie de 3 ou 4 photos passées en bichromie et tramées pour donner un visage humain au site dès la première page. Un bouton simple renvoie vers la page médias : `href="ressources.html"` ➔ **"Voir plus de souvenirs"**.
        

### 🟧 Page 2 : `heberger.html` (Devenir Hébergeur)

Espace entièrement dédié à la rassurance psychologique et juridique des citoyens prêts à ouvrir leur porte. Le contenu est détaillé pour lever tous les freins à l'engagement.

- **1. Entête "Accueillir chez soi"**
    
    - Un titre fort en _Euripides Semibold_ réaffirmant les valeurs de sécurité et de stabilité.
        
- **2. Le Schéma des Étapes Clés (Le "Comment ça marche ?")**
    
    - Reprise graphique du dépliant papier sous forme de frise chronologique épurée :
        
        - _Étape 1 : La Rencontre_ (Premier échange avec l'association pour faire connaissance).
            
        - _Étape 2 : La Convention & Période de test_ (Cadre clair, sécurisé et réversible).
            
        - _Étape 3 : L'Hébergement accompagné_ (Suivi permanent, fin de l'hébergement balisée).
            
- **3. Le Cadre de Sécurité & FAQ de l'Hébergeur**
    
    - **Assurance :** Mention explicite et rassurante de la prise en charge complète de l'assurance par ABS.
        
    - **Le Filet de Sécurité :** Explication détaillée de la présence constante d'un référent pour que la famille accueillante ne soit jamais seule face aux difficultés.
        
- **4. Passage à l'Action**
    
    - Le formulaire d'inscription LE116 inline dans la page. (réfléchir au captcha et autre protections..)
        

### 🟪 Page 3 : `referent.html` (Devenir Référent)

Page militante conçue pour recruter l'autre pilier indispensable d'ABS : les bénévoles d'accompagnement. Ce rôle de l'ombre y est valorisé et démystifié.

- **1. Entête "Devenir Référent·e"**
    
    - Message fort valorisant la solidarité et l'inclusion.
        
- **2. Définition du Rôle de Pivot**
    
    - Texte explicatif clair rédigé en _Arial Rounded MT_ expliquant ce qu'est un référent chez ABS : le garant du lien, la personne qui rassure les familles, assure le suivi régulier et fait le pont avec l'association.
        
- **3. FAQ & Logistique du Bénévole**
    
    - _Quel temps cela demande-t-il ? Comment s'organise l'aide aux démarches administratives ? Quelle est la place de l'outil WhatsApp dans la gestion quotidienne ?_
        
- **4. Appel à l'engagement**
    
    - Le formulaire d'inscription LE116 inline dans la page. (réfléchir au captcha et autre protections..)

### 🟩 Page 4 : `ressources.html` (Espace Ressources & Médiathèque)

Cette page sert d'armoire à archives statique. Elle centralise les éléments de plaidoyer et les outils de communication sans encombrer le parcours de conversion des deux pages précédentes.

- **1. La Boîte à Outils des Militants (Zone de téléchargement)**
    
    - Boutons de téléchargement direct pour les fichiers PDF statiques :
        
        - **Le Livret d'accueil complet :** Contenant les fiches pratiques et les contacts des autres structures et associations complémentaires.
            
        - **Le Kit de Communication :** Affiches et flyers officiels d'ABS à imprimer pour diffusion locale.
            
        - **La Lettre d'Information :** La dernière newsletter au format PDF pour les personnes qui préfèrent ce format aux réseaux sociaux.
            
- **2. Grand Angle (Médias & Vidéos)**
    
    - Intégration du bloc vidéo statique (par exemple, le reportage de France 3 Haute-Vienne) pour illustrer concrètement l'impact sur le terrain.
        
    - Galerie photo enrichie (toujours au format tramé/bichrome) montrant les activités passées de l'association.

### ⬛ Le Pied de Page Commun (`Footer` présent sur les 4 pages)

Cette section basse reste identique sur l'ensemble des 4 pages du site. Elle centralise tous les outils tiers automatisés pour couper court à toute maintenance technique ou modification de code.

- **Intégration HelloAsso (Les Tunnels Financiers) :**
    
    - Insertion propre des modules ou boutons HelloAsso (sans redirection agressive) :
        
        - L'adhésion officielle à ABS pour l'année en cours.
            
        - Le module de don unique ou régulier pour soutenir financièrement les actions de l'association.
            
- **Contact direct Tri-Canal :**
    
    - Affichage textuel brut pour éviter les pannes de scripts : Courriel direct + Numéro de téléphone officiel de permanence + Formulaire HTML basique.
        
    - Mention explicite que la gestion courante se fait hors-site, via les canaux WhatsApp existants.
        
- **Newsletter :** Un champ d'inscription minimaliste pour collecter les emails des sympathisants.
    
- **Aiguillage Réseaux Sociaux :**
    
    - Liens vers Instagram et Facebook avec la mention transparente : _"Pas de fioritures ici ! Notre site est minimaliste pour nous laisser le temps d'agir sur le terrain. Pour suivre nos actualités au jour le jour et voir la vie de l'asso, rejoignez-nous sur nos réseaux sociaux !"_