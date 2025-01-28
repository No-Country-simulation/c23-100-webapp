import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer-nav/footer/footer.component';
import { NavComponent } from './footer-nav/nav/nav.component';

@Component({
  imports: [RouterOutlet, FooterComponent, NavComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
