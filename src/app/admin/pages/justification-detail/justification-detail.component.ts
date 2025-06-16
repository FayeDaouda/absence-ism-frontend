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
  justification: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.justificationId = this.route.snapshot.paramMap.get('id')!;
    this.loadJustification();
  }

  loadJustification() {
    this.http.get<any>(`https://gestion-absence-ism-dev.onrender.com/api/justification-web/${this.justificationId}`)
      .subscribe({
        next: data => {
          this.justification = {
            ...data,
            dateSoumissionParsed: data.dateSoumission ? new Date(data.dateSoumission) : null,
          };
  
          if (this.justification.etudiantId) {
            this.http.get<any>(`https://gestion-absence-ism-dev.onrender.com/api/etudiant-web/${this.justification.etudiantId}`)
              .subscribe({
                next: etu => {
                  this.justification.nomCompletEtudiant = `${etu.nom} ${etu.prenom}`;
                  this.justification.matriculeEtudiant = etu.matricule;
                  this.justification.classeEtudiant = etu.classeId;
                },
                error: err => console.error('Erreur chargement étudiant:', err)
              });
          }
        },
        error: err => console.error('Erreur de chargement justification :', err)
      });
  }
  

  validerJustification() {
    this.http.put(`https://gestion-absence-ism-dev.onrender.com/api/justification-web/${this.justificationId}/valider`, null)
      .subscribe({
        next: () => {
          alert('Justification validée.');
          this.router.navigate(['/admin/dashboard-admin']);

        },
        error: err => alert('Erreur validation : ' + err.message)
      });
  }

  refuserJustification() {
    this.http.put(`https://gestion-absence-ism-dev.onrender.com/api/justification-web/${this.justificationId}/refuser`, null)
      .subscribe({
        next: () => {
          alert('Justification refusée.');
          this.router.navigate(['/admin/dashboard-admin']);

        },
        error: err => alert('Erreur refus : ' + err.message)
      });
  }
}
