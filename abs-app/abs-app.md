# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation des dépendances

En cas de doute sur une librairie/framework du stack (React 19, Vite, Tailwind v4, shadcn/ui, Fastify, date-fns…), utiliser le serveur MCP **Context7** (`resolve-library-id` puis `query-docs`) — préférer Context7 à la mémoire.

## Projet

ABS-app est un outil interne de gestion des hébergements pour l'association **ABS — Accueil Bienveillant et Solidaire** (Limoges) : met en relation des personnes sans hébergement stable avec des hébergeurs bénévoles. **En développement actif — non utilisé en production.**

**Déploiement** : `docs/guides/deploiement-vps.md` centralise l'audit prod, le runbook, les variables d'env, les sauvegardes et les durcissements. Ne pas dupliquer ces sujets ici.

## Commandes essentielles

### Infrastructure

```bash
docker compose -f docker-compose.dev.yml up -d   # Démarrer (Grist + Caddy) ; down pour arrêter
docker compose -f docker-compose.dev.yml logs -f grist   # Logs
docker compose -f docker-compose.dev.yml down -v # ⚠️ efface les volumes (reset données)
```

### Serveur Node (Fastify)

```bash
cd server && npm install
npm run dev       # tsx watch (hot-reload)
npm run build     # tsc
npm test          # vitest — voir « Tests et vérification »
```

### PWA (React + Vite)

```bash
cd pwa && npm install
npm run dev       # Vite dev server (proxy /api → localhost:3000)
npm run build     # tsc -b && vite build
npm run lint      # eslint
```

### Pipeline Grist / Seed

```bash
cd scripts/seed
python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt

python schema_tool.py reset    # supprime les tables ABS (conserve "Empty")
python schema_tool.py init     # recrée depuis schema/schema.yaml
python schema_tool.py link     # convertit Ref/RefList en vraies références
python schema_tool.py import --data seed --reset   # peuple depuis les CSV
python schema_tool.py descriptions                 # descriptions de colonnes (tooltips PWA)
python schema_tool.py invite   # invite les bénévoles (rôle editors)
```

`.env` requis : `GRIST_API_KEY`, `GRIST_URL`, `GRIST_DOC_ID`.

**Important** : `invite` doit utiliser le rôle `"editors"`, pas `"viewers"`. Le rôle document Grist est un plafond : un `viewer` ne peut jamais écrire, même couvert par une règle ACL `allow update`. Toujours exécuter `access` avant `invite` sur un nouveau document.

> **Schéma additif** (ajout de colonnes/marqueurs sur tables existantes) : appliquer via `schema_tool.py update` + `access`, **jamais** `init`/`reset` (qui effacent les données), et pas de `link` si aucune nouvelle référence.

## Architecture

```
abs-app/
├── docker-compose.dev.yml   # dev (Grist + Caddy) ; docker-compose.yml = cible prod
├── caddy/Caddyfile          # reverse proxy TLS local
├── schema/                  # schema.yaml (source de vérité Grist) + enums/ (YAML)
├── scripts/seed/            # schema_tool.py (CLI schéma/données) + data/seed/*.csv (fictif)
├── server/src/              # Node.js + Fastify (TS)
│   ├── index.ts             # entrée : plugins + startAutomations()
│   ├── auth.ts              # Argon2id + JWT HMAC-SHA256 maison
│   ├── grist.ts             # client Grist API (deux modes d'auth)
│   ├── horodatage.ts        # journal Modification (ligneCreation/Modification/Automation)
│   ├── automations/         # index.ts (RULES), runner.ts (AutomationContext), trigger.ts (CLI),
│   │                        #   lib/ (heuresCalcul, statsCalcul, routageKm, dispoParse), rules/
│   ├── db/index.ts          # store SQLite local (better-sqlite3) — messagerie, HORS Grist
│   ├── notifications/service.ts  # notifs + broadcasts + feed unifié + prefs (SQLite)
│   ├── rgpd/                # manifest, detector, service, cli
│   └── routes/              # login, table (générique), stats, reglages, activite, agenda,
│                            #   notifications, rgpd, submissions, public, profil
└── pwa/src/                 # React 19 + Vite + Tailwind v4 + shadcn/ui
    ├── api.ts               # fetch vers le serveur (getTable, createRecord, patchRecord…)
    ├── components/          # AppLayout, RefLink, RefSelect, StatTile, BroadcastComposer, DetailHeader,
    │                        #   DateInput, DateTimeInput, RichText, LieuSelect, ui/ (shadcn)
    ├── lib/                 # permissions (miroir ACL), refUtils, heuresUtils, useNotifications,
    │                        #   usePersistedSelection, queryClient, utils
    └── pages/               # Login, Home, Agenda, Statistiques, Messages, Parametres
                             #   + 1 liste + 1 détail/création par entité (Demandeurs, Hebergeurs,
                             #   Benevoles, Ressources, AidePro, Hebergements, Suivi, Taches, Demenagements)
```

Chaque `XxxDetailPage.tsx` exporte aussi son `XxxNewPage` (même fichier). Formulaires publics hors `AppLayout` : voir « Formulaires publics ».

### Flux de données

```
Navigateur (PWA)
  → Vite proxy /api → Node/Fastify (port 3000)
       → Grist API (X-Forwarded-User : email du bénévole)   ← accès ACL-filtré
       → Grist API (Authorization: Bearer <clé admin>)      ← lookup login + agrégats
       → SQLite local (server/data/abs.db)                  ← messagerie, HORS Grist
  → https://grist.abs-app.local (Caddy) → Grist (port 8484)
```

### Accès en dev

- Grist direct (scripts, Node) : `http://localhost:8484`
- Grist via Caddy (navigateur) : `https://grist.abs-app.local` (TLS interne auto-signé) — ajouter `grist.abs-app.local` à `/etc/hosts` → `127.0.0.1`

## API serveur

`server/src/routes/table.ts` — route générique pour toutes les tables Grist : `GET /api/table/:name` (tous), `POST` (crée → `{ id }`), `PATCH /:id` (maj champs), `DELETE /:id`.

`ALLOWED_TABLES` : `Demandeurs`, `Hebergeurs`, `Benevoles`, `Ressources`, `AideProfessionnelle`, `Hebergements`, `Suivi`, `Taches`, `Demenagements`, `SaisiesHeures`, `JournalHeures`, `Lieux`. Le journal `Modification` n'est écrit que pour `JOURNALIZED_TABLES` (`Ressources`/`AideProfessionnelle`/`JournalHeures`/`Lieux` n'ont pas la colonne → exclues). Toutes les routes utilisent `X-Forwarded-User` ; les 403 Grist mappés en 403 serveur.

### Endpoints dédiés (hors route générique)

Toutes gardées par le cookie JWT (`abs_session`).

| Route | ACL | Rôle |
|-------|-----|------|
| `GET /api/dashboard` | self | Suivis + Tâches + Déménagements du bénévole (HomePage) |
| `GET /api/stats` | tous | KPIs anonymisés (lecture admin → comptes) + `demographie` (âges/genres des demandeurs en suivi actif) |
| `GET /api/stats/trends` | tous | Séries mensuelles heures/KM depuis `JournalHeures` (sommes, sans PII) |
| `GET /api/stats/history` | tous | Séries mensuelles association depuis `StatsMensuelles` (Snap* `null` si `backfill`) |
| `GET /api/stats/aggregates` | tous | Synthèse par année + depuis le début (moyennes, totaux, répartition par localisation), en direct |
| `GET /api/activite/:benevoleId[/history]` | self ou Admin | Sources brutes (Suivi/Taches/Demenagements/SaisiesHeures) ; `/history` = évolution archivée (`JournalHeures`) |
| `GET\|PATCH /api/reglages` | tous / **Admin** | Lit / met à jour les paramètres (écriture admin après check `payload.pole`) |
| `GET /api/agenda?from&to` | mixte | Planning Gantt — `Hebergements` lecture admin + anonymisation ; autres via `X-Forwarded-User` |
| `GET /api/notifications` ; `POST …/:id/read`, `/read-all` ; `GET\|PUT /api/notification-prefs` | self | Feed unifié + `unreadCount` ; marque lu ; préférences opt-out |
| `GET\|POST\|DELETE /api/broadcasts[/:id]` ; `POST …/:id/dismiss` | **Admin** / self | CRUD annonce ; masque une annonce |
| `GET /api/profil` ; `PATCH /api/profil` | self | Lecture/modification profil bénévole (email, password) |
| `GET /api/attachments/:attachmentId` ; `POST /api/attachments/:entityType/:entityId` | ACL-filtered | Télécharger / uploader fichiers (JPEG/PDF) |
| `GET /api/table/:name/descriptions` | tous | Descriptions colonnes pour tooltips PWA |
| `GET /api/submissions` | **Admin** | Liste des soumissions publiques en attente (revue + approbation) |
| `GET /api/rgpd/candidates` | **Admin** | Détecteur read-only des lignes inactives (5 tables de contact) |
| `POST /api/rgpd/anonymize` ; `…/postpone` | **Admin** | Efface les PII (+ cascade enfants), garde la ligne ; ou `DernierContact` → aujourd'hui |

**Pattern ACL « lecture admin + projection sûre »** (`/api/stats*`) : lecture avec la clé admin (bypass ACL) mais on ne renvoie que des **agrégats anonymisés** (comptes/sommes) — **jamais** de libellés nominatifs.

**`/api/agenda` — ACL mixte** : `Taches`/`Demenagements`/`Hebergeurs`/`Demandeurs` via `X-Forwarded-User` (`safeGet` → `[]` si 403). `Hebergements` en lecture **admin** + filtrage manuel : affiché seulement si un demandeur/hébergeur est dans le périmètre visible ; hébergeur non lisible → `"[hébergeur]"` (une org partenaire voit que ses demandeurs sont hébergés sans identifier l'hébergeur). Les noms ne sont résolus que depuis les maps construites sur les listes ACL-filtrées.

## Automations serveur

Règles serveur exécutées indépendamment des requêtes HTTP (`server/src/automations/`).

**Ajouter une règle** : créer `rules/maRegle.ts` (export d'un `AutomationRule`), l'ajouter à `RULES` dans `automations/index.ts` **et** au `RULES` miroir de `trigger.ts` (sinon non déclenchable manuellement).

`AutomationRule` = `{ id, description, trigger, run(ctx) }`. `trigger` : `ScheduleTrigger` (`{ type: "schedule", cron, runOnStartup }`, node-cron Europe/Paris) ou `EventTrigger` (CREATE/UPDATE Grist).

**`AutomationContext`** : `log(msg)` (préfixé `[automation:<id>]`) ; `gristGetAll(table)` (auth admin, bypass ACL) ; `getReglage(col, default?)` (valeur numérique 1ʳᵉ ligne `Reglages` ; `0`/absent → défaut) ; `gristPatch(table, id, fields, journalNote?)` (PATCH admin ; si `journalNote`, met à jour `Modification` via `ligneAutomation()`).

**Invariant** : les automations utilisent **exclusivement** `Authorization: Bearer` (clé admin) ; jamais `X-Forwarded-User` (ce serait usurper un bénévole).

**Déclencher manuellement** (dev/test) : `npm run trigger -- --list` puis `npm run trigger -- <rule-id>` (même contexte qu'une exécution planifiée ; charge `.env`, pas besoin du serveur HTTP). Variable `FAKE_NOW` (ISO 8601, ex. `FAKE_NOW="2026-07-01T07:00:00Z"`) simulée par `demenagement-auto-cloture` et `tache-auto-cloture` pour tester des dates futures sans modifier les données.

**`lib/kmCalcul.ts`** — logique de calcul KM/temps partagée entre les EventRules (`reactions.ts`) et les crons. Exporte `computeKmDemenagement(ctx, id, fields)` et `computeKmTache(ctx, id, fields)` avec signature `AutomationContext` ; les EventRules délèguent après leurs guards (`statut`, `kmShouldRun`) ; les crons appellent directement après le PATCH de statut.

### Règles existantes

Crons (`Cron` = heure quotidienne Europe/Paris) :

| ID | Fichier | Cron | Logique |
|----|---------|------|---------|
| `demandeur-urgence` | `demandeurUrgence.ts` | `0 7` | `StatutHebergement` En attente → Urgence si `today ≥ DateBesoin − SeuilUrgence` |
| `hebergement-debut` | `hebergementCycle.ts` | `0 7` | `Prévu` DateDebut ≤ today → `En cours` ; cascade Demandeurs → `Hébergé`+`HebergePar`, Hébergeur → `Héberge déjà` |
| `hebergement-fin` | `hebergementCycle.ts` | `0 7` | `En cours` DateFinPrevue ≤ today → `Terminé` ; cascade Demandeurs (sans autre hébergement actif) → `En attente` (ou `Entre deux` si une autre réservation `Prévu` existe — look-forward `lib/lookForward.ts`)+HebergePar vidé, Hébergeur → `En repos` (ou `Hébergement prévu` si autre réservation) ; + `PrecedentsHebergements` |
| `demenagement-auto-cloture` | `demenagementCycle.ts` | `0 7` | `Prévu` DateHeure ≤ now → `Terminé` ; calcule `KmBenevole`+`KmAides`+temps inline (Nominatim/OSRM). Variable `FAKE_NOW` (ISO) pour tester sans toucher les dates |
| `tache-auto-cloture` | `tacheCycle.ts` | `0 7` | Passe 1 : `Prévu`/`En cours` + `DateFin` ≤ now → `Terminé` (si pas de `DateFin`, `DateDebut` fait office) ; TypeTache Transport → calcule `KmTache`+temps inline. Passe 2 : `Prévu` + `DateDebut` ≤ now + `DateFin` future → `En cours`. Variable `FAKE_NOW` pour test |
| `calcul-heures-mois-courant` | `calculHeuresMoisCourant.ts` | `0 3` | Recalcule `TempsPasseABS`+`Kilometrage` (mois courant) |
| `archivage-heures-mensuel` | `archivageHeuresMensuel.ts` | `5 0` | Jour `JourArchivage` : archive JournalHeures + remet à zéro |
| `archivage-stats-mensuel` | `archivageStatsMensuel.ts` | `6 0` | Jour `JourArchivage` : archive **une** ligne `StatsMensuelles` (FLOW+SNAPSHOT), idempotent, sans reset |
| `backfill-stats` | `backfillStats.ts` | CLI seul | Reconstruit les mois passés (FLOW seul, `Backfill=true`, SNAPSHOT vide) |
| `adhesion-annuelle-reset` | `adhesionAnnuelleReset.ts` | `30 7` | Date `DateResetAdhesion` : `AdhesionABS → false` sur 3 tables, avance la date d'un an |
| `purge-submissions` | `purgeSubmissions.ts` | `30 4` | Purge RGPD de `public_submissions` : traitées > 90j (`SUBMISSIONS_RETENTION_DAYS`), en attente > 365j (`…_PENDING_…`) |
| `rappels-j1` | `rappelsJ1.ts` | `0 8` | Rappels (`rappel`) : déménagements/tâches → assignés ; fins d'hébergement → référents. Délai par type via `Reglages.Rappel{Demenagement,Tache,FinHebergement}Jours` (défaut 1, « exactement N jours avant », match date par chaîne calendaire) |

EventRules (réaction in-process à un CREATE/UPDATE Grist) :

| ID | Fichier | Déclencheur | Logique |
|----|---------|-------------|---------|
| `demenagement-termine-km` | `reactions.ts` | UPDATE `Demenagements.Statut` | → Terminé : calcule `KmBenevole`+`KmAides` (Nominatim/OSRM). Délègue à `lib/kmCalcul.ts` |
| `tache-transport-termine-km` | `reactions.ts` | UPDATE `Taches.Statut` | → Terminé + TypeTache=Transport : calcule `KmTache` (`id:km`). Délègue à `lib/kmCalcul.ts` |
| `hebergement-statut-demandeur` | `reactions.ts` | CREATE `Hebergements` | Création `En cours` → cascade immédiate (Demandeurs `Hébergé`+`HebergePar`, Hébergeur `Héberge déjà`) |
| `hebergement-reservation-create` / `-update` | `reactions.ts` | CREATE / UPDATE→`Status` `Hebergements` | Réservation `Prévu` → Demandeurs `En attente`/`Urgence`→`Entre deux` uniquement ; `Hébergé` = **aucune cascade** (reste Hébergé jusqu'à la fin du séjour) ; Hébergeur disponible→`Hébergement prévu` (`lib/lookForward.ts`) |
| `hebergement-historique` | `reactions.ts` | UPDATE `Hebergements.Status` | → Terminé/Annulé/Interrompu : ajoute `PrecedentsHebergements`. **N'écrit pas** le reset des statuts (voir dialogues PWA) |
| `tache-notif-creation` | `notifications.ts` | CREATE `Taches` | Notifie les assignés (sauf l'acteur). Titre + **nom redactable** (`objType`/`objLabel`, masqué par l'ACL) |
| `demenagement-notif-creation` | `notifications.ts` | CREATE `Demenagements` | Notifie bénévole + aides + nom redactable |
| `suivi-notif-creation` | `notifications.ts` | CREATE `Suivi` | Notifie référent + co-référent |
| `demandeur-notif-urgence` | `notifications.ts` | UPDATE `Demandeurs.StatutHebergement` | → Urgence : notifie les référents des suivis actifs (`dedupKey` partagé avec le cron) |
| `demandeur-notif-creation`, `hebergeur-notif-creation`, `benevole-notif-creation` | `notifications.ts` | CREATE respectif | Notifie les pôles avec accès (Actif) ; demandeur **ignore les fiches enfant**. Catégorie `nouvelle-fiche` |

Les `EventRule` de notification écrivent dans **SQLite** (`createNotification`), jamais dans Grist ; enregistrées via `NOTIFICATION_EVENT_RULES` (+ `EVENT_RULES` de réaction). Convention : ne jamais notifier l'acteur de sa propre action (`actorEmail` → id bénévole).

### Cascade de statut Hébergement → Demandeur / Hébergeur

**Statuts « réservation »** : un hébergement `Prévu` (futur) se reflète sur les liés. Demandeur `Entre deux` = a encore un besoin immédiat (`En attente`/`Urgence`) **et** une réservation à venir — compté en recherche. Demandeur `Hébergement prévu` = **choix manuel d'un bénévole uniquement** (jamais posé automatiquement) : signifie que le demandeur n'a pas de besoin immédiat mais une réservation est prévue — hors compteur stats comme `Hébergé hors ABS`. Un demandeur `Hébergé` avec une réservation future garde son statut `Hébergé` jusqu'à la fin du séjour `En cours` ; c'est seulement à la clôture que le look-forward s'applique (`→ Entre deux` auto, ou `→ Hébergement prévu` manuellement dans le CloturDialog). Hébergeur `Hébergement prévu` = réservé pour la période (occupé, hors dispo). La logique look-forward est factorisée dans `automations/lib/lookForward.ts` (serveur) et son miroir `pwa/src/lib/hebergementCycle.ts` (PWA).

Chemins distincts qui mettent à jour les statuts liés (Demandeur `StatutHebergement`+`HebergePar`, Hébergeur `Disponibilite`) :

1. **Cron** `hebergement-debut`/`hebergement-fin` (07h00) — transitions **basées sur les dates**, cascade incluse ; `hebergement-fin` applique le look-forward (`Entre deux`/`Hébergement prévu`).
2. **EventRule** `hebergement-statut-demandeur` (**CREATE** seul, `En cours`) + `hebergement-reservation-create`/`-update` (CREATE/UPDATE→`Prévu`) — cascade serveur immédiate (démarrage / réservation).
3. **Dialogue PWA** `DemarrageDialog`/`CloturDialog` (`HebergementDetailPage.tsx`, `handleSave()`) — **édition manuelle** : dialogue pré-rempli (défauts via look-forward ; option « Ne pas modifier »), cascade **côté client** via `patchRecord` (guard « autre séjour actif » comme le cron). **Seul** chemin qui réinitialise les statuts à la clôture manuelle ET au **revert d'une réservation annulée** (`Prévu`→`Annulé` : `Entre deux`→`En attente`, `Hébergement prévu`→`Hébergé`) ; l'EventRule `hebergement-historique` n'écrit que l'historique.

**Limite** : un changement de statut hors `HebergementDetailPage` (ex. dans Grist) ne déclenche aucun chemin (sauf rattrapage cron via les dates, et la cascade réservation serveur sur passage à `Prévu`).

`horodatage.ts` expose `ligneAutomation(note)` → `[Auto] <note> — <horodatage Paris>` dans la colonne `Modification`.

## Suivi des heures et KM bénévoles

Heures et KM calculés dynamiquement depuis quatre tables sources. La **PWA** recalcule pour l'affichage via `calculerHeuresDetail()` (`pwa/src/lib/heuresUtils.ts`) et **ne lit jamais** le cache `Benevoles.TempsPasseABS`/`Kilometrage` ; le **serveur** alimente ce cache via `calculerHeuresMois()` (`heuresCalcul.ts`, cron 03:00) puis archive dans `JournalHeures` (cron 00:05 jour J).

| Source | Heures | KM | Champ clé |
|--------|--------|----|-----------|
| `Suivi` | Forfait prorata des jours actifs (`ForfaitSuivi`) | — | `BenevoleReferent`, `BenevoleCoReferent` |
| `Taches` (Terminé) | `Duree` (principal + `BenevoleAdditionnels`) | `KmTache` si Transport | `Benevole`, `BenevoleAdditionnels` |
| `Demenagements` (Terminé) | Forfait fixe (`ForfaitDemenagement`) | `KmBenevole` + `KmAides` | `Benevole`, `AideBenevole` |
| `SaisiesHeures` | `Heures` manuel | `Kilometrage` manuel | `Benevole` |

**Format KM** : calculé au passage à Terminé par les EventRules (Nominatim/OSRM, **serveur uniquement**) et stocké **en km bruts** ; `MultiplicateurKM` appliqué **seulement** au calcul agrégé, jamais au stockage. Déménagements : `KmBenevole` (number) + `KmAides` (text `"id:km,id:km"`). Tâches Transport : `KmTache` (text `"id:km"`, par bénévole). Parsé par `parseKmAides()` (PWA + serveur). 

**Geocodage** (`server/src/automations/lib/routageKm.ts`) : Nominatim (max 1 req/s per ToS) + OSRM. Pas de UI Nominatim côté PWA. Sans adresse domicile/géocodage échoué : jambe domicile→départ = **0 km**, départ→arrivée quand même calculé. EventRule bloque jusqu'à calcul terminé (toast "Trajet calculé — X km" après refetchQueries).

### Paramètres Réglages

| Colonne | Rôle | Défaut |
|---------|------|--------|
| `ForfaitSuivi` | Heures/mois par suivi actif (référent) | 0 (désactivé) |
| `ForfaitDemenagement` | Heures par déménagement Terminé | 0 (désactivé) |
| `MultiplicateurKM` | Facteur sur km bruts (calcul agrégé) | 1 |
| `SeuilUrgence` | Jours avant `DateBesoin` → Urgence | 0 (désactivé) |
| `JourArchivage` | Jour du mois (1-28) d'archivage du mois précédent | 5 |
| `ConservationMois` | Rétention RGPD | — |
| `Rappel{FinHebergement,Tache,Demenagement}Jours` | Jours avant l'événement → rappel (`rappels-j1`) | 1 |
| `DateResetAdhesion` | Date du prochain reset annuel de `AdhesionABS` | — (inactive) |

Éditables depuis **Paramètres** (Admin) via `PATCH /api/reglages`. `getReglage` traite `0` comme « absent » (→ défaut) : les délais de rappel ne se désactivent **pas** via `0`.

### Cycle mensuel des crons

- **00:05 `archivage-heures-mensuel`** : si `today.day != JourArchivage` ou si `JournalHeures` a déjà ce mois (idempotence) → exit ; sinon calcule le mois **précédent** → écrit `JournalHeures` (1 ligne/bénévole) → remet `TempsPasseABS=0`, `Kilometrage=0`.
- **03:00 `calcul-heures-mois-courant`** : calcule le mois **courant** → écrit le cache Grist natif.

Le reset à 0 n'efface aucune donnée : les sources restent intactes, le cron 03:00 recalcule.

### Statistiques association (`StatsMensuelles`)

Archive mensuelle **niveau association** (une ligne/mois), miroir de `JournalHeures` sans dimension bénévole. Calcul `automations/lib/statsCalcul.ts` (`calculerStatsMois` + `bilanToFields()`).

- **FLOW** (`Flow*`) — événements du mois dérivés des dates (suivis ouverts/clôturés/succès, nuitées + `FlowPersonneNuitees`, placements, déménagements, tâches). **Rétro-calculables** → `backfill-stats`.
- **SNAPSHOT** (`Snap*`) — état à la capture (hébergés, en recherche, suivis actifs, hébergeurs dispo/occupés, bénévoles, démographie). **Non rétro-calculables** ; démarrent au 1ᵉʳ archivage.

La colonne **`Backfill` (bool)** est autoritaire : sur une ligne backfill les `Snap*` valent 0 et **ne doivent jamais être lues** (la PWA filtre les courbes snapshot sur `!backfill`). Pas dans `ALLOWED_TABLES` (écrite par les automations, lue via `/api/stats/history`). Schéma additif puis `npm run trigger -- backfill-stats`.

### Feedback KM dans la PWA

Tâche Transport / Déménagement passé à Terminé : le PATCH **bloque** jusqu'à la fin du calcul Nominatim/OSRM (`dispatchEvent` `await`é avant `reply.send`). Bouton « Calcul KM… » pendant l'attente, puis toast `sonner` (« Trajet calculé — X km ») après `refetchQueries`.

## Messagerie (notifications + broadcasts)

**Décision d'architecture : la messagerie ne passe pas par Grist.** Notifications éphémères, à fort fan-out, adressées par id de bénévole — mauvais usage pour Grist. Store **SQLite local** (`better-sqlite3`), purement Node. Grist reste réservé au modèle métier.

```
EventRule (dispatchEvent, in-process) → createNotification()
   → SQLite server/data/abs.db   (notifications, broadcasts, dismissals, prefs)
   ← /api/notifications (autorisation par JWT : payload.id / pole / organisation)
PWA ── poll 30 s (useNotifications) ──> feed /messages + badge non-lus AppLayout
```

- **Store** (`db/index.ts`, `initDb()` au démarrage + `trigger.ts`) : `notifications` (`dedup_key` unique → `INSERT OR IGNORE` idempotent), `broadcasts`, `broadcast_dismissals`, `notification_prefs` (opt-out par catégorie, **utilisé**), `push_subscriptions` (Web Push, **dormant**). Fichier via `SQLITE_PATH` (défaut `server/data/abs.db`, gitignored).
- **Service** (`notifications/service.ts`) : `createNotification`, `getFeed` (notifs perso + broadcasts ciblés non expirés/rejetés), `markRead`, broadcasts CRUD + `dismissBroadcast`, prefs `getPrefs`/`setPref`/`isCategoryEnabled`.
- **Sécurité** : autorisation par JWT vérifié (jamais `X-Forwarded-User`/clé Grist) ; broadcasts admin gardés `payload.pole === "Admin"`. **Transport** : polling ~30 s (`useNotifications`, React Query) ; pas de SSE/WebSocket (Web Push différé au VPS, voir guide).
- **Producteurs** : EventRules `notifications.ts` + cron `rappels-j1` ; le cron `demandeur-urgence` émet via `notifyUrgence()` (même `dedupKey`).
- **PWA** : `MessagesPage` en **deux onglets** — *Alertes* (`notification`) et *Messages* (`broadcast`+`message`) ; compteurs non-lus par onglet, badge global. Annonces composées dans **Paramètres** (`BroadcastComposer`).

### Préférences d'alerte (opt-out par bénévole)

Panneau **engrenage** de l'onglet *Alertes* (par-bénévole, **pas** dans Paramètres Admin). `notification_prefs(benevole_id, category, enabled)` ; absence de ligne = **activé**. Routes `GET`/`PUT /api/notification-prefs` (garde JWT self).

- **Taxonomie** (contrat stable) : `urgence`, `nouvelle-fiche`, `tache`, `demenagement`, `suivi`, `rappel`, `message`. `annonce` (broadcasts admin) reste **non désactivable**.
- **Deux points d'application** : notifications → `createNotification()` vérifie `isCategoryEnabled()` en tête (aussi futur Web Push) ; `message` → filtre dans `getVolMessagesForUser()` (si désactivé, le bénévole ne voit que ses propres messages).

## Pages Agenda / Statistiques / Paramètres

**Agenda** (`AgendaPage`) — planning **Gantt** à navigation infinie, « viewport glissant » : `viewStartSec` (bord gauche), largeur via `ResizeObserver`, `dayW` px/jour. Navigation par **drag-pan** (`window` mousemove/mouseup, `dragRef`) ; **zoom** molette (ancrée curseur) + pinch mobile (bornes `DAY_W_MIN`/`MAX`, listeners natifs `wheel`/`touch` non-passifs, `touch-pan-y`). Au-delà de `SHOW_DAYS_AT` px/jour l'axe passe des semaines aux jours. Données par **buckets** (`queryKey: ["agenda", bucketStart, spanBuckets]`, `placeholderData`), menu déroulant mois.

- **Groupes** : une ligne par type (Hébergements, Dispo, Déménagements, Tâches, Besoins), affichée dès que le type est actif ; événements concurrents en **lanes** (greedy `assignLanes`). Plages = barres, ponctuels = pastilles ; couleur par type + nuance par instance (`shadeColor`). Label responsive `LABEL_W_LG` (220px) / `LABEL_W_SM` (80px, mobile, `TYPE_LABEL_SHORT`), sticky left/top, repère « aujourd'hui », bulle de date. Barres : `onMouseDown stopPropagation` (pas de drag).
- **Règles métier** : dispo hébergeur — fin ≥ aujourd'hui, début recadré (`max(start, now)`) ; hébergement sans fin — barre prolongée 3 semaines. Labels `"[Demandeur] chez [Hébergeur]"` ; hébergeur non lisible → `"[hébergeur]"`. Filtres : type, « Mes tâches/déménagements », « Fonctionnement ABS » (3 états), « Réinitialiser ».

**Statistiques** (`StatistiquesPage`) — **trois onglets** :
- **Bilan** (`/api/stats` + `/aggregates`, sélecteur année + « Depuis le début ») : listes `StatList` (label → valeur **avec unité**) en cartes (État actuel, Bénéficiaires, Hébergements, Hébergeurs, Suivis avec **répartition neutre des motifs de clôture** — pas de « taux de réussite »), **camembert** localisation (lieu = hébergeur) et démographie. **Pas de tuiles**.
- **Tendances** (`/api/stats/trends` + `/history`, plage 3/6/12/Tout) : Nuitées (toggle personne-nuitées), Hébergements commencés/terminés, Suivis ouverts/clôturés, Suivis actifs (snapshot, `backfill === false` seulement), Activité bénévole (toggle Heures/KM/Bénévoles — compteur **limité à l'organisation ABS**).
- **Mon activité** (`/api/activite/:id/history` + mois courant via `calculerHeuresDetail`).
- Graphes **100 % CSS** (pas de lib) : `MiniBars`/`StackedBars`/`GroupedBars`/`DistributionBar`/`PieChart` ; tons `--chart-1..5`. `StatTile` (`compact`) seulement dans « Mon activité ».

**Paramètres** (`ParametresPage`) — **gardée `user.pole === "Admin"`** (`<Navigate>` sinon). Sections : Réglages, rôles bénévoles (édition inline `PoleABS`/`Organisation`/`Statut`), annonces (`BroadcastComposer`), Anonymisation RGPD, demandes d'accès (revue des soumissions publiques).

## Anonymisation RGPD (données inactives)

Conservation par **anonymisation** (pas de hard delete) : efface les PII d'une ligne inactive en **gardant la ligne** (liens `RefList`, statut) pour l'intégrité référentielle et les stats. `StatsMensuelles` archivant déjà la démographie agrégée, on efface **aussi** les quasi-identifiants → ligne réellement anonyme.

- **Marqueurs schéma** : `Anonymise` (bool) + `DateAnonymisation` sur les 5 tables de contact (`Demandeurs`, `Hebergeurs`, `Benevoles`, `Ressources`, `AideProfessionnelle`). Schéma additif.
- **Manifeste** (`rgpd/manifest.ts`) : par table — colonne de statut + statuts actifs exclus, PII à vider, `buildScrubFields()` (PII → null, tombstone `Nom="Anonymisé"`/`Prenom="#<id>"`, marqueurs). Garde statut + Ref/RefList structurels ; `Modification` remplacé par une ligne d'audit `ligneAutomation(...)`.
- **Détecteur** (`rgpd/detector.ts`, `findCandidates()`) : **3 portes cumulatives** — (1) statut non-actif, (2) `DernierContact` ancien, (3) dernière modif (dernière ligne du journal) ancienne — toutes antérieures à `Reglages.ConservationMois`. **Fail-closed** si date nulle/non parsable ; ignore les lignes déjà `Anonymise`.
- **Pas d'automation autonome** : revue **validée par un admin** (Paramètres, `RgpdSection`). Actions : *Anonymiser* (cascade `Enfant` serveur), *Tâche de recontact* (`/taches/new?recontact=<Table>:<id>`), *Repousser*. Routes Admin-only (`routes/rgpd.ts`).
- **Hard filter d'affichage** : `isAnonymise`/`excludeAnonymises` (`pwa/src/lib/refUtils.ts`) — 5 pages liste, builders d'options `RefSelect`/`RefListSelect`, Agenda, stats. **Exception** : un `RefLink` historique affiche toujours le tombstone — on ne filtre **pas** `GET /api/table`.
- **CLI** (`rgpd/cli.ts`, `npm run rgpd`) : `candidates`, `seed-demo`, `anonymize <Table> <id>`. Scrub partagé avec la route via `rgpd/service.ts` (`anonymizeOne`).

## Patterns PWA

### Permissions

`pwa/src/lib/permissions.ts` — **miroir des ACL de `schema.yaml`** (mettre à jour manuellement si `access_rules` change). `canRead(user, resource)` (garde pages + boutons de création) ; `canWrite` (= `canRead` par défaut ; surchargé pour `benevoles`/`ressources`/`aidepro` → Admin + Recherche hébergements) ; `canReadColumn(user, table, column)` (masquage colonnes sensibles, ex. `CommentairePrive`). Clés `resource` : `demandeurs`, `hebergeurs`, `benevoles`, `ressources`, `aidepro`, `hebergements`, `suivis`, `taches`, `demenagements` (Grist `Taches` remplace l'ancienne `Actions`).

### Navigation / création

`AppLayout.tsx` : `NAV_SECTIONS` (→ `NAV_ITEMS`) et `CREATE_ITEMS` (item `sep: true` = séparateur ; sans `resource` → pas de bouton `+`). Visibilité via `canSeeNav(user, item)` : `adminOnly` → `pole === "Admin"` ; sinon `canRead(user, resource)` si défini ; sinon visible. Messages affiche un badge `unreadCount`.

### Formats Grist

| Type Grist | Stockage | Conversion |
|------------|----------|------------|
| Date | Unix seconds (UTC midnight) | `format(new Date(ts*1000), …)` ; écriture `new Date(s+"T00:00:00Z").getTime()/1000` |
| ChoiceList | `["L", "val1", …]` | Slice dès l'index 1 ; `null` pour vider |
| Ref | entier (ID ligne), `0` = vide | Écrire l'entier directement |
| Display_* | formula créée par `link` | Lecture seule — nom résolu sans appel API |

- **Saisie de dates** : `DateInput` (texte `dd/MM/yyyy` + Popover/Calendar fr) ; état interne `yyyy-MM-dd`, conversion via `toGristFields()`. Toujours ce pattern.
- **Saisie datetime** (Tâches, Déménagements) : `DateTimeInput` (wrap `datetime-local`). Helpers `gristDateTime(v)` / `inputDateTime(s)`.
- **Notes Markdown** : `RichText` (`RichTextView` via `markdown-to-jsx`, `disableParsingRawHTML: true` ; `RichTextEditor` = `Textarea` + mini-barre). Stocké en **texte brut Markdown** (rétro-compatible). Champs notes longs des Demandeurs/Hébergeurs/Suivi.

> Modifier les **choix d'une colonne `choice`** : éditer `schema.yaml` **et** pousser le `widgetOptions` à la colonne existante (`update` n'actualise pas les choix existants — `ModifyColumn` direct), puis `POST /api/column-choices/refresh`.

### Liens dans les fiches

Mode vue : **tél** `tel:`, **email** `mailto:`. **Adresse textuelle** (Hébergeurs, Tâches, Déménagements) : `AdresseLink` local — mobile `geo:0,0?q=<adr>`, desktop `openstreetmap.org/search?query=<adr>`. Pas de colonne GPS.

**vCard export** : `AddToPhoneButton` (page détail Demandeur, Hébergeur, Ressources, AidePro) génère `.vcf` téléchargeable pour importer le contact en téléphone. Action uniquement en mode vue.

### Refs entre tables

- **Vue** (`components/RefLink.tsx`) : `<RefLink id to>{display}</RefLink>`, `<RefListLinks ids names basePath />`.
- **Édition** (`components/RefSelect.tsx`) : `<RefSelect value options onChange />`, `<RefListSelect values options onChange />`. Options : `EntityOption[]` (`{ id, label }`) construites depuis les records bruts (noms = `Prenom + Nom`, pas les Display_*).

**Bug à éviter — double toggle Checkbox** : le conteneur parent fait `onClick={e => e.stopPropagation()}` **uniquement**. Ne pas appeler `toggleSelected` dans le parent si `onCheckedChange` le fait déjà (double invocation = état inchangé).

### LieuSelect — saisie d'adresse assistée

`LieuSelect` (`pwa/src/components/LieuSelect.tsx`) : Combobox des points de référence Limoges (table `Lieux`), placé à côté de l'`Input` `AdresseDepart`/`AdresseArrivee` (Tâches, Déménagements) — `onSelect={v => set("AdresseDepart", v)}`. Requiert `useQuery(["table", "Lieux"])`.

### Sélection persistée cross-page

`usePersistedSelection` (`pwa/src/lib/usePersistedSelection.ts`) — sessionStorage + événement `abs:selectionchange`. Exports : `usePersistedSelection(key)` (→ `[Set<number>, setSelected]`), `savePersistedIds`/`readPersistedIds`, `clearAllPersistedSelections()` (→ **à appeler dans chaque `XxxNewPage.handleSave` après `createRecord`**). Clés : `demandeurs`, `hebergeurs`, `benevoles`, `ressources`, `aidepros`.

### Sélection multi-demandeurs et pré-remplissage

`DemandeursPage` permet de cocher plusieurs demandeurs ; une barre d'actions propose `+ Hébergement`/`+ Suivi`/`+ Tâche`/`+ Déménagement` → `/xxx/new?demandeurs=1,2,3`. Chaque `XxxNewPage` lit `searchParams.get("demandeurs")` (split/Number/filter > 0) et initialise `form.DemandeurIds` dans le `useState` initializer.

### Recherche hébergeur depuis SuiviDetailPage

Bouton « Recherche hébergeur » → `/hebergeurs?demandeurs=X,Y&suivi=Z`. `HebergeursPage` lit `demandeurs`/`suivi`, `savePersistedIds` (active la barre AppLayout), puis bandeau SmartFilter avec « + Hébergement » → `/hebergements/new?suivi=Z&demandeurs=X,Y&hebergeur=H`.

### SmartFilter hébergeurs — enfants exclus des préférences

`computeSmartFilter` distingue `adults` (sans `Parent`) et `children`. Seuls les **adultes** contribuent aux préférences (`rejectChiens/Chats`, `maxLocRank`, `maxAccesRank`) ; genres/statuts/urgence sur tous (un hébergeur excluant "Enfants" est écarté si le groupe en contient).

### Warnings de validation — badge collapsible

`computeWarnings(form)` (via `useMemo`) retourne `string[]` (problèmes non bloquants), affiché via badge `⚠ N` amber dans `DetailHeader` (prop `warnings`, clic → `Popover`). N'empêche pas la sauvegarde. `DetailHeader` (`components/DetailHeader.tsx`) : barre flottante (mobile `top-16`, desktop `top-4`) Annuler/Enregistrer + badge ; offset desktop `md:right-[max(1.5rem,calc(50vw-35rem))]` (`max-w-4xl`) ou `calc(50vw-28rem)` (`max-w-2xl`).

### FonctionnementABS sur Tâches

Colonne `bool FonctionnementABS` — tâches internes ABS sans demandeur/suivi. Activé → masque Demandeur/Suivi, supprime le warning « Suivi non renseigné », badge bleu `ABS`, filtre 3 états dans `TachesPage` (`null` toutes → `false` hors ABS → `true` ABS).

### Fiche enfant (Demandeur dépendant)

`isDependent = Parent.length > 0 || StatutFamilial === "Enfant"`. Quand vrai, masquer (vue + édition) : section Contact, champs Couple et Enfant(s) (garder Parent), préférences hébergement, DateBesoin et Situation. En vue, DateBesoin affiche celle du/des parent(s) avec lien(s) (`Parent` = `RefList`, 2 parents possibles). À la création, lier un parent auto-sélectionne `StatutFamilial = "Enfant"`.

### Bouton « Contacté aujourd'hui »

Pages Demandeur, Hébergeur, Ressources, AideProfessionnelle disposent d'un bouton **« Contacté aujourd'hui »** placé à côté du champ *Dernier contact*. Un clic remplit en une action `DernierContact = today` + `BenevoleDernierContact = user.id`. Utile pour marquer un contact rapide sans éditer la fiche complète.

### Structure des pages

- **Liste** (réf. `DemandeursPage.tsx`) : filtres multi-sélection (`Popover`+`Checkbox`), tri par colonne, responsive (table `md+` / cards mobile), guards `canRead`.
- **Détail + création** (réf. `HebergementDetailPage.tsx`) : `XxxDetailPage` et `XxxNewPage` partagent le même fichier (constantes, helpers, `Section`/`Field`/`ChoiceSelect`). Le fichier exporte **exactement deux** composants React (`react-refresh/only-export-components`).

## Formulaires publics (candidatures + dispo hébergeur)

Trois pages **non authentifiées** (hors `AppLayout`, sœurs de `/login` dans `pwa/src/main.tsx`) alimentent une file revue par un admin :

| Route (page) | Endpoint | `kind` | Approbation admin |
|------|----------|--------|-------------------|
| `/rejoindre` (`PublicBenevoleForm`) | `POST /api/public/benevole` | `benevole` | crée un `Benevole` (`Statut="Potentiel"`, `PasswordHash` vide) |
| `/heberger` (`PublicHebergeurForm`) | `POST /api/public/hebergeur` | `hebergeur_candidature` | crée un `Hebergeur` (`Disponibilite="Potentiel"`, desc→`DetailLogement`, recontact→`CommentairePrive`) |
| `/disponibilite` (`PublicHebergeurDispoForm`) | `POST /api/public/hebergeur-dispo` | `hebergeur_dispo` | **auto-appliqué** si parse fiable, sinon revue |

- **File** : table SQLite `public_submissions` (`db/submissions.ts`), **hors Grist** tant que non approuvée. Revue admin `routes/submissions.ts` (garde Admin) → `SubmissionsSection` dans **Paramètres → Données → « Demandes d'accès »**.
- **Routes publiques** (`routes/public.ts`) enregistrées **avant** les plugins auth ; ne lisent jamais le cookie. Écriture Grist via clé admin après validation Zod.
- **Dispo self-service** : appariement tel/email + parse FR `automations/lib/dispoParse.ts`. Auto-applique **seulement si** `confident` (1 seul hébergeur + dates concrètes) **et** pas `NePasContacter` ; journalise `[Auto] … (self-service)` + notifie les admins. Sinon → file.
- **« Tâche d'appel »** (`HebergeurDetailPage`, vue) → `/taches/new?hebergeur=<id>&type=…&nom=…&description=…` (`TacheNewPage` lit `nom`/`type`/`description` + `hebergeur`/`recontact`).
- **Anti-amplification** : cache 60 s des lectures admin (`cachedAdminTable`), purge RGPD (`purge-submissions`), honeypot `display:none`, XSS OK (React échappe, aucun `dangerouslySetInnerHTML`).

**Modèle de menace + check-list go-live + durcissements VPS** (rate-limit/`trustProxy`, lien magique dispo, activation/mot de passe oublié par email) : `docs/notes/formulaires-publics-securite-deploiement.md` et `docs/guides/deploiement-vps.md`.

> ⚠️ **Changement d'email via « Mon profil »** (`routes/profil.ts`) : l'email est la **clé d'identité** (login + `X-Forwarded-User` → ACL Grist). Le `PATCH /api/profil` écrit immédiatement et **déconnecte** le bénévole. Au VPS : vérifier le nouvel email avant application + re-`schema_tool.py invite` (sinon l'accès Grist casse). D'ici là, fonctionnel mais brut (re-login requis).

## Invariants de sécurité critiques

**Ne jamais envoyer `Authorization` sur un chemin représentant l'action d'un bénévole.** Grist donne la priorité absolue à `Authorization` sur `X-Forwarded-User` : un bearer présent (même invalide) écrase l'identité injectée et bypasse toutes les Access Rules.

- Chemin bénévole (PWA → Node → Grist) : **uniquement** `X-Forwarded-User: <email>`
- Chemin admin (login lookup, scripts) : **uniquement** `Authorization: Bearer <clé API>`
- Caddy **doit** stripper `Authorization` entrant avant d'injecter `X-Forwarded-User`
- Endpoints publics (`/api/public/*`) : aucune auth (rate-limit `trustProxy`/`X-Forwarded-For` au VPS — voir guide)

`APP_HOME_URL` (Grist) doit correspondre exactement à l'URL du navigateur (scheme + host + port), sinon le client JS Grist génère des redirections mortes.

## Tests et vérification

### vitest (`server/`)

`cd server && npm test` (`vitest run`). Tests **unitaires de logique pure**, sans Grist ni serveur, déterministes (`vi.setSystemTime`). Contexte Grist mocké par `src/test/makeFakeCtx.ts`. Couverture : `heuresCalcul.ts`, `statsCalcul.ts` (FLOW+SNAPSHOT, `Backfill` ⇒ `Snap*` omises), `rgpd/detector.ts` (3 portes), `dispoParse.ts`. Les `*.test.ts` et `src/test/` sont **exclus du build** (`tsconfig.json`).

### Serveur MCP Playwright (dev uniquement)

`.mcp.json` déclare le serveur `playwright` (headless chromium, `--isolated`, `--allowed-origins` = `localhost:5173;localhost:3000`, artifacts → `.playwright-artifacts/`) → outils `mcp__playwright__*`. Setup une fois : `npx playwright install chromium` + `npx @playwright/mcp@latest install-browser chrome-for-testing` ; libs WSL : `apt-get install -y libnss3 libnspr4 libasound2t64` ; redémarrer Claude Code + approuver. **Garde-fous** : **uniquement** le dev (le navigateur agit comme un bénévole connecté et **mute** Grist) ; compte seed ; jamais de données réelles.

### Protocole de vérification des formulaires publics

À rejouer après toute modif de `routes/public.ts` ou des 3 pages : **XSS** (payloads stockés bruts mais rendus inertes) ; **honeypot** `hp` rempli → `200` mais droppé ; **`NePasContacter`** bloque l'auto-apply → revue ; **ACL** `/api/submissions`/`/reglages`/`/rgpd/candidates` → **401** sans cookie ; **validation** : bouton toujours cliquable, champ requis manquant → message inline (`text-destructive bg-destructive/10`), pas de bulle native.

### Avant déploiement réel

Outillage dev-only (`.mcp.json`/Playwright — n'affecte pas le build prod), mot de passe seed partagé (`test1234`), données seed fictives (repartir d'un doc Grist vierge) et tous les durcissements VPS : voir `docs/guides/deploiement-vps.md` (§7) et `docs/notes/formulaires-publics-securite-deploiement.md`.

## Conventions

Détail complet dans `docs/conventions.md`. Points clés :

- **Langue** : UI et docs en français ; identifiants techniques (tables, colonnes, variables, commits) en français sans accents ni espaces.
- **Commits** : Conventional Commits — `feat(pwa):`, `fix(api):`, `docs:`, `chore(infra):`. Scopes : `pwa`, `api`, `grist`, `infra`, `auth`.
- **Modèle de données** : `schema/schema.yaml` = source unique de vérité ; toute modification passe par ce fichier puis le pipeline `schema_tool.py`.
- **Tables** : pluriel PascalCase sans accent (`Demandeurs`) ; **colonnes** : singulier PascalCase sans accent (`DateNaissance`).
- **Données de dev** : uniquement fictives (personnages de fiction, adresses réelles de Limoges). Aucune donnée réelle d'ABS sur une machine de dev ni dans le dépôt.
- **`@/`** = alias Vite/TS pour `pwa/src/`.
