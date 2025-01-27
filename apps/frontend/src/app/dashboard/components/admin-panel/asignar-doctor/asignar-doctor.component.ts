import { Component, HostListener, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'apps/frontend/src/app/footer-nav/footer/footer.component';
import { NavComponent } from 'apps/frontend/src/app/footer-nav/nav/nav.component';

@Component({
  selector: 'app-asignar-doctor',
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, NavComponent],
  templateUrl: './asignar-doctor.component.html',
  styleUrl: './asignar-doctor.component.css',
})
export class AsignarDoctorComponent {
  
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
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    provincia: new FormControl(null, [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.min(8)]),
    especialidad: new FormControl(null, [Validators.required]),
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
