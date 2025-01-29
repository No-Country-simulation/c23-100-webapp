import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  userName: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Detecta cambios en la autenticación
    this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.loadUserProfile();
      } else {
        this.userName = '';
      }
    });
  }

  loadUserProfile() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.userName = user.name;
      },
      error: (err) => {
        console.error('Error al obtener el perfil:', err);
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
