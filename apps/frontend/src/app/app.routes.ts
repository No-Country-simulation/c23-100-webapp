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

  /***** Rutas para pruebas ****/
  {
    path: 'home-admin',
    loadComponent: () =>
    import('./home/admin/admin.component').then(
      (c) => c.AdminComponent
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
    path: 'home-doctor',
    loadComponent: () =>
    import('./home/doctor/doctor.component').then(
      (c) => c.DoctorComponent
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
    path: 'home-paciente',
    loadComponent: () =>
    import('./home/paciente/paciente.component').then(
      (c) => c.PacienteComponent
    ),
  },
  {
    path: 'dashboard-paciente',
    loadComponent: () =>
    import('./dashboard/components/paciente-panel/paciente-panel.component').then(
        (c) => c.PacientePanelComponent
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
