import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { firebaseApp } from '../core/config/firebase';
import { CreateUserDto } from '@org/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = getAuth(firebaseApp);
  private currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  async signup(data: CreateUserDto) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );
      const userToken = await userCredential.user.getIdToken(true);

      this.http
        .post<CreateUserDto>(`${this.baseUrl}/user`, data, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .subscribe({
          next: () => {
            sessionStorage.setItem('userToken', userToken);
            this.router.navigate(['/dashboard']);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) this.router.navigate(['/login']);
          },
        });
    } catch (error) {
      console.error('Error durante el registro:', error);
    }
  }
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const userToken = await userCredential.user.getIdToken(true);

    sessionStorage.setItem('userToken', userToken);
    this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
