import { User } from '../../shared';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated = false;
  userName = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
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
      next: (user: User) => {
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
