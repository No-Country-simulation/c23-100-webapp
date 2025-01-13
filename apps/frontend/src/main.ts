import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { LoginComponent } from './app/auth/login.component';
import { RegisterComponent } from './app/auth/register.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),LoginComponent,RegisterComponent 
  ],
}).catch((err) => console.error(err));
