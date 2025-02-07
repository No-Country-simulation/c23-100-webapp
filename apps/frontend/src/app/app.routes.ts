import { Routes } from '@angular/router';
import { noauthGuard } from './guards/no-auth.guard'; 
import { authGuard } from './guards/auth.guard';
import { adminauthGuard } from './guards/auth-admin.guard';
export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((c) => c.LoginComponent),
     canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
      canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
   // canActivate: [noauthGuard],
  },
  {
    path: 'asignar-doctor',
    loadComponent: () =>
      import('./dashboard/components/admin-panel/asignar-doctor/asignar-doctor.component').then((c) => c.AsignarDoctorComponent),
    canActivate: [adminauthGuard],
  },
  {
    path: 'registrar-doctor',
    loadComponent: () =>
      import('./dashboard/components/admin-panel/registrar-doctor/registrar-doctor.component').then((c) => c.RegistrarDoctorComponent),
    
  },
  {
    path: '404',
    loadComponent: () =>
    import('./error/error.component').then((c) => c.ErrorComponent),
  },
  
  {
    path: '401',
    loadComponent: () =>
    import('./error/sinpermiso/sinpermiso.component').then((c) => c.SinpermisoComponent),
  },
  {
    path: '**',
    redirectTo: '404'  // Redirige a la página de error para rutas no encontradas
  }
];

