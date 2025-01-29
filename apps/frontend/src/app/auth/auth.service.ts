import { HttpClient } from '@angular/common/http';
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
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User as UserDto } from '../shared';

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

  async signup(data: UserDto, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      password
    );
    const userToken = await userCredential.user.getIdToken(true);

    await firstValueFrom(
      this.http.post<UserDto>(`${this.baseUrl}/user`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
    );

    return userToken;
  }
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const userToken = await userCredential.user.getIdToken(true);
    sessionStorage.setItem('userToken', userToken);
    this.router.navigate(['']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
