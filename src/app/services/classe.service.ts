import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Classe {
  id: string;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private apiUrl = 'https://absence-ism-backend.onrender.com/api/classes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl);
  }

  getById(id: string): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/${id}`);
  }

  // autres méthodes si besoin : create, update, delete...
}
