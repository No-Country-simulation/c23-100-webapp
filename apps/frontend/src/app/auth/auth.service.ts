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
import { CreateUserDto, Role, DoctorSpecialization } from '@org/shared';
import { User as UserDto } from '@org/shared';
import { lastValueFrom } from 'rxjs';

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: Role; // Rol del usuario
  specialization?: ''; // Especialización (solo si es un doctor)
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
    try {
      // Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        data.email,
        data.password
      );

      // Obtener el token de Firebase
      const firebaseToken = await userCredential.user.getIdToken(true);

      // Construir el DTO para el backend
      const backendData: CreateUserDto = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role || Role.PATIENT,
        
        specialization: data.specialization || DoctorSpecialization.GENERAL_PRACTITIONER,
      };

      console.log('Firebase Token:', firebaseToken);
      // Enviar datos al backend
      const createdUser = await lastValueFrom(
        this.http.post<CreateUserDto>(`${this.baseUrl}/user`, backendData, {
          headers: { Authorization: `Bearer ${firebaseToken}` },
        })
      );
      

      console.log('Usuario registrado exitosamente en el backend:', createdUser);

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
