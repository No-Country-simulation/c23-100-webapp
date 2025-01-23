import { Component, input } from '@angular/core';
import { User } from '@org/shared';

@Component({
  selector: 'app-user-panel',
  imports: [],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.css',
})
export class UserPanelComponent {
  public user = input.required<User>();
}
