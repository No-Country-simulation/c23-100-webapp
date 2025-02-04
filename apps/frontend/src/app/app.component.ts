import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer-nav/footer/footer.component';
import { NavComponent } from './footer-nav/nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { User } from './shared';
import { UserService } from './core/services/user.service';

@Component({
  imports: [RouterOutlet, FooterComponent, NavComponent, SidebarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected user?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.error('Error al cargar el perfil del usuario:', err);
      },
    });
  }
}
