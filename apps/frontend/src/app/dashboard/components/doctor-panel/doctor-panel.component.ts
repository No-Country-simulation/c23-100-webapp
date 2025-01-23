import { Component, input } from '@angular/core';
import { User } from '@org/shared';

@Component({
  selector: 'app-doctor-panel',
  imports: [],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent {
  public user = input.required<User>();
}
