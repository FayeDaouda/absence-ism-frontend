import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';  // on verra ce fichier juste après

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),  // pour les appels HTTP
    provideRouter(routes),                  // ta config de routes
  ],
};
