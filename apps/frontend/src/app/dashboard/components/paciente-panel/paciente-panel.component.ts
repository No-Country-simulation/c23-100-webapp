import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../shared';
import { AppointmentService } from '../../../core/services/appointment.service';
import { Appointment } from '../../../shared/interfaces/appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MedicalRecordsService } from '../../../core/services/medical-records.service';
import { MedicalRecord } from '../../../shared/interfaces/medical-record';

@Component({
  selector: 'app-paciente-panel',
  imports: [ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './paciente-panel.component.html',
  styleUrl: './paciente-panel.component.css',
})
export class PacientePanelComponent implements OnInit {
  private readonly appointmentService = inject(AppointmentService);
  private readonly medicalRecordsService = inject(MedicalRecordsService);
  private readonly router = inject(Router);
  protected appointments = signal<Appointment[]>([]);

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
    this.appointmentService.getByUser().subscribe({
      next: (appointments) => {
        this.appointments.set(appointments);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
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
