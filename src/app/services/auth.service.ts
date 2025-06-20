import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://absence-ism-backend.onrender.com/api/auth';
  private readonly tokenKey = 'auth_token';

  currentUser = signal<any | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(email: string, motDePasse: string) {
    return this.http.post<{ token: string; utilisateur: any }>(`${this.apiUrl}/login`, { email, motDePasse });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_data');
    this.currentUser.set(null);
    this.router.navigate(['/admin/login']);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setCurrentUser(user: any) {
    this.currentUser.set(user);
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  private loadUserFromLocalStorage() {
    const data = localStorage.getItem('user_data');
  
    try {
      if (data) {
        this.currentUser.set(JSON.parse(data));
      } else {
        this.currentUser.set(null);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du user depuis le localStorage:', error);
      this.currentUser.set(null);
      localStorage.removeItem('user_data'); // Nettoyage si data corrompue
    }
  }
  
}
