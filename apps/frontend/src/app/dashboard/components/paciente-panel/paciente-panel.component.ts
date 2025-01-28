import { Component, input } from '@angular/core';
import { User } from '@org/shared';

@Component({
  selector: 'app-paciente-panel',
  imports: [],
  templateUrl: './paciente-panel.component.html',
  styleUrl: './paciente-panel.component.css',
})
export class PacientePanelComponent {
  public user = input.required<User>();
}
