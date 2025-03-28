import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Appointment } from '../../shared/interfaces/appointment';
import { PaginationMetadata } from '../../shared/interfaces/pagination-metadata';
import { DoctorSpecialization } from '../../shared';
import { AppointmentStatus } from '../../shared/enums/appointment-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);
 private readonly baseUrl = 'http://localhost:3000/api/appointments';
 // private readonly baseUrl = 'https://c23-100-webapp-production.up.railway.app/api/appointments';
  private readonly headers = {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  };

  create(data: {
    specialization: DoctorSpecialization;
    date: Date;
    reason: string;
  }) {
    return this.http.post<Appointment>(this.baseUrl, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });
  }

  getAll({ page = 1, limit = 5 }: { page?: number; limit?: number }) {
    return this.http.get<{
      meta: PaginationMetadata;
      data: Appointment[];
    }>(`${this.baseUrl}?page=${page}&limit=${limit}`, {
      headers: this.headers,
    });
  }

  getByUser() {
    return this.http.get<Appointment[]>(`${this.baseUrl}/user`, {
      headers: this.headers,
    });
  }

  getByDoctor() {
    return this.http.get<Appointment[]>(`${this.baseUrl}/doctor`, {
      headers: this.headers,
    });
  }

  assignDoctor(appointmentId: string, doctorId: string) {
    return this.http.patch<Appointment>(
      `${this.baseUrl}/${appointmentId}/assign-doctor`,
      {
        doctorId,
      },
      {
        headers: this.headers,
      }
    );
  }
  getPatientName(patientId: string) {
    return this.http.get<{ name: string }>(`http://localhost:3000/api/user/patient/${patientId}`, 

    //return this.http.get<{ name: string }>(`https://c23-100-webapp-production.up.railway.app/api/user/patient/${patientId}`, 

    {
      headers: this.headers,
    });
  }



  cancel(appointmentId: string) {
    return this.http.patch<Appointment>(
      `${this.baseUrl}/${appointmentId}`,
      {
        status: AppointmentStatus.CANCELLED,
      },
      {
        headers: this.headers,
      }
    );
  }

  updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
    return this.http.patch<Appointment>(
      `${this.baseUrl}/${appointmentId}`,
      { status },
      { 
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`, // 🔥 Agregar token aquí
        },
      }
    );
  }
  
}
