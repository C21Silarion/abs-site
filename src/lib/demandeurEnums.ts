/**
 * Listes de nationalités et de langues pour le formulaire public d'orientation
 * (`/orienter`), page NON authentifiée qui ne peut pas interroger les choices
 * Grist de l'outil interne.
 *
 * ⚠️ MIROIR de `schema/enums/nationalites.yaml` et `schema/enums/langues.yaml`
 * de l'outil interne ABS (source de vérité). Si ces fichiers changent,
 * régénérer ces tableaux.
 */

export const NATIONALITES: readonly string[] = [
  "Afghane", "Albanaise", "Algérienne", "Allemande", "Américaine", "Andorrane",
  "Angolaise", "Antiguaise", "Argentine", "Arménienne", "Australienne",
  "Autrichienne", "Azerbaïdjanaise", "Bahaméenne", "Bahreïnie", "Bangladaise",
  "Barbadienne", "Bélarusse", "Belge", "Bélizienne", "Béninoise", "Bhoutanaise",
  "Bolivienne", "Bosnienne", "Botswanaise", "Brésilienne", "Britannique",
  "Brunéienne", "Bulgare", "Burkinabée", "Burundaise", "Cambodgienne",
  "Camerounaise", "Canadienne", "Cap-Verdienne", "Centrafricaine", "Chilienne",
  "Chinoise", "Chypriote", "Colombienne", "Comorienne", "Congolaise (Brazzaville)",
  "Congolaise (Kinshasa)", "Coréenne du Nord", "Coréenne du Sud", "Costaricaine",
  "Croate", "Cubaine", "Danoise", "Djiboutienne", "Dominicaine", "Dominiquaise",
  "Égyptienne", "Émiratie", "Équatoriale-guinéenne", "Équatorienne", "Érythréenne",
  "Espagnole", "Estonienne", "Éthiopienne", "Fidjienne", "Finlandaise", "Française",
  "Gabonaise", "Gambienne", "Géorgienne", "Ghanéenne", "Grecque", "Grenadienne",
  "Guatémaltèque", "Guinéenne", "Guinéenne-Bissau", "Guyanaise", "Haïtienne",
  "Hondurienne", "Hongroise", "Indienne", "Indonésienne", "Irakienne", "Iranienne",
  "Irlandaise", "Islandaise", "Israélienne", "Italienne", "Ivoirienne", "Jamaïcaine",
  "Japonaise", "Jordanienne", "Kazakhstanaise", "Kenyane", "Kirghize", "Kiribatienne",
  "Koweïtienne", "Laotienne", "Lesothane", "Lettonienne", "Libanaise", "Libérienne",
  "Libyenne", "Liechtensteinoise", "Lituanienne", "Luxembourgeoise", "Macédonienne",
  "Malgache", "Malaisienne", "Malawienne", "Maldivienne", "Malienne", "Maltaise",
  "Marocaine", "Marshallaise", "Mauritanienne", "Mauricienne", "Mexicaine",
  "Micronésienne", "Moldave", "Monégasque", "Mongolienne", "Monténégrine",
  "Mozambicaine", "Namibienne", "Nauruane", "Népalaise", "Nicaraguayenne",
  "Nigériane", "Nigérienne", "Norvégienne", "Néo-Zélandaise", "Omanaise", "Ougandaise",
  "Ouzbèke", "Pakistanaise", "Palauane", "Palestinienne", "Panaméenne", "Papouasienne",
  "Paraguayenne", "Péruvienne", "Philippine", "Polonaise", "Portugaise", "Qatarienne",
  "Roumaine", "Russe", "Rwandaise", "Saint-Kitts-et-Nevis", "Saint-Lucienne",
  "Saint-Marinaise", "Saint-Vincentaise", "Salomonnaise", "Salvadorienne", "Samoanne",
  "Saoudienne", "Sénégalaise", "Serbe", "Seychelloise", "Sierra-Léonaise",
  "Singapourienne", "Slovaque", "Slovène", "Somalienne", "Soudanaise", "Sri-Lankaise",
  "Sud-Africaine", "Sud-Soudanaise", "Suédoise", "Suisse", "Surinamaise", "Syrienne",
  "Tadjike", "Tanzanienne", "Tchadienne", "Tchèque", "Thaïlandaise", "Timoraise",
  "Togolaise", "Tonguienne", "Trinidadienne", "Tunisienne", "Turque", "Turkmène",
  "Tuvaluane", "Ukrainienne", "Uruguayenne", "Vanuataise", "Vénézuélienne",
  "Vietnamienne", "Yéménite", "Zambienne", "Zimbabwéenne", "Apatride", "Autre",
];

export const LANGUES: readonly string[] = [
  "Albanais", "Amharique", "Anglais", "Arabe", "Arménien", "Bengali", "Bulgare",
  "Chinois (mandarin)", "Créole haïtien", "Dari", "Espagnol", "Farsi", "Finnois",
  "Français", "Géorgien", "Grec", "Haoussa", "Hindi", "Hongrois", "Indonésien",
  "Italien", "Japonais", "Kirghiz", "Kurde", "Langue des signes", "Lingala",
  "Népalais", "Ourdou", "Pachto", "Polonais", "Portugais", "Roumain", "Russe",
  "Serbe", "Somali", "Soninké", "Swahili", "Tamoul", "Tigrigna", "Turc",
  "Ukrainien", "Wolof",
];
