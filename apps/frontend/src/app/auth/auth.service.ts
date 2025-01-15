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
// Este DTO es que se debe de usar para registrar por ahora se usa el SignUpFormValues para probar
//import { CreateUserDto } from '@org/shared';
import { User as UserDto } from '@org/shared';

interface SignUpFormValues {
  email: string;
  password: string;
}

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

  async signup(data: SignUpFormValues): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      data.email,
      data.password
    );
    const userToken = await userCredential.user.getIdToken();

    this.http
      .post<UserDto>(`${this.baseUrl}/user`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .subscribe({
        next: (user) => {
          console.log(user);
        },
        error: (err) => {
          console.log(err);
        },
      });

    return userCredential.user;
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
