import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseApp } from '../core/config/firebase';
import { Router } from '@angular/router';
import { User as UserDto } from '../shared';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = getAuth(firebaseApp);

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
    return userToken;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
