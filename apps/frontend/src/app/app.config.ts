import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideHttpClient(withFetch()),
  ],
};
