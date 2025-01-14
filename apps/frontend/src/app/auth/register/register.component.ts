import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      /*username: ['', [Validators.required, Validators.minLength(3)]],*/
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          const createUserDto = { email, password };

          this.authService.createUser(createUserDto).then(
            (response) => {
              console.log('Usuario creado en el backend:', response);
            },
            (error) => {
              console.error('Error al enviar datos al backend:', error);
            }
          );
        },
        (error) => {
          console.error('Error al registrarse en Firebase:', error);
        }
      );
    }
  }
}
