import { Component, inject, OnInit } from '@angular/core';
import { User } from '@org/shared';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

@Component({
  selector: 'app-dashboard',
  imports: [DoctorPanelComponent, AdminPanelComponent, UserPanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  protected user?: User;

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
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
    });
  }
}
