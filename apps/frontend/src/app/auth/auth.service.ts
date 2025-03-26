import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared';
import { UserService } from '../core/services/user.service';
import { tap } from 'rxjs/operators'; // Importar tap

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';
  //private readonly baseUrl = 'https://c23-100-webapp-production.up.railway.app/api/auth';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService); // Inyectar UserService


  signup(data: User) {
    return this.http.post<{ userToken: string }>(
      `${this.baseUrl}/signup`,
      data
    ).pipe(
      tap(response => {
        // Almacenar el token en localStorage
        localStorage.setItem('userToken', response.userToken);
        // Obtener el perfil del usuario después de registrarse
        this.userService.getProfile().subscribe({
          next: (user) => {
            // Aquí puedes manejar el usuario registrado, si es necesario
            // Por ejemplo, redirigir al dashboard
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.error('Error al obtener el perfil después del registro:', err);
            // Manejar el error si es necesario
          }
        });
      })
    );
  }

  registrodoctor(data: User) {
    return this.http.post<{ message: string }>(`${this.baseUrl}/signup`, data);
  }

  login(email: string, password: string) {
    return this.http.post<{ userToken: string }>(`${this.baseUrl}/login`, {
      email,
      password,
    }).pipe(
      tap(response => {
        localStorage.setItem('userToken', response.userToken); // Usar localStorage
      })
    );
  }

  logout() {
    localStorage.removeItem('userToken');
    return new Promise<void>((resolve) => { // Devuelve una promesa
      this.router.navigate(['/']).then(() => {
        location.reload(); // Recarga la página
        resolve(); // Resuelve la promesa
      });
    });
  }

  sessionexpiradalogin() {
    localStorage.removeItem('userToken');
    return new Promise<void>((resolve) => { // Devuelve una promesa
      this.router.navigate(['/login']).then(() => {
        location.reload(); // Recarga la página
        resolve(); // Resuelve la promesa
      });
    });
  }

  sessionexpiradaregister() {
    localStorage.removeItem('userToken');
    return new Promise<void>((resolve) => { // Devuelve una promesa
      this.router.navigate(['/register']).then(() => {
        location.reload(); // Recarga la página
        resolve(); // Resuelve la promesa
      });
    });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userToken') !== null; // Verificar en localStorage
  }
  async isAdmin(): Promise<boolean> {
    const user = await this.userService.getProfile().toPromise();
    return user?.role === 'Admin'; // Verificar si el rol es admin
  }

}
