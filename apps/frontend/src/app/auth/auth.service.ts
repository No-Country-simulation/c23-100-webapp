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
import { CreateUserDto } from '@org/shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly http = inject(HttpClient);
  private readonly auth = getAuth(firebaseApp);
  private currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  async signup(data: CreateUserDto): Promise<User> {
    try {
      // Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      // Obtener el token de Firebase
      const firebaseToken = await userCredential.user.getIdToken(true);

      this.http
        .post<CreateUserDto>(`${this.baseUrl}/user`, data, {
          headers: { Authorization: `Bearer ${firebaseToken}` },
        })
        .subscribe({
          next: (user) => console.log(user),
          error: (err) => console.log(err),
        });

      return userCredential.user;
    } catch (error) {
      console.error('Error durante el registro:', error);
      throw error;
    }
  }
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return userCredential.user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
