import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../core/services/user.service';
import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.userName = user.name;
      } else {
        this.userName = '';
      }
    });
  }
  sessionexpirada() {
    this.authService.sessionexpiradalogin().then(() => {
      this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
    });
  }

  sessionexpiradaregister() {
    this.authService.sessionexpiradaregister().then(() => {
      this.router.navigate(['/register']); // Redirige al login después de cerrar sesión
    });
  }
  logout() {
    this.authService.logout().then(() => {
      this.isAuthenticated = false;
    });
  }
}
