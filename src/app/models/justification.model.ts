export interface Justification {
    id: string;                         // Correspond à l'ID Mongo (_id)
    dateSoumission?: string;              // Format ISO 8601 string (ex: "2025-06-12T00:00:00.000+00:00")
    motif?: string;                       // Le texte du motif
    fichiers?: string[];                  // URLs des fichiers justificatifs
    statut?: 'En attente' | 'Validée' | 'Refusée'; // Statut typé si tu veux
    absenceId?: string;                   // Référence à l'absence concernée
    etudiantId?: string;                  // Référence à l'étudiant
  
    // Propriété dérivée utile pour affichage dans Angular
    dateSoumissionParsed?: Date;
  }
  