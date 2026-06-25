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
  accroche: "Accueil Bienveillant et Solidaire",
  sousTitre:
    "ABS met en relation des personnes exilées sans solution d'hébergement avec des citoyen·nes prêt·es à les accueillir, accompagné·es à chaque étape par des bénévoles référent·es.",
  ctaHeberger: "Je propose un hébergement",
  ctaReferent: "Je deviens bénévole / référent·e",
};

export const plaidoyer = {
  titre: "Pourquoi nous agissons",
  paragraphes: [
    "Chaque soir, en Haute-Vienne, des familles et des personnes exilées se retrouvent sans solution, exclues des dispositifs d'hébergement existants. Face à ce vide, des citoyen·nes ouvrent leur porte.",
    "ABS est une association entièrement bénévole. Nous ne remplaçons pas l'État : nous tissons un réseau de solidarité concret, digne et chaleureux, « avec les moyens du bord ». Héberger, c'est offrir bien plus qu'un lit : un endroit où vivre, de la compagnie, et un appui dans les démarches.",
  ],
};

/*
 * Chiffres clés. `valeur` est le placeholder affiché par défaut (et le repli si
 * l'API publique est injoignable) ; `key` pointe vers le champ correspondant du
 * payload `GET /api/public/stats` (chemin pointé), affiché à la place dès qu'il
 * est disponible. Voir `ChiffresCles.tsx`.
 */
export const chiffres: { valeur: string; label: string; key?: string }[] = [
  { valeur: "120+", label: "personnes accueillies", key: "total.personnesAccueillies.total" },
  { valeur: "45", label: "familles hébergeuses engagées", key: "total.famillesHebergeuses" },
  { valeur: "80", label: "bénévoles & adhérent·es", key: "benevoles" },
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
      titre: "La rencontre",
      texte:
        "On fait connaissance autour d'un café. Vous nous présentez ce que vous pouvez offrir (une chambre, un logement vide, quelques nuits…), on répond à toutes vos questions.",
    },
    {
      numero: "2",
      titre: "La convention & la période de test",
      texte:
        "Un cadre clair et écrit, sécurisé et réversible. Une période d'essai permet à chacun·e de confirmer que l'accueil convient avant de s'engager dans la durée.",
    },
    {
      numero: "3",
      titre: "L'hébergement accompagné",
      texte:
        "L'accueil démarre, avec un suivi régulier de votre référent·e. La fin de l'hébergement est toujours préparée et accompagnée, jamais brutale.",
    },
  ],
  assurance:
    "L'assurance liée à l'accueil est intégralement prise en charge par ABS. Vous n'avancez rien et n'assumez aucun risque financier.",
};

export const parcoursReferent = {
  titre: "Le rôle de référent·e",
  intro:
    "Le·la référent·e est le pivot discret mais essentiel d'ABS : la personne qui fait le lien, rassure les familles et assure le suivi au quotidien.",
  points: [
    "Garant·e du lien entre la personne accueillie, la famille hébergeuse et l'association.",
    "Présence rassurante : la famille accueillante n'est jamais seule face aux difficultés.",
    "Suivi régulier et coup de main dans les démarches administratives.",
  ],
};

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
    titre: "Le livret d'accueil",
    desc: "Fiches pratiques et contacts des structures partenaires de Haute-Vienne.",
    fichier: "livret-accueil-abs.pdf",
  },
  {
    titre: "Le kit de communication",
    desc: "Affiches et flyers officiels d'ABS à imprimer et diffuser localement.",
    fichier: "kit-communication-abs.pdf",
  },
  {
    titre: "La dernière newsletter",
    desc: "Nos actualités au format PDF, pour celles et ceux qui préfèrent aux réseaux.",
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
    hint: "Rejoignez l'équipe : présentez-vous en quelques lignes, on vous explique tout lors d'un premier échange.",
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
    note: "Pas de fioritures ici ! Notre site est minimaliste pour nous laisser le temps d'agir sur le terrain. Pour suivre nos actualités au jour le jour et voir la vie de l'asso, rejoignez-nous sur nos réseaux sociaux !",
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
export type Projet = { titre: string; desc: string; href: string; image?: string; cta: string };

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
    href: `${HELLOASSO_ORG}/collectes/soutenons-aminata-dans-sa-demarche-de-regularisation-1`,
    image: "/projets/aminnata-process.jpg",
    cta: "Soutenir",
  },
  {
    titre: "Appartement pour Kathuna et Lana",
    desc: "Cagnotte hébergement solidaire pour leur offrir un logement.",
    href: `${HELLOASSO_ORG}/formulaires/3`,
    image: "/projets/lana-process.jpg",
    cta: "Soutenir",
  },
];

export const galerie = [
  "Atelier convivial, été 2025",
  "Distribution solidaire au local",
  "Première rencontre hébergeur·euse",
  "Fête de fin d'année de l'asso",
];
