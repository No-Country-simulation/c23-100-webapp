import {
  Component,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { AppointmentService } from 'apps/frontend/src/app/core/services/appointment.service';
import { UserService } from 'apps/frontend/src/app/core/services/user.service';
import { User } from 'apps/frontend/src/app/shared';
import { Appointment } from 'apps/frontend/src/app/shared/interfaces/appointment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-doctor-modal',
  templateUrl: './assign-doctor-modal.component.html',
  styleUrl: './assign-doctor-modal.component.css',
})
export class AssignDoctorModal {
  private readonly userService = inject(UserService);
  private readonly appointmentService = inject(AppointmentService);
  private readonly closeModalButton =
    viewChild<ElementRef<HTMLButtonElement>>('closeModalButton');

  protected appointment?: Appointment;
  protected availableDoctors = signal<User[]>([]);
  protected doctorId = signal<string>('');

  doctorAssignedEvent = output<Appointment>();

  setAppointment(appointment: Appointment) {
    this.appointment = appointment;

    this.userService
      .getDoctors(appointment.specialization)
      .subscribe((doctors) => {
        this.availableDoctors.set(doctors);
      });
  }

  assignDoctor() {
    if (!this.doctorId()) {
      Swal.fire({
        title: 'No hay doctor asignado',
        text: 'Debe de seleccionar un doctor para poder asignar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    this.appointmentService
      .assignDoctor(this.appointment._id, this.doctorId())
      .subscribe((updatedAppointment) => {
        this.doctorAssignedEvent.emit(updatedAppointment);
        this.closeModalButton().nativeElement.click();
      });
  }
}
