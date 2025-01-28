import { Component, inject, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { User,Role } from '@org/shared';
import { HttpErrorResponse } from '@angular/common/http';
import { PacienteComponent } from './paciente/paciente.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';
import { NoAuthComponent } from './no-auth/no-auth.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, PacienteComponent, DoctorComponent, AdminComponent, NoAuthComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  protected user?: User;

  ngOnInit(): void {
    let usuario: User = {name: "", email: "", role: undefined, phone: "", specialization: ""};
    this.user = usuario;
    /*this.userService.getProfile().subscribe({
      next: (user) => (this.user = user),
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          Swal.fire({
            title: '¡Sesión expirada!',
            text: 'Parece que su sesión ha expirado, por favor inicie sesión.',
            icon: 'warning',
            confirmButtonText: 'Iniciar Sesión',
            didClose: () => this.router.navigate(['/login']),
          });
        } else if (err.status === 404) {
          Swal.fire({
            title: '¡Usuario no encontrado!',
            text: 'No hemos podido encontrarlo en nuestro sistema, por favor regístrese.',
            icon: 'warning',
            confirmButtonText: 'Registrarse',
            didClose: () => this.router.navigate(['/register']),
          });
        }
      },
    });*/
  }
}