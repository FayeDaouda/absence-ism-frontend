import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-justification-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './justification-detail.component.html',
})
export class JustificationDetailComponent implements OnInit {
  justificationId!: string;
  justification: any = null;

  private baseUrl = 'https://absence-ism-backend.onrender.com/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.justificationId = this.route.snapshot.paramMap.get('id')!;
    console.log('justificationId reçu:', this.justificationId);
    this.loadJustification();
  }

  loadJustification() {
    this.http.get<any>(`${this.baseUrl}/justifications/${this.justificationId}`)
      .subscribe({
        next: (data) => {
          console.log('Justification reçue:', data);
          this.justification = {
            ...data,
            dateSoumissionParsed: data.dateSoumission ? new Date(data.dateSoumission) : null,
          };

          if (this.justification.etudiantId) {
            this.loadEtudiantInfo(this.justification.etudiantId);
          }
        },
        error: (err) => {
          console.error('Erreur de chargement justification :', err);
          alert('Erreur lors du chargement de la justification');
        }
      });
  }

  loadEtudiantInfo(etudiantId: string) {
    this.http.get<any>(`${this.baseUrl}/etudiants/${etudiantId}`)
      .subscribe({
        next: (etu) => {
          this.justification.nomCompletEtudiant = `${etu.nom} ${etu.prenom}`;
          this.justification.matriculeEtudiant = etu.matricule;
          this.justification.classeEtudiant = etu.classeId;
        },
        error: (err) => {
          console.error('Erreur chargement étudiant:', err);
        }
      });
  }

  validerJustification() {
    this.http.put(`${this.baseUrl}/justifications/valider/${this.justificationId}`, null)
      .subscribe({
        next: () => {
          alert('Justification validée.');
          this.router.navigate(['/admin/dashboard-admin']);
        },
        error: (err) => {
          alert('Erreur validation : ' + err.message);
        }
      });
  }

  refuserJustification() {
    this.http.put(`${this.baseUrl}/justifications/refuser/${this.justificationId}`, null)
      .subscribe({
        next: () => {
          alert('Justification refusée.');
          this.router.navigate(['/admin/dashboard-admin']);
        },
        error: (err) => {
          alert('Erreur refus : ' + err.message);
        }
      });
  }
  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
