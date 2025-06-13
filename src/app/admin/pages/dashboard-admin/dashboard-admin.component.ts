import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html'
})
export class DashboardAdminComponent {
  utilisateur = this.authService.currentUser();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
