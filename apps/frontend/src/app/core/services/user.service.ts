import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/user';
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
}
