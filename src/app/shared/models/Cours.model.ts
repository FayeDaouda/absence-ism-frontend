export interface Cours {
    id: string;
    nom: string;
    description: string;
    classeId: string;
    professeur: string;
    dateHeureDebut: Date;
    dateHeureFin: Date;
  }