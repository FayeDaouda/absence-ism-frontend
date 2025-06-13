export interface Utilisateur {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse?: string;   // Optionnel à cacher côté frontend normalement
    role: string;
    photo?: string;
    matricule: string;
    classeId?: string;
    etat?: string;  // Par exemple 'À JOUR' / 'PAS À JOUR'
  }
  