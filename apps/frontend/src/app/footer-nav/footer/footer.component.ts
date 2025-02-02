import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';// Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'], // Corrige 'styleUrl' a 'styleUrls'
})
export class FooterComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}