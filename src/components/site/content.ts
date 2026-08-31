/*
 * Contenu éditorial des maquettes ABS (texte de remplissage réaliste).
 * Ton inspiré des sites de référence : Singa, J'accueille, Avec-Toits, Utopia 56.
 * Les chiffres, liens et formulaires sont des PLACEHOLDERS (cf. CDC : maintenance zéro,
 * conversion externalisée vers HelloAsso, l'outil interne et les réseaux sociaux).
 * NB : ne jamais exposer le nom de l'outil interne côté site public (cf. CLAUDE.md).
 */

export const association = {
  nom: "ABS",
  nomComplet: "Accueil Bienveillant et Solidaire",
  baseline: "réseau d'hébergement solidaire en Haute-Vienne",
};

export const hero = {
  accroche: "Réseau d'hébergement solidaire en Haute-Vienne",
  sousTitre:
    "ABS (Accueil Bienveillant et Solidaire) met en relation des personnes exilées sans solution d'hébergement avec des citoyen·nes prêt·es à les accueillir, accompagné·es à chaque étape par des bénévoles référent·es.",
  ctaHeberger: "Je propose un hébergement",
  ctaReferent: "Je deviens bénévole / référent·e",
};

export const plaidoyer = {
  titre: "Pourquoi et comment nous agissons",
  paragraphes: [
    "Chaque soir, en Haute-Vienne, des familles et des personnes seules se retrouvent sans solution, exclues des dispositifs d'hébergement existants.", 
    "Face à ce vide, nous accompagnons des citoyen·ne.s qui ouvrent leur porte et nous recherchons de nouveaux foyers.",
    "ABS est une association entièrement bénévole. Nous ne remplaçons pas l'État.",
    "Nous cherchons à créer un réseau de solidarité concret. Héberger, même sur une courte période, c'est offrir la sécurité et la sérénité nécessaires pour différentes démarches.",
  ],
};

export const solidariteExiles = {
  titre: "Solidarité",
  sousTitreLigne1: "avec les personnes",
  sousTitreLigne2: "exilées!",
};

/*
 * Chiffres clés. `valeur` est le placeholder affiché par défaut (et le repli si
 * l'API publique est injoignable) ; `key` pointe vers le champ correspondant du
 * payload `GET /api/public/stats` (chemin pointé), affiché à la place dès qu'il
 * est disponible. Voir `ChiffresCles.tsx`.
 */
export const chiffres: { valeur: string; label: string; key?: string }[] = [
  { valeur: "26", label: "personnes actuellement hébergées", key: "personnesHebergees.total" },
  { valeur: "17", label: "hébergeur·euse·s mobilisé·e·s", key: "hebergeursOccupes" },
  { valeur: "1 200+", label: "nuitées* offertes cette année", key: "parAnnee.$year.nuitees" },
];

export type Etape = { numero: string; titre: string; texte: string };

export const parcoursHebergeur: {
  titre: string;
  intro: string;
  etapes: Etape[];
  assurance: string;
} = {
  titre: "Accueillir chez soi, comment ça marche ?",
  intro:
    "Un cadre simple, progressif et réversible. Vous n'êtes jamais seul·e : un·e référent·e vous accompagne du premier échange jusqu'à la fin de l'accueil.",
  etapes: [
    {
      numero: "1",
      titre: "La première rencontre",
      texte:
        "Nous faisons connaissance lors d’un premier rendez-vous où nous échangeons sur vos questionnements et nos expériences. Vous nous présentez ce que vous pouvez offrir (une chambre, un logement vide, quelques nuits…). Nous vous laissons le temps de la réflexion avant de reprendre contact.",
    },
    {
      numero: "2",
      titre: "La convention et la période de test",
      texte:
        "Un contrat clair signé de toustes, avec une date de fin prévue, une charte de cohabitation et une assurance responsabilité civile prise en charge par l’association. Une période d'essai permet à chacun·e de confirmer que l'accueil convient avant de s'engager dans la durée.",
    },
    {
      numero: "3",
      titre: "L'hébergement accompagné",
      texte:
        "L'accueil démarre, avec un suivi régulier de votre référent·e. La fin de l'hébergement est préparée et gérée par l’association.",
    },
  ],
  assurance:
    "Les besoins de la personne accueillie en termes alimentaires, vestimentaires, déplacements et autres ne sont pas à la charge de l’hébergeur.euse. Les frais supplémentaires (chauffage, eau, électricité) ne sont pas pris en charge par l’association sauf en cas de grande difficulté.",
};

export const parcoursReferent = {
  titre: "Les missions de nos référent·e·s et bénévoles",
  intro:
    "Quelques heures par semaine ou par mois suffisent : accompagner un accueil, faire connaître ABS ou dénicher de nouveaux hébergements. Plusieurs façons de vous engager à nos côtés, même une aide ponctuelle est utile !",
  points: [
    "Garant·e du lien entre la personne accueillie, la famille hébergeuse et l'association.",
    "Présence rassurante : la famille accueillante n'est jamais seule face aux difficultés.",
    "Suivi régulier et coup de main dans les démarches administratives.",
  ],
};

/*
 * Missions bénévoles officielles ABS publiées sur jeveuxaider.gouv.fr.
 * Descriptions condensées à partir des fiches de mission (liens `url`).
 */
export const missionsBenevolat = [
  {
    titre: "Je deviens référent·e",
    desc: "Le rôle de référent·e est essentiel : cette personne fait le lien entre les hébergé·e·s et les hébergeur·euse·s, et assure un suivi régulier. Vous participez aux premières rencontres, posez un cadre clair et rassurant, restez présent·e tout au long de l'accueil, puis accompagnez son bilan de fin.",
    url: "https://www.jeveuxaider.gouv.fr/missions-benevolat/66620/benevolat-abs-accueil-bienveillant-solidaire",
  },
  {
    titre: "Je mobilise de nouveaux hébergements",
    desc: "Repérez des logements ou locaux disponibles, sensibilisez les particuliers, entreprises et collectivités, et présentez la mission d'ABS pour élargir le réseau de foyers solidaires.",
    url: "https://www.jeveuxaider.gouv.fr/missions-benevolat/103824/benevolat-abs-accueil-bienveillant-solidaire-1",
  },
  {
    titre: "J'organise des événements",
    desc: "Participez à l'organisation de ciné-débats, conférences et événements solidaires pour sensibiliser le public et recruter de nouveaux·elles hébergeur·euse·s.",
    url: "https://www.jeveuxaider.gouv.fr/missions-benevolat/103827/benevolat-abs-accueil-bienveillant-solidaire-2",
  },
];

export const typesHebergement = [
  "Une chambre ou un logement vide",
  "Une maison en vente, en attendant l'acheteur",
  "Un local professionnel pour les nuits",
  "Un départ en vacances : votre logement le temps de votre absence",
  "Un logement municipal mis à disposition",
];

export const faqHebergeur = [
  {
    q: "Combien de temps dure un accueil ?",
    r: "Cela dépend des situations et de ce que vous souhaitez. La durée est définie ensemble, par écrit, et toujours révisable. Certains accueils durent quelques nuits, d'autres plusieurs mois.",
  },
  {
    q: "Et si ça ne se passe pas bien ?",
    r: "La période de test existe précisément pour ça. Votre référent·e intervient à tout moment, et l'accueil peut prendre fin de façon accompagnée, sans culpabilité.",
  },
  {
    q: "Suis-je couvert·e par une assurance ?",
    r: "Oui. ABS prend en charge l'intégralité de l'assurance liée à l'hébergement solidaire.",
  },
];

export const faqReferent = [
  {
    q: "Combien de temps cela demande-t-il ?",
    r: "Quelques heures par semaine, à votre rythme : un appel, une visite, un coup de main pour un dossier. Vous n'êtes jamais seul·e, l'équipe se relaie.",
  },
  {
    q: "Comment s'organise l'aide aux démarches ?",
    r: "En lien avec les autres bénévoles et les structures partenaires. Le livret d'accueil recense les contacts utiles ; vous orientez sans avoir à tout connaître.",
  },
  {
    q: "Quelle est la place de WhatsApp ?",
    r: "La coordination quotidienne se fait sur des groupes WhatsApp dédiés : rapide, simple, et sans outil à installer.",
  },
];

export const ressources = [
  {
    titre: "Le livret des Solidarités",
    desc: "Liste et contacts des structures solidaires à Limoges pour se nourrir, se soigner, se vêtir…",
    fichier: "livret-solidarites-abs.pdf",
  },
  {
    titre: "Le kit de communication",
    desc: "Le dépliant officiel d'ABS à imprimer et à diffuser autour de vous.",
    fichier: "kit-communication-abs.pdf",
  },
  {
    titre: "La dernière newsletter",
    desc: "Nos actualités au format PDF pour celles et ceux qui préfèrent ce format.",
    fichier: "newsletter-abs.pdf",
  },
];

/* Intitulés des formulaires publics (repliés par défaut sur les pages). */
export const formulaires = {
  hebergeur: {
    titre: "Je propose un hébergement",
    hint: "Laissez-nous vos coordonnées : un·e bénévole vous recontacte pour faire connaissance, sans engagement.",
  },
  benevole: {
    titre: "Je deviens bénévole / référent·e",
    hint: "Rejoignez l'équipe : présentez-vous en quelques lignes, nous vous contacterons pour un premier échange.",
  },
  dispo: {
    titre: "Déjà hébergeur·euse ? Signaler une disponibilité",
  },
};

const HELLOASSO_ORG = "https://www.helloasso.com/associations/accueil-bienveillant-et-solidaire-en-haute-vienne";

export const footer = {
  helloAsso: {
    adhesion: "https://www.helloasso.com/beta/associations/accueil-bienveillant-et-solidaire-en-haute-vienne/adhesions/adhesion2026",
    don: `${HELLOASSO_ORG}/formulaires/1`,
  },
  // Formulaire d'inscription newsletter hébergé par Brevo (POST direct, pas de clé).
  newsletterAction:
    "https://eeec61fc.sibforms.com/serve/MUIFAHr-pGrUCOA0nhIyhAT1m3I6YqMgc9RP2jDqZrSuWl_6tsKBJ4E6EYId0bJS_5tNclWn6RBQKOYPUqptfPbx7sGC_PznSwrFmpyp0iTi7uVHsj5cmjmFoW4ohlV2oBgaaO50FazFKXjEE8bAD7faVX_Euq25TVU1KRQjqc8aHzT7Nu4AjW7qjqq76md7KvxagI-JuZBVFukM",
  contact: {
    email: "abslimoges@proton.me",
    telephone: "07 43 34 09 98",
    adresse: "Maison des Droits de l'Homme — 119 avenue du Général Leclerc, 87100 Limoges",
  },
  reseaux: {
    instagram: "https://www.instagram.com/abs87.limoges",
    facebook: "https://www.facebook.com/abs.limoges",
    youtube: "https://www.youtube.com/@ABSLimoges",
    note: "Pour suivre nos actualités au jour le jour et voir la vie de l'association, rejoignez-nous sur nos réseaux sociaux !",
  },
};

/** Vidéo de présentation de l'association (YouTube @ABSLimoges). */
export const video = {
  id: "npCfaHGONzM",
  titre: "Accueil Bienveillant Solidaire 87 Limoges",
};

/*
 * Projets / collectes HelloAsso mis en avant.
 * Vignettes : déposer les images dans `public/projets/` (cf. `image`) ; à défaut
 * un placeholder bichromie s'affiche. Titres/descriptions à affiner (TODO).
 */
export type Projet = {
  titre: string;
  desc: string;
  href?: string;
  image?: string;
  cta: string;
  funded?: boolean;
};

export const projets: Projet[] = [
  {
    titre: "Entrée au collège pour Enriko",
    desc: "Aider Enriko à faire sa rentrée au collège dans de bonnes conditions.",
    href: `${HELLOASSO_ORG}/collectes/entree-au-college-pour-enriko`,
    image: "/projets/enriko-process.jpg",
    cta: "Soutenir",
  },
  {
    titre: "Régularisation d'Aminata",
    desc: "Soutenir Aminata dans ses démarches de régularisation.",
    image: "/projets/aminnata-process.jpg",
    cta: "Projet financé !",
    funded: true,
  },
  {
    titre: "Appartement pour Kathuna et Lana",
    desc: "Cagnotte hébergement solidaire pour leur offrir un logement.",
    href: `${HELLOASSO_ORG}/formulaires/3`,
    image: "/projets/lana-process.jpg",
    cta: "Soutenir",
  },
];

/* Titres/descriptions par page pour <Seo /> — cf. src/components/site/Seo.tsx. */
export const seo = {
  accueil: {
    title: "ABS — Accueil Bienveillant et Solidaire | Hébergement solidaire en Haute-Vienne",
    description:
      "ABS met en relation des personnes exilées sans hébergement stable avec des citoyen·nes hébergeurs bénévoles à Limoges, accompagnés par des bénévoles référent·es à chaque étape.",
  },
  orienter: {
    title: "Orienter une personne ou une famille — ABS Limoges",
    description:
      "Vous accompagnez une personne ou une famille qui va se retrouver sans hébergement ? Transmettez sa situation à l'association ABS.",
  },
  viePrivee: {
    title: "Protection des données personnelles — ABS Limoges",
    description:
      "Notice de protection des données personnelles de l'association ABS — Accueil Bienveillant et Solidaire (Limoges).",
  },
};

export const galerie = [
  "Atelier convivial, été 2025",
  "Distribution solidaire au local",
  "Première rencontre hébergeur·euse",
  "Fête de fin d'année de l'asso",
];
