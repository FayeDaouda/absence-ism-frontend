import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { TestUtilisateursComponent } from './pages/test-utilisateurs/test-utilisateurs.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(), // si tu veux ajouter un interceptor plus tard : withInterceptors([interceptor])
    provideRouter([
      {
        path: '',
        component: AppComponent
      },
      {
        path: 'test-utilisateurs',
        component: TestUtilisateursComponent
      }
    ])
  ]
};

// Point d'entrée pour booter l'app si tu utilises standalone components :
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
