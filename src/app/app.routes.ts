import { Routes } from '@angular/router';
import { LoginComponent } from './admin/pages/login/login.component';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin.component';
import { ListeEtudiantsComponent } from './admin/pages/liste-etudiants/liste-etudiants.component';
import { JustificationDetailComponent } from './admin/pages/justification-detail/justification-detail.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout/admin-layout.component';

export const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent, // 👈 contient sidebar + router-outlet
    children: [
      { path: 'dashboard-admin', component: DashboardAdminComponent },
      { path: 'liste-etudiants', component: ListeEtudiantsComponent },
      { path: 'justifications/:id', component: JustificationDetailComponent },
      // autres routes admin ici
    ]
  },

  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/login' },
];
