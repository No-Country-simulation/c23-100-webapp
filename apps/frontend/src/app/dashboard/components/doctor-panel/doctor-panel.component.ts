import { RouterModule } from '@angular/router';
import { Component, input } from '@angular/core';
import { User } from '../../../shared';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-panel',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent {
  public user = input.required<User>();
}
