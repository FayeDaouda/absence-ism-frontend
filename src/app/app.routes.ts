import { Routes } from '@angular/router';

import { LoginComponent } from './admin/pages/login/login.component';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin.component';
import { JustificationDetailComponent } from './admin/pages/justification-detail/justification-detail.component';
import { ListeEtudiantsComponent } from './admin/pages/liste-etudiants/liste-etudiants.component';  // <-- importer ta page

export const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard-admin', component: DashboardAdminComponent },
  { path: 'admin/justifications/:id', component: JustificationDetailComponent },

  // nouvelle route pour ta liste étudiants
  { path: 'admin/liste-etudiants', component: ListeEtudiantsComponent },

  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin/login' },
];
