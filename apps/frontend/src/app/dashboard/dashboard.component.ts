import { Component, OnInit } from '@angular/core';
import { User } from '../shared';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service'; // Importa AuthService
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { PacientePanelComponent } from './components/paciente-panel/paciente-panel.component';

@Component({
  selector: 'app-dashboard',
  imports: [DoctorPanelComponent, AdminPanelComponent, PacientePanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  protected user?: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService // Inyectar AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 401) {
          // Si la sesión ha expirado
          Swal.fire({
            title: '¡Sesión expirada!',
            text: 'Parece que su sesión ha expirado, por favor inicie sesión.',
            icon: 'warning',
            confirmButtonText: 'Iniciar Sesión',
            didClose: () => {
              this.authService.logout().then(() => {
                this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
              });
            },
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
    });
  }
}