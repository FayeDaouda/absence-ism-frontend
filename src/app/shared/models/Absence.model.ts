import { LocalTime } from './LocalTime.model';

export interface Absence {
    id: string;
    date: Date;
    heureDebut: LocalTime;
    heureFin: LocalTime;
    statut: 'JUSTIFIEE' | 'NON_JUSTIFIEE';
    etudiantId: string;
    vigileId: string;
    coursId: string;
    justificationId?: string;
  }