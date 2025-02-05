import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../shared';
import { UserService } from '../core/services/user.service';
@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit, AfterViewInit {
  isSidebarOpen = true;
  isSidebarHalfOpen = false;
  private localStorageKey = 'sidebarState'; // Clave para localStorage

  protected user?: User;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadSidebarState(); // Cargar estado al inicializar el componente
    this.loadUser(); // Cargar el usuario aquí
  }

  ngAfterViewInit() {
    this.checkScreenWidth(); // Llamar a checkScreenWidth después de que la vista se inicialice
  }
  loadUser() {
    this.userService.getProfile().subscribe((user) => {
      this.user = user; // Asigna el usuario cargado
    });
  }

  loadSidebarState() {
    const storedState = localStorage.getItem(this.localStorageKey);
    if (storedState) {
      this.isSidebarOpen = storedState === 'open';
      this.isSidebarHalfOpen = storedState === 'closed'; // Ajustado para half-open
    } else {
      this.checkScreenWidth(); // Establecer estado inicial según el tamaño de la pantalla si no hay nada en localStorage
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = false;
    } else if (localStorage.getItem(this.localStorageKey) === null) {
      // Solo si no hay nada en localStorage
      this.isSidebarOpen = true; // O el valor que desees por defecto en escritorio
      this.isSidebarHalfOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isSidebarHalfOpen = !this.isSidebarOpen; // Actualizar half-open
    localStorage.setItem(
      this.localStorageKey,
      this.isSidebarOpen ? 'open' : 'closed'
    );
  }
}
