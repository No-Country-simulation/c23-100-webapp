import { Component, HostListener, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../../shared';
import { Doctor } from '../../../shared/interfaces/doctor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-panel',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './paciente-panel.component.html',
  styleUrl: './paciente-panel.component.css',
})
export class PacientePanelComponent implements OnInit {

  public user = input.required<User>();
  isSidebarOpen = true; // Cambiado a false por defecto
  isSidebarHalfOpen = false;
  registrosCitas:any[];
  usuario:User;
  doctor1:Doctor;
  doctor2:Doctor;
  doctor3:Doctor;

  constructor() {
    this.doctor1 = {name: "Jose Roberto", photo: "jose-roberto.jpg"};
    this.doctor2 = {name: "Mila Mesa", photo: "mila-mesa.jpg"};
    this.doctor3 = {name: "Roberto Archundia", photo: "roberto-archundia.jpg"};
    this.registrosCitas = [
      {usuario: this.usuario, doctor: this.doctor1, horario: "18:30 pm", direccion: "Av. Rivadavia 1000", pasillo: "C", numeroPuerta: 14, msj: "12 horas de ayuna antes y despues de asistir al turno."},
      {usuario: this.usuario, doctor: this.doctor2, horario: "4:30 pm", direccion: "Av. Tucasa 123", pasillo: "A", numeroPuerta: 2, msj: "Tome mucha agua y sientese si le cuesta respirar."},
      {usuario: this.usuario, doctor: this.doctor3, horario: "1:00 pm", direccion: "Rodney 5222", pasillo: "B", numeroPuerta: 17, msj: "Venga con 2 horas de anticipación para firmar unos papeles."}
    ];
  }

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
}
