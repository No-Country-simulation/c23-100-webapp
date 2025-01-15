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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, this.passwordMismatchValidator()],
    ],
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
      const { email, password } = this.registerForm.value;

      this.authService
        .signup({
          email: email!,
          password: password!,
        })
        .then(() => {
          // Redirigir al user
        })
        .catch((err) => {
          // Manejar error
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
