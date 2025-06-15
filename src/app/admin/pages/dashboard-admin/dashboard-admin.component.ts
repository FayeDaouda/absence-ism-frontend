import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Absence {
  _id: any;
  date: { $date: { $numberLong: string } };
  heureDebut: any;
  heureFin: any;
  statut: string;        // correspond à "type" dans le template
  etudiantId: string;
  nomEtudiant?: string;
  prenomEtudiant?: string;
  classeEtudiant?: string;
  justificationId?: string | null;
}

interface Justification {
  _id: any;
  etudiantId: string;
  nomCompletEtudiant?: string;
  classeEtudiant?: string;
  statut: string;
  dateSoumission?: { $date: { $numberLong: string } };
  // autres champs selon backend
}

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  absencesAll: Absence[] = [];
  justificationsAll: Justification[] = [];

  absencesDuJour: Absence[] = [];
  justificationsDuJour: Justification[] = [];

  totalAbsences = 0;
  totalRetards = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAbsences();
    this.loadJustifications();
  }

  private parseMongoDate(dateObj: any): Date {
    try {
      return new Date(dateObj?.$date?.$numberLong);
    } catch {
      return new Date();
    }
  }

  loadAbsences(): void {
    this.http.get<Absence[]>('https://absence-ism-backend.onrender.com/api/absences')
      .subscribe({
        next: (data) => {
          this.absencesAll = data.map(abs => ({
            ...abs,
            type: abs.statut,
            justifiee: !!abs.justificationId,
            dateParsed: this.parseMongoDate(abs.date)
          }));

          this.absencesDuJour = this.absencesAll.filter(abs => this.isToday(abs.dateParsed));

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
          this.justificationsAll = data.map(j => ({
            ...j,
            dateSoumissionParsed: j.dateSoumission ? this.parseMongoDate(j.dateSoumission) : null
          }));

         
        },
        error: err => console.error('Erreur lors du chargement des justifications :', err)
      });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

}
