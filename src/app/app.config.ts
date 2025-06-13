import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

// Composants standalone
import { AppComponent } from './app.component';
import { TestUtilisateursComponent } from './admin/pages/test-utilisateurs/test-utilisateurs.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin.component'; // à créer bientôt

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },

      // Routes publiques
      { path: 'test-utilisateurs', component: TestUtilisateursComponent },
      { path: 'admin/login', component: LoginComponent },

      // Routes privées (protégées plus tard avec un AuthGuard)
      { path: 'admin/dashboard-admin', component: DashboardAdminComponent }
    ])
  ]
};

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
