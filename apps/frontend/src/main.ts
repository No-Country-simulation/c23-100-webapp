import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { LoginComponent } from './app/auth/login.component';
import { RegisterComponent } from './app/auth/register.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';



const firebaseConfig = {
  apiKey: "AIzaSyBEwHp2jBidsdjhFsRc_IDQgOm47g5Hx0A",
  authDomain: "c23-100-webapp-a4a86.firebaseapp.com",
  projectId: "c23-100-webapp-a4a86",
  storageBucket: "c23-100-webapp-a4a86.firebasestorage.app",
  messagingSenderId: "195033874086",
  appId: "1:195033874086:web:7244cc41155fefef21be67",
  measurementId: "G-XRPGE3V6B9"
};


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth(),), provideHttpClient(), 
  ],
}).catch((err) => console.error(err));
