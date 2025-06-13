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

  loadAbsences() {
    this.http.get<any[]>('https://absence-ism-backend.onrender.com/api/absences').subscribe({
      next: (data) => {
        this.absencesAll = data;
        this.absencesDuJour = data.filter(absence => this.isToday(new Date(absence.dateAbsence)));
      },
      error: err => console.error(err)
    });
  }

  loadJustifications() {
    this.http.get<any[]>('https://absence-ism-backend.onrender.com/api/justifications').subscribe({
      next: (data) => {
        this.justificationsAll = data;
        this.justificationsDuJour = data.filter(justif => this.isToday(new Date(justif.dateJustification)));
      },
      error: err => console.error(err)
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

}
