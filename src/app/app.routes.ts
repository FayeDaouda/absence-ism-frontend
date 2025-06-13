import { Routes } from '@angular/router';

// Importe tes composants de pages ici :
import { LoginComponent } from './admin/pages/login/login.component';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard-admin', component: DashboardAdminComponent },
  { path: '', redirectTo: 'admin/login', pathMatch: 'full' },  // page par défaut
  { path: '**', redirectTo: 'admin/login' },                   // page 404 -> login
];
