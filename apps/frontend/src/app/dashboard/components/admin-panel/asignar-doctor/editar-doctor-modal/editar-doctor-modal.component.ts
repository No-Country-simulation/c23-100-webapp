import {
  Component,
  ElementRef,
  inject,
  Output,
  signal,
  ViewChild,
  EventEmitter 
} from '@angular/core';
import { AppointmentService } from 'apps/frontend/src/app/core/services/appointment.service';
import { UserService } from 'apps/frontend/src/app/core/services/user.service';
import { User } from 'apps/frontend/src/app/shared';
import { Appointment } from 'apps/frontend/src/app/shared/interfaces/appointment';
import { AppointmentStatus } from 'apps/frontend/src/app/shared/enums/appointment-status.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-doctor-modal',
  templateUrl: './editar-doctor-modal.component.html',
  styleUrls: ['./editar-doctor-modal.component.css'],
})
export class EditarDoctorModalComponent {
  private readonly userService = inject(UserService);
  private readonly appointmentService = inject(AppointmentService);
  
  @ViewChild('closeModalButton') closeModalButton!: ElementRef<HTMLButtonElement>;
  
  protected appointment?: Appointment;
  protected availableDoctors = signal<User[]>([]);
  protected doctorId = signal<string>('');
  
  @Output() editarAssignedEvent = new EventEmitter<Appointment>();

  setAppointment(appointment: Appointment) {
    this.appointment = appointment;
    this.userService
      .getDoctors(appointment.specialization)
      .subscribe((doctors) => {
        this.availableDoctors.set(doctors);
      });
  }

  editarDoctor() {
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
        this.editarAssignedEvent.emit(updatedAppointment);
        // ✅ Mostrar mensaje de éxito
        Swal.fire({
          title: '¡Felicidades!',
          text: 'Se pudo actualizar el doctor correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          // ✅ Cerrar el modal después de que el usuario presione "Aceptar"
          this.closeModalButton.nativeElement.click();
        });
      });
  }

  cancelAppointment() {
    if (!this.appointment) return;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cancelar esta consulta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar al servicio para actualizar el estado
        this.appointmentService
          .updateAppointmentStatus(this.appointment._id, AppointmentStatus.CANCELLED)
          .subscribe({
            next: (updatedAppointment) => {
              this.editarAssignedEvent.emit(updatedAppointment);
              Swal.fire({
                title: '¡Consulta cancelada!',
                text: 'La consulta ha sido cancelada con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              }).then(() => {
                this.closeModalButton.nativeElement.click(); // Cerrar el modal
              });
            },
            error: (err) => {
              console.error('Error al cancelar la consulta:', err);
              Swal.fire({
                title: 'Error',
                text: 'No se pudo cancelar la consulta. Inténtalo nuevamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            },
          });
      }
    });
  }
}