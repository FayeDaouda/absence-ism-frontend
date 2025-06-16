import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { ClasseService, Classe } from '../../../services/classe.service';  // import ClasseService et Classe
import { Utilisateur } from '../../../models/utilisateur.model';
import { FormsModule } from '@angular/forms'; // <-- importer ici aussi


@Component({
  selector: 'app-liste-etudiants',
  standalone: true,              // attention : standalone must be true
  imports: [FormsModule],        // <-- ajouter FormsModule ici
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
    private classeService: ClasseService   // injection ClasseService
  ) {}

  ngOnInit(): void {
    this.chargerClasses();
    this.chargerEtudiants();
  }

  // Appel API pour récupérer les classes
  chargerClasses() {
    this.classeService.getAll().subscribe({
      next: (data) => this.classes = data,
      error: (err) => {
        console.error('Erreur récupération classes', err);
        // fallback ou message d'erreur utilisateur
      }
    });
  }

  chargerEtudiants() {
    this.utilisateurService.getEtudiants().subscribe(data => {
      this.etudiants = data;
    });
  }

  filtrerParClasse() {
    if (!this.classeSelectionnee) {
      this.chargerEtudiants();
    } else {
      this.utilisateurService.getByClasse(this.classeSelectionnee).subscribe(data => {
        this.etudiants = data;
      });
    }
  }

  filtrerParMatricule() {
    if (!this.matriculeRecherche || this.matriculeRecherche.length < 3) {
      this.filtrerParClasse();
      return;
    }

    this.utilisateurService.getByMatricule(this.matriculeRecherche).subscribe(
      data => {
        this.etudiants = data ? [data] : [];
      },
      () => {
        this.etudiants = [];
      }
    );
  }

  getNomClasse(classeId?: string): string {
    const classe = this.classes.find(c => c.id === classeId);
    return classe ? classe.nom : '-';
  }
  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

}
