import { Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../../core/services/appointment.service';
import { Appointment } from '../../../../shared/interfaces/appointment';
import { PaginationMetadata } from '../../../../shared/interfaces/pagination-metadata';
import { AssignDoctorModal } from './assign-doctor-modal/assign-doctor-modal.component';
import { EditarDoctorModalComponent } from './editar-doctor-modal/editar-doctor-modal.component';
@Component({
  selector: 'app-asignar-doctor',
  imports: [AssignDoctorModal, EditarDoctorModalComponent],
  templateUrl: './asignar-doctor.component.html',
  styleUrl: './asignar-doctor.component.css',
})
export class AsignarDoctorComponent {
  private readonly appointmentService = inject(AppointmentService);
  private readonly router = inject(Router);

  appointments = signal<Appointment[]>([]);

  public paginationMetadata = signal<PaginationMetadata | null>(null);

  page = input(1, {
    transform: (val: string | number) => Number(val) || 1,
  });

  constructor() {
    effect(() => {
      const currentPage = this.page();

      this.appointmentService
        .getAll({
          page: currentPage,
        })
        .subscribe((res) => {
          this.appointments.set(res.data);
          this.paginationMetadata.set(res.meta);
        });
    });
  }

  loadPage(page: number) {
    if (page <= 0 || page > (this.paginationMetadata()?.totalPages || 1)) {
      return;
    }
    this.router.navigate(['/asignar-doctor'], {
      queryParamsHandling: 'merge',
      queryParams: { page },
    });
  }
  onDoctorAssignedEvent(updatedAppointment: Appointment) {
    this.appointments.update((appointments) => {
      const index = appointments.findIndex(
        (appointment) => appointment._id === updatedAppointment._id
      );
      appointments[index] = updatedAppointment;

      return appointments;
    });
  }

  onDoctorEditedEvent(updatedAppointment: Appointment) {
    this.appointments.update((appointments) => {
      const index = appointments.findIndex(
        (appointment) => appointment._id === updatedAppointment._id
      );
      if (index !== -1) {
        appointments[index] = updatedAppointment;
      }
      return appointments;
    });
  }
}
