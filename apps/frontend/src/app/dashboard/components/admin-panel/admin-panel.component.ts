import { Component, input } from '@angular/core';
import { User } from '../../../shared';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  public user = input.required<User>();
}
