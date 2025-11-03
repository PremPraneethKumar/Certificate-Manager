import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Imports your routes
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // For Angular Material
import { provideHttpClient, withFetch } from '@angular/common/http'; // For API calls

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    
    // --- ADD THESE ---
    provideAnimations(), // Enables Angular Material animations
    provideHttpClient(withFetch())  // Enables HttpClient for our service
  ]
};