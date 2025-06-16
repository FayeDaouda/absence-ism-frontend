import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- importer FormsModule ici
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(FormsModule),       // <-- ajouter FormsModule ici
    provideRouter(routes),
  ],
};
