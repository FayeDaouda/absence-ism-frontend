import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Absence {
  id: string;
  etudiantId: string;
  date: string; // date MongoDB ISO string
  statut: string; // ex: "RETARD", "ABSENCE"
  justificationId?: string | null;
}

interface Utilisateur {
  id: string;
  nom: string;
  prenom: string;
  classeId: string;
}

@Component({
  selector: 'app-liste-absences',
  standalone: true,  // ajoute cette ligne si tu veux le rendre standalone
  imports: [CommonModule],  // <-- il faut importer CommonModule ici
  templateUrl: './liste-absences.component.html',
  styleUrls: ['./liste-absences.component.css']
})
export class ListeAbsencesComponent implements OnInit {
  absencesAll: any[] = [];
  absencesDuJour: any[] = [];
  totalAbsences = 0;
  totalRetards = 0;

  utilisateurMap: Map<string, Utilisateur> = new Map();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUtilisateurs();  // charger utilisateurs d'abord
  }

  loadUtilisateurs(): void {
    this.http.get<Utilisateur[]>('https://absence-ism-backend.onrender.com/api/utilisateurs')
      .subscribe({
        next: users => {
          users.forEach(u => this.utilisateurMap.set(u.id, u));
          this.loadAbsences();
        },
        error: err => console.error('Erreur chargement utilisateurs :', err)
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

          this.absencesDuJour = this.absencesAll.filter(abs => this.isToday(abs.dateParsed));
          this.totalAbsences = this.absencesAll.length;
          this.totalRetards = this.absencesAll.filter(abs => abs.statut === 'RETARD').length;
        },
        error: err => console.error('Erreur lors du chargement des absences :', err)
      });
  }

  parseMongoDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  isToday(date: Date): boolean {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear();
  }
}
