import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { User } from '../../shared';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-paciente',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit {
  @Input() user!: User;
  isSidebarOpen = true;
  isSidebarHalfOpen = false;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    especialidad: new FormControl(null, [Validators.required]),
    motivo_consulta: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.checkScreenWidth();
    this.loadSidebarState();
    this.loadUserProfile();
  }

  loadSidebarState() {
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'open') {
      this.isSidebarOpen = true;
      this.isSidebarHalfOpen = false;
    } else {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarHalfOpen = !this.isSidebarOpen;
    localStorage.setItem(
      'sidebarState',
      this.isSidebarOpen ? 'open' : 'closed'
    );
  }

  loadUserProfile() {
    this.userService.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      },
      error: (err) => {
        console.error('Error al cargar el perfil del usuario:', err);
      },
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      Swal.fire({
        title: 'Solicitud enviada',
        text: 'Tu solicitud ha sido enviada con éxito. Un administrador asignará horarios y médicos disponibles.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      // Resetea el formulario después del envío
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
