import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorSpecialization, Role } from '../../shared';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, this.passwordMismatchValidator()],
    ],

    phone: [
      '',
      [Validators.required, Validators.pattern(/^\+\d{1,4}\d{7,10}$/)],
    ],
    role: [Role.PATIENT, this.specializationNotAllowedValidator()],
    specialization: ['', this.specializationRequiredValidator()],
  });

  private passwordMismatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentPassword = this.registerForm
        ? this.registerForm.get('password').value
        : '';

      return currentPassword !== control.value ? { mismatch: true } : null;
    };
  }

  private specializationRequiredValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentRole = this.registerForm
        ? this.registerForm.get('role').value
        : '';

      return currentRole === Role.DOCTOR && !control.value
        ? { specializationRequired: true }
        : null;
    };
  }

  private specializationNotAllowedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const specialization = this.registerForm
        ? this.registerForm.get('specialization').value
        : '';

      return control.value === Role.PATIENT && specialization
        ? { specializationNotAllowed: true }
        : null;
    };
  }
  onSubmit(): void {
    const { name, email, password, role, specialization, phone } = this.registerForm.value;
    
    if (role == Role.PATIENT && specialization) {
      this.registerForm.setErrors({
        specializationNotAllowed: true,
      });
      return;
    } else if (role == Role.DOCTOR && !specialization) {
      this.registerForm.setErrors({
        specializationRequired: true,
      });
      return;
    }
    
    if (this.registerForm.valid) {
      this.authService
        .signup({
          name,
          email,
          role: role as Role,
          specialization: (specialization as DoctorSpecialization) || undefined, // Para evitar enviar un string vacío y que ocurra un error de validación
          phone,
          password,
        })
        .subscribe({
          next: ({ userToken }) => {
            sessionStorage.setItem('userToken', userToken);
            Swal.fire({
              title: 'Registro Exitoso!',
              text: 'Te has registrado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              didClose: () => {
                this.router.navigate(['/dashboard']).then(() => {
                  location.reload(); // Recarga la página después de la navegación
                });
              },
            });
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.router.navigate(['/login']);
            } else if (err.status === 409) {
              Swal.fire({
                title: 'Email en uso!',
                text: 'Ya existe un usuario registrado con este email.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            } else {
              Swal.fire({
                title: 'Error al registrarse!',
                text: 'Hubo un problema durante el registro.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          },
        });
    }
  }
  hasErrors(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);

    if (!field) {
      throw new Error(
        `El campo: ${fieldName} no existe en el formulario de registro.`
      );
    }

    return field.hasError(errorType) && field.touched;
  }
}
