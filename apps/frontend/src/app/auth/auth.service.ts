import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

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
}
