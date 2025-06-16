import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ AJOUTÉ
import { UtilisateurService } from '../../../services/utilisateur.service';
import { ClasseService, Classe } from '../../../services/classe.service';
import { Utilisateur } from '../../../models/utilisateur.model';

@Component({
  selector: 'app-liste-etudiants',
  standalone: true,
  imports: [FormsModule, CommonModule],  // ✅ AJOUTÉ CommonModule
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.css']
})
export class ListeEtudiantsComponent implements OnInit {

  etudiants: Utilisateur[] = [];
  classes: Classe[] = [];
  classeSelectionnee: string = '';
  matriculeRecherche: string = '';

  constructor(
    private utilisateurService: UtilisateurService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    console.log('[Init] Chargement des classes et des étudiants');
    this.chargerClasses();
    this.chargerEtudiants();
  }

  chargerClasses() {
    this.classeService.getAll().subscribe({
      next: (data) => {
        this.classes = data;
        console.log('[Classes] Reçues depuis l’API:', this.classes);
      },
      error: (err) => {
        console.error('[Erreur Classes]', err);
      }
    });
  }

  chargerEtudiants() {
    console.log('[Étudiants] Chargement des étudiants...');
    this.utilisateurService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        console.log('[Étudiants] Reçus depuis l’API:', this.etudiants);
      },
      error: (err) => {
        console.error('[Erreur Étudiants]', err);
      }
    });
  }

  filtrerParClasse() {
    console.log('[Filtre Classe] Classe sélectionnée:', this.classeSelectionnee);

    if (!this.classeSelectionnee) {
      this.chargerEtudiants();
    } else {
      this.utilisateurService.getByClasse(this.classeSelectionnee).subscribe({
        next: (data) => {
          this.etudiants = data;
          console.log('[Filtre Classe] Étudiants filtrés par classe:', this.etudiants);
        },
        error: (err) => {
          console.error('[Erreur Filtre Classe]', err);
        }
      });
    }
  }

  filtrerParMatricule() {
    console.log('[Filtre Matricule] Matricule recherché:', this.matriculeRecherche);

    if (!this.matriculeRecherche || this.matriculeRecherche.length < 3) {
      this.filtrerParClasse();
      return;
    }

    this.utilisateurService.getByMatricule(this.matriculeRecherche).subscribe({
      next: (data) => {
        this.etudiants = data ? [data] : [];
        console.log('[Filtre Matricule] Résultat:', this.etudiants);
      },
      error: (err) => {
        console.error('[Erreur Filtre Matricule]', err);
        this.etudiants = [];
      }
    });
  }

  getNomClasse(classeId?: string): string {
    const classe = this.classes.find(c => c.id === classeId);
    const nomClasse = classe ? classe.nom : '-';
    console.log(`[getNomClasse] Pour ID: ${classeId} => ${nomClasse}`);
    return nomClasse;
  }

  logout(): void {
    console.log('[Déconnexion] Suppression du localStorage et redirection');
    localStorage.clear();
    window.location.href = '/login';
  }
  trackById(index: number, item: Utilisateur): string {
    return item.id;
  }
  
}
