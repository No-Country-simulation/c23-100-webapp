import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MedicalRecord } from '../../shared/interfaces/medical-record';

@Injectable({
  providedIn: 'root',
})
export class MedicalRecordsService {
  private readonly baseUrl = 'http://localhost:3000/medical-records';

 // private readonly baseUrl = 'https://c23-100-webapp-production.up.railway.app/medical-records';
  private readonly http = inject(HttpClient);

  create() {}

  getAll(appointmentId: string) {
    return this.http.get<MedicalRecord[]>(
      `${this.baseUrl}?appointmentId=${appointmentId}`,
      {
        headers: {
          Authorization: localStorage.getItem('userToken'),
        },
      }
    );
  }
}
