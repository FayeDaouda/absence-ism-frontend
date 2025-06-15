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
    localStorage.clear(); // ou removeItem('token') si tu stockes un token
    window.location.href = '/login'; // ou navigate via Router
  }
}
