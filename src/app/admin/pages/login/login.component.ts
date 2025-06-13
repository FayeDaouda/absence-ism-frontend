import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true
})
export class LoginComponent {
  email: string = '';
  motDePasse: string = '';
  erreur: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.motDePasse).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard-admin']);
      },
      error: () => {
        this.erreur = 'Email ou mot de passe incorrect';
      }
    });
  }
}
