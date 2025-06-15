export interface Justification {
    id?: string;  // ou _id ? à vérifier selon réponse API
    dateSoumission?: { $date: { $numberLong: string } };  // format MongoDB date
    motif?: string;
    fichiers?: string[];  // ou autre type selon backend (liste d'urls/fichiers)
    statut?: string;
    absenceId?: string;
    etudiantId?: string;
  
    // propriété locale pour usage Angular, optionnelle
    dateSoumissionParsed?: Date;
  }
  