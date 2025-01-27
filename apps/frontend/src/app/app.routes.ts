import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
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
    path: 'dashboard-admin',
    loadComponent: () =>
    import('./dashboard/components/admin-panel/admin-panel.component').then(
      (c) => c.AdminPanelComponent
    ),
  },
  {
    path: 'dashboard-doctor',
    loadComponent: () =>
    import('./dashboard/components/doctor-panel/doctor-panel.component').then(
      (c) => c.DoctorPanelComponent
    ),
  },
  {
    path: 'dashboard-user',
    loadComponent: () =>
    import('./dashboard/components/user-panel/user-panel.component').then(
        (c) => c.UserPanelComponent
      ),
  },
  {
    path: 'asignar-doctor',
    loadComponent: () =>
      import('./dashboard/components/admin-panel/asignar-doctor/asignar-doctor.component').then(
        (c) => c.AsignarDoctorComponent
      ),
  },
  {
    path: 'registrar-doctor',
    loadComponent: () =>
      import('./dashboard/components/admin-panel/registrar-doctor/registrar-doctor.component').then(
        (c) => c.RegistrarDoctorComponent
      ),
  },
];
