import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  utilisateur: any = null;

  ngOnInit(): void {
    const utilisateurString = localStorage.getItem('utilisateur');
    if (utilisateurString) {
      this.utilisateur = JSON.parse(utilisateurString);
    }
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
