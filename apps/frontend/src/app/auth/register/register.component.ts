/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Role} from '@org/shared';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, this.passwordMismatchValidator()],
    ],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    role: [Role.PATIENT, [Validators.required]],
    specialization: [''],
  });

  private passwordMismatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      /* 
      Para evitar errores al acceder al método get se comprueba 
      si el formulario ya fue actualizado por Angular luego de la inyección de dependencias
       */
      const currentPassword = this.registerForm
        ? this.registerForm.get('password')
        : { value: '' };

      return currentPassword?.value !== control.value
        ? { mismatch: true }
        : null;
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const createUserDto = {
        name: formValues.name!,
        email: formValues.email!,
        phone: formValues.phone!,
        role: formValues.role!,
        //specialization: formValues.specialization as DoctorSpecialization || undefined,
      };

      this.authService
        .signup({
          name: formValues.name!,
          email: formValues.email!,
          password: formValues.password!,
          phone: formValues.phone!,
          role: formValues.role!,
          specialization: '',
        })
        
        .catch((err) => console.error('Error al registrarse:', err));
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

