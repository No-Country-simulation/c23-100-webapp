import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-error',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnInit {
  
  ngOnInit() {
  }

 
}