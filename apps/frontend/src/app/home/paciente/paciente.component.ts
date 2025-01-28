import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { User } from '@org/shared';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'home-paciente',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
    provincia: new FormControl(null, [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(8)]),
    especialidad: new FormControl(null, [Validators.required]),
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
    localStorage.setItem('sidebarState', this.isSidebarOpen ? 'open' : 'closed');
  }

  loadUserProfile() {
    this.userService.getProfile().subscribe({
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
    } else {
      this.form.markAllAsTouched();
    }
  }
}

