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
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CreateUserDto } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly auth = getAuth(firebaseApp);
  private currentUser: User | null = null;

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async signup(data: CreateUserDto, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      password
    );
    const userToken = await userCredential.user.getIdToken(true);

    await firstValueFrom(
      this.http.post<CreateUserDto>(`${this.baseUrl}/user`, data, {
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
    this.router.navigate(['/dashboard']);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.userSubject.next(null); // Limpia el usuario
    this.router.navigate(['/']);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
