import { Component, inject, input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { DoctorSpecialization, User } from '../../shared';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../core/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-paciente',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent {
  private readonly appointmentService = inject(AppointmentService);

  user = input.required<User>();
  minDate: string;

  form = new FormGroup({
    specialization: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    date: new FormControl('', [
      Validators.required,
      this.invalidHourValidator(),
      this.invalidYearValidator(),
    ]),
  });

  constructor() {
    const today = new Date();
    // Formatear la fecha como 'YYYY-MM-DDTHH:MM' para el input datetime-local
    this.minDate = today.toISOString().slice(0, 16); // Esto establece la fecha y hora actual
  }

  private invalidYearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const year = date.getFullYear();

      if (year < new Date().getFullYear()) {
        return { invalidYear: true };
      }

      return null;
    };
  }

  private invalidHourValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = new Date(control.value);
      const hour = date.getHours();

      if (hour < 8) {
        return {
          invalidHour: true,
        };
      }

      return null;
    };
  }

  onSubmit() {
    if (this.form.valid) {
      const { date, specialization, reason } = this.form.value;

      this.appointmentService
        .create({
          date: new Date(date),
          reason,
          specialization: specialization as DoctorSpecialization,
        })
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'Solicitud enviada',
              text: 'Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto con usted en cuanto se le asigne un doctor.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            this.form.reset();
          },
          error: (err) => {
            console.log(err);

            Swal.fire({
              title: 'Error',
              text: 'No se pudo enviar la solicitud. Inténtalo nuevamente.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
