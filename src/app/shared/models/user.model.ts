import { Classe } from './Classe.model';
export interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string; // optionnel, jamais renvoyé par l’API
  role: 'ADMIN' | 'ETUDIANT' | 'VIGILE';
  matricule: string;
  classe?: Classe; // si c’est un étudiant
  etat?: 'A_JOUR' | 'PAS_A_JOUR'; // pour l’étudiant
}
