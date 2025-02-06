import { RouterModule } from '@angular/router';
import { Component, HostListener, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../shared';

@Component({
  selector: 'app-home-admin',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  public user = input.required<User>();
  
  ngOnInit() {
  
  }

  
}
