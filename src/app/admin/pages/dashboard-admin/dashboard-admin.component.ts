import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  utilisateur: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.utilisateur = this.authService.currentUser();
    // ou si currentUser est un signal, fais : this.utilisateur = this.authService.currentUser();
  }
}
