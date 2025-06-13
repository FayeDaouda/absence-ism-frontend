import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './admin/pages/login/login.component';
import { DashboardAdminComponent } from './admin/pages/dashboard-admin/dashboard-admin.component';

import { AuthGuard } from './guards/auth.guard';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: 'admin/login', component: LoginComponent },
      { path: 'admin/dashboard', component: DashboardAdminComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'admin/login', pathMatch: 'full' },
      { path: '**', redirectTo: 'admin/login' }
    ])
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
