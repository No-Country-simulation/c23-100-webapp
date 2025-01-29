import { CommonModule } from '@angular/common';
import { Component, HostListener, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '@org/shared';

@Component({
  selector: 'app-paciente-panel',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './paciente-panel.component.html',
  styleUrl: './paciente-panel.component.css',
})
export class PacientePanelComponent {

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

}
