import { Component, OnInit } from '@angular/core';
import { UtilisateurService, Utilisateur } from '../../shared/services/utilisateur.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-utilisateurs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Liste des utilisateurs</h2>
    <ul *ngIf="utilisateurs.length > 0; else noData">
      <li *ngFor="let u of utilisateurs">
        {{ u.nom }} {{ u.prenom }} - {{ u.role }} (Matricule: {{ u.matricule }})
      </li>
    </ul>
    <ng-template #noData>
      <p>Aucun utilisateur trouvé ou erreur de connexion.</p>
    </ng-template>
  `
})
export class TestUtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur API:', err)
    });
  }
}
