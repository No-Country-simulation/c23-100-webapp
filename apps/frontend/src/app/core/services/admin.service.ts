import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Appointment } from '../../shared/interfaces/appointment';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    private readonly http = inject(HttpClient);
    private readonly appointmentUrl = 'http://localhost:3000/api/appointments';

    getAppointments(): Observable<Appointment[]> {
        const token = localStorage.getItem('userToken');
        return this.http.get<{ meta: any, data: Appointment[] }>(this.appointmentUrl, { // Especifica el tipo de respuesta
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).pipe(
            map(response => response.data) // Extrae el array 'data'
        );
    }
}