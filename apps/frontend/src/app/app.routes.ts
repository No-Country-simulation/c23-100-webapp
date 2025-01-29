import { Routes } from '@angular/router';

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
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'asignar-doctor',
    loadComponent: () =>
      import(
        './dashboard/components/admin-panel/asignar-doctor/asignar-doctor.component'
      ).then((c) => c.AsignarDoctorComponent),
  },
  {
    path: 'registrar-doctor',
    loadComponent: () =>
      import(
        './dashboard/components/admin-panel/registrar-doctor/registrar-doctor.component'
      ).then((c) => c.RegistrarDoctorComponent),
  },
];
