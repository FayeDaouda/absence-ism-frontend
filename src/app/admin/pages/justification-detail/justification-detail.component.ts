import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-justification-detail',
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
    this.http.get(`https://gestion-absence-ism-dev.onrender.com/api/justification-web/${this.justificationId}`)
      .subscribe({
        next: (data: any) => {
          this.justification = {
            ...data,
            dateSoumissionParsed: data.dateSoumission ? new Date(data.dateSoumission) : null,
          };
        },
        error: err => console.error('Erreur de chargement justification :', err)
      });
  }

  validerJustification() {
    this.http.put(`https://gestion-absence-ism-dev.onrender.com/api/justification-web/${this.justificationId}/valider`, null)
      .subscribe({
        next: () => {
          alert('Justification validée.');
          this.router.navigate(['/dashboard']);
        },
        error: err => alert('Erreur validation : ' + err.message)
      });
  }

  refuserJustification() {
    this.http.put(`https://gestion-absence-ism-dev.onrender.com/api/justification-web/${this.justificationId}/refuser`, null)
      .subscribe({
        next: () => {
          alert('Justification refusée.');
          this.router.navigate(['/dashboard']);
        },
        error: err => alert('Erreur refus : ' + err.message)
      });
  }
}
