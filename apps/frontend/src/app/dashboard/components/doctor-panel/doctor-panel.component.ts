import { RouterModule } from '@angular/router';
import { Component, input,  HostListener } from '@angular/core';
import { User } from '@org/shared';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-panel',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent {

  public user = input.required<User>();

  isSidebarOpen = true; // Cambiado a false por defecto
  isSidebarHalfOpen = false;

  ngOnInit() {
    this.checkScreenWidth();
    this.loadSidebarState(); // Cargar el estado del sidebar al iniciar
  }

  loadSidebarState() {
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'open') {
      this.isSidebarOpen = true;
      this.isSidebarHalfOpen = false;
    } else if (sidebarState === 'closed') {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = false;
    }
  }

  toggleSidebar() {
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = true;
      localStorage.setItem('sidebarState', 'closed'); // Guardar estado cerrado
    } else {
      this.isSidebarOpen = true;
      this.isSidebarHalfOpen = false;
      localStorage.setItem('sidebarState', 'open'); // Guardar estado abierto
    }
  }

  form = new FormGroup({
    id: new FormControl(''),
    horario_cita: new FormControl('', [Validators.required, Validators.minLength(4)]),
    direccion_cita: new FormControl('', [Validators.required, Validators.minLength(4)]),
    pasillo_cita: new FormControl('', [Validators.required, Validators.minLength(4)]),
    numero_de_puerta: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor() { }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // Muestra la información en la consola
    } else {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }
  
}
