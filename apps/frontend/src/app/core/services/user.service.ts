import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared';
import { BehaviorSubject, map, Observable } from 'rxjs';

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
    return this.http
      .get<User>(`${this.baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        },
      })
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          return user;
        })
      );
  }

  createAppointment(appointmentData: any): Observable<any> {
    return this.http.post(this.appointmentUrl, appointmentData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  }
}
