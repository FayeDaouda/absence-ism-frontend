import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  absencesAll: any[] = [];
  justificationsAll: any[] = [];
  absencesDuJour: any[] = [];
  justificationsDuJour: any[] = [];

  // Nouveaux champs pour stats
  totalAbsences = 0;
  totalRetards = 0;
  totalJustifications = 0;
  totalJustificationsDuJour = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAbsences();
    this.loadJustifications();
  }

  loadAbsences(): void {
    this.http.get<any[]>('https://gestion-absence-ism-dev.onrender.com/api/absence-web')
      .subscribe({
        next: (data) => {
          this.absencesAll = data;
          this.absencesDuJour = data.filter(abs => this.isToday(new Date(abs.date)));

          // Calcul stats
          this.totalAbsences = data.filter(abs => abs.statut === 'ABSENT').length;
          this.totalRetards = data.filter(abs => abs.statut === 'RETARD').length;
        },
        error: err => console.error('Erreur lors du chargement des absences :', err)
      });
  }

  loadJustifications(): void {
    this.http.get<any[]>('https://gestion-absence-ism-dev.onrender.com/api/justification-web')
      .subscribe({
        next: (data) => {
          this.justificationsAll = data;
          this.justificationsDuJour = data.filter(j => this.isToday(new Date(j.dateSoumission)));

          // Calcul stats
          this.totalJustifications = data.length;
          this.totalJustificationsDuJour = this.justificationsDuJour.length;
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
