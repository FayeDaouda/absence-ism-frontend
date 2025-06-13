import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../../app/models/utilisateur.model';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'https://absence-ism-backend.onrender.com/api/utilisateurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  getById(id: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  getByRole(role: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/role/${role}`);
  }

  getEtudiants(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/etudiants`);
  }

  getByMatricule(matricule: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/matricule/${matricule}`);
  }

  getByClasse(classeId: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiUrl}/classe/${classeId}`);
  }

  create(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, utilisateur);
  }

  update(id: string, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${id}`, utilisateur);
  }

  updateEtat(id: string, etat: 'A_JOUR' | 'PAS_A_JOUR'): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/etat`, { etat });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
