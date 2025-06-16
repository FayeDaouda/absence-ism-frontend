import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  photo?: string;
  matricule: string;
  classeId: string;
  etat: string;
}

interface Absence {
  _id: any;
  date: { $date: { $numberLong: string } };
  heureDebut: any;
  heureFin: any;
  statut: string;
  etudiantId: string;
  nomEtudiant?: string;
  prenomEtudiant?: string;
  classeEtudiant?: string;
  justificationId?: string | null;
  type?: string;
  justifiee?: boolean;
  dateParsed?: Date;
}

interface Justification {
  _id: any;
  etudiantId: string;
  statut: string;
  dateSoumission?: { $date: { $numberLong: string } };
  dateSoumissionParsed?: Date | null;

  // Champs enrichis
  nomCompletEtudiant?: string;
  classeEtudiant?: string;
  matriculeEtudiant?: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],  
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  utilisateursAll: Utilisateur[] = [];
  utilisateurMap = new Map<string, Utilisateur>();

  absencesAll: Absence[] = [];
  justificationsAll: Justification[] = [];

  absencesDuJour: Absence[] = [];
  justificationsDuJour: Justification[] = [];

  get totalPresences(): number {
    return this.absencesAll.filter(a => a.statut === 'PRESENT').length;
  }

  get totalAbsents(): number {
    return this.absencesAll.filter(a => a.statut === 'ABSENT').length;
  }

  totalAbsences = 0;
  totalRetards = 0;
  totalJustifications = 0;
  totalJustificationsDuJour = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  private parseMongoDate(dateObj: any): Date {
    try {
      if (dateObj?.$date?.$numberLong) {
        return new Date(parseInt(dateObj.$date.$numberLong, 10));
      }
      return new Date();
    } catch {
      return new Date();
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  loadUtilisateurs(): void {
    this.http.get<Utilisateur[]>('https://absence-ism-backend.onrender.com/api/utilisateurs')
      .subscribe({
        next: (data) => {
          this.utilisateursAll = data;
          this.utilisateurMap = new Map(data.map(u => [u.id, u]));
          this.loadAbsences();
          this.loadJustifications();
        },
        error: err => console.error('Erreur lors du chargement des utilisateurs :', err)
      });
  }

  loadAbsences(): void {
    this.http.get<Absence[]>('https://absence-ism-backend.onrender.com/api/absences')
      .subscribe({
        next: (data) => {
          this.absencesAll = data.map(abs => {
            const user = this.utilisateurMap.get(abs.etudiantId);
            return {
              ...abs,
              type: abs.statut,
              justifiee: !!abs.justificationId,
              dateParsed: this.parseMongoDate(abs.date),
              nomEtudiant: user?.nom,
              prenomEtudiant: user?.prenom,
              classeEtudiant: user?.classeId,
            };
          });

          this.absencesDuJour = this.absencesAll.filter(abs => this.isToday(abs.dateParsed!));
          this.totalAbsences = this.absencesAll.length;
          this.totalRetards = this.absencesAll.filter(abs => abs.statut === 'RETARD').length;
        },
        error: err => console.error('Erreur lors du chargement des absences :', err)
      });
  }

  loadJustifications(): void {
    this.http.get<Justification[]>('https://absence-ism-backend.onrender.com/api/justifications')
      .subscribe({
        next: (data) => {
          this.justificationsAll = data.map(j => {
            const user = this.utilisateurMap.get(j.etudiantId);
            return {
              ...j,
              dateSoumissionParsed: j.dateSoumission ? this.parseMongoDate(j.dateSoumission) : null,
              nomCompletEtudiant: user ? `${user.nom} ${user.prenom}` : '',
              classeEtudiant: user?.classeId || '',
              matriculeEtudiant: user?.matricule || '',
            };
          });

          this.justificationsDuJour = this.justificationsAll.filter(j =>
            j.dateSoumissionParsed ? this.isToday(j.dateSoumissionParsed) : false
          );

          this.totalJustifications = this.justificationsAll.length;
          this.totalJustificationsDuJour = this.justificationsDuJour.length;
        },
        error: err => console.error('Erreur lors du chargement des justifications :', err)
      });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
