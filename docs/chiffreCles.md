The internal app exposes a public stats snapshot via GET /api/public/stats (served read-only, precomputed daily, no Grist access from the site). The shape (PublicStats in abs-site/src/lib/publicApi.ts):

- asOf — date du snapshot
- anneesExistence — nombre d'années d'existence de l'association
- benevoles — nombre de bénévoles
- hebergeursInscrits — nombre d'hébergeurs inscrits
- years — liste des années disponibles pour le détail par année
- total / parAnnee[année] — un objet ScopeStats par périmètre (global ou par année), avec :
  - personnesAccueillies (total/enfants/adultes)
  - nuitees
  - personneNuitees (total/enfants/adultes)
  - famillesHebergeuses
  - heuresBenevolat
  - kmParcourus
  - tauxReussiteSuivis