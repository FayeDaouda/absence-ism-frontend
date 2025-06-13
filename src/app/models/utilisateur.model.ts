export interface Utilisateur {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse?: string;
    role: 'ADMIN' | 'ETUDIANT' | 'VIGILE';
    photo?: string;
    matricule?: string;
    classeId?: string;
    etat?: string;
  }
  