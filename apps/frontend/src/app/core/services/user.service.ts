import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DoctorSpecialization, User } from '../../shared';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/user';
  private readonly appointmentUrl = 'http://localhost:3000/api/appointments';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  getProfile() {
    const token = localStorage.getItem('userToken'); // Obtener token de localStorage
    return this.http
      .get<User>(`${this.baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Usar token de localStorage
        },
      })
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          return user;
        })
      );
  }

  getDoctors(specialization: DoctorSpecialization) {
    return this.http.get<User[]>(`${this.baseUrl}/doctors/${specialization}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Usar token de localStorage
      },
    });
  }
}
