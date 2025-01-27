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
    path: 'cita-paciente',
    loadComponent: () =>
      import('./home/paciente/cita-paciente.component').then(
        (c) => c.CitaPacienteComponent
      ),
  },
  {
    path: 'cita-doctor',
    loadComponent: () =>
      import('./home/doctor/cita-doctor.component').then(
        (c) => c.CitaDoctorComponent
      ),
  },
  {
    path: 'cita-admin',
    loadComponent: () =>
      import('./home/admin/cita-admin.component').then(
        (c) => c.CitaAdminComponent
      ),
  },
  {
    path: 'asignar-doctor',
    loadComponent: () =>
      import('./home/admin/asignar-doctor/asignar-doctor.component').then(
        (c) => c.AsignarDoctorComponent
      ),
  },
  {
    path: 'registrar-doctor',
    loadComponent: () =>
      import('./home/admin/registrar-doctor/registrar-doctor.component').then(
        (c) => c.RegistrarDoctorComponent
      ),
  },
];
