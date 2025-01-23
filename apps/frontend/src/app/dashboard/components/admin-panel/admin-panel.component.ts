import { Component, input } from '@angular/core';
import { User } from '@org/shared';

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {
  public user = input.required<User>();
}
