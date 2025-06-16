import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- important
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,               // <-- standalone component
  imports: [FormsModule],         // <-- importer FormsModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  motDePasse = '';
 


  erreurMessage: string | null = null; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Soumission formulaire', this.email, this.motDePasse);
    this.authService.login(this.email, this.motDePasse).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.authService.setCurrentUser(res.utilisateur);
        this.router.navigate(['/admin/dashboard-admin']);
      },
      error: (err) => {
        this.erreurMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
  togglePassword() {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const toggleButton = document.querySelector('.password-toggle') as HTMLButtonElement;

  if (passwordInput && toggleButton) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleButton.textContent = '🙈';
    } else {
      passwordInput.type = 'password';
      toggleButton.textContent = '👁️';
    }
  }
}

onForgotPassword(event: Event) {
  event.preventDefault();
  alert('Fonctionnalité de récupération de mot de passe à implémenter');
}

  
}
