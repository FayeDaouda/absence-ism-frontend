export interface Justification {
    id: string;
    dateSoumission: Date;
    motif: string;
    fichiers: string[]; // URL ou chemins des fichiers
    statut: 'EN_ATTENTE' | 'VALIDEE' | 'REFUSEE';
    absenceId: string;
    etudiantId: string;
  }