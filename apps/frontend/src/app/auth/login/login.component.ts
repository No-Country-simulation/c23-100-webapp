import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrección en la propiedad
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inyectar el Router para la redirección
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService
        .login(email, password)
        .then((userToken) => {
          Swal.fire({
            title: 'Éxito!',
            text: 'Has iniciado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            sessionStorage.setItem('userToken', userToken);
            this.router.navigate(['/dashboard']);
          });
        })
        .catch((err: FirebaseError) => {
          if (err.code === 'auth/invalid-credential') {
            Swal.fire({
              title: 'Error!',
              text: 'El email o la contraseña son incorrectos.',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Usuario no encontrado',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
