import { RouterModule, Router } from '@angular/router';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { User } from '../../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment.service';
import { PaginationMetadata } from '../../../shared/interfaces/pagination-metadata';
import { Appointment } from '../../../shared/interfaces/appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { MedicalRecordsService } from '../../../core/services/medical-records.service';
import { MedicalRecord } from '../../../shared/interfaces/medical-record';

@Component({
  selector: 'app-doctor-panel',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent implements OnInit {
  private readonly appointmentService = inject(AppointmentService);
    private readonly medicalRecordsService = inject(MedicalRecordsService);
    private readonly router = inject(Router);
    protected appointments = signal<Appointment[]>([]);
    protected patientNames = new Map<string, string>();
  
    protected selectedAppointment?: Appointment;
    protected medicalRecords = signal<MedicalRecord[]>([]);
  
    public user = input.required<User>();
  
    showInstructions(appointment: Appointment) {
      this.selectedAppointment = appointment;
      this.medicalRecordsService.getAll(appointment._id).subscribe((records) => {
        this.medicalRecords.set(records);
      });
    }
  
    ngOnInit(): void {
      this.appointmentService.getByDoctor().subscribe({
        next: (appointments) => {
          this.appointments.set(appointments);
          appointments.forEach((appointment) => {
            this.appointmentService.getPatientName(appointment.patientId).subscribe({
              next: (data) => {
                this.patientNames.set(appointment.patientId, data.name);
              },
              error: () => {
                this.patientNames.set(appointment.patientId, 'Desconocido');
              },
            });
          });
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        },
      });
    }

    getPatientName(patientId: string): string {
      return this.patientNames.get(patientId) || 'Cargando...';
    }
  
    cancelAppointment(appointment: Appointment) {
      this.appointmentService
        .cancel(appointment._id)
        .subscribe((updatedAppointment) => {
          this.appointments.update((appointments) => {
            const index = appointments.findIndex(
              (appointment) => appointment._id === updatedAppointment._id
            );
            appointments[index] = updatedAppointment;
  
            return appointments;
          });
        });
    }
}
