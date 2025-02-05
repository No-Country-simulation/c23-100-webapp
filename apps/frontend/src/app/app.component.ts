import { Component, inject, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  private readonly userService = inject(UserService);
  user?: User;

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
