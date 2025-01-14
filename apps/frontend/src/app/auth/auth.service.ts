import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient, private auth: Auth) {}
  async createUser(createUserDto: any) {
    const token = await this.auth.currentUser?.getIdToken();
  
    if (!token) {
      console.error('No se pudo obtener el token de Firebase.');
      throw new Error('No se pudo obtener el token de Firebase.');
    }
    console.log('Token generado:', token);
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.post(`${this.apiUrl}/user`, createUserDto, { headers }).toPromise();
  }
  
  

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }
}

