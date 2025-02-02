import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service'; 
import { Router } from '@angular/router';

export const adminauthGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    router.navigate(['401']); // Redirigir si no está autenticado
    return false;
  }

  // Verificar si el usuario es admin
  if (await authService.isAdmin()) {
    return true; // Permitir acceso si es admin
  } else {
    router.navigate(['401']); // Redirigir si no es admin
    return false;
  }
};