import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared';
import { UserService } from '../core/services/user.service';  
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService); // Inyectar UserService


  signup(data: User) {
    return this.http.post<{ userToken: string }>(
      `${this.baseUrl}/signup`,
      data
    );
  }

  login(email: string, password: string) {
    return this.http.post<{ userToken: string }>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }

  async logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  
  isAuthenticated(): boolean {
    // Verifica si hay un token de usuario en el almacenamiento de sesión
    return sessionStorage.getItem('userToken') !== null;
  }


  async isAdmin(): Promise<boolean> {
    const user = await this.userService.getProfile().toPromise();
    return user?.role === 'Admin'; // Verificar si el rol es admin
  }

}
