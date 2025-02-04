import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Appointment } from '../../shared/interfaces/appointment';
import { PaginationMetadata } from '../../shared/interfaces/pagination-metadata';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/appointments';
  private readonly headers = {
    Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
  };

  create() {}

  getAll({ page = 1, limit = 6 }: { page?: number; limit?: number }) {
    return this.http.get<{
      meta: PaginationMetadata;
      data: Appointment[];
    }>(`${this.baseUrl}?page=${page}&limit=${limit}`, {
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
}
