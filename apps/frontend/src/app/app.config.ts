import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyBEwHp2jBidsdjhFsRc_IDQgOm47g5Hx0A',
  authDomain: 'c23-100-webapp-a4a86.firebaseapp.com',
  projectId: 'c23-100-webapp-a4a86',
  storageBucket: 'c23-100-webapp-a4a86.firebasestorage.app',
  messagingSenderId: '195033874086',
  appId: '1:195033874086:web:7244cc41155fefef21be67',
  measurementId: 'G-XRPGE3V6B9',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
  ],
};
