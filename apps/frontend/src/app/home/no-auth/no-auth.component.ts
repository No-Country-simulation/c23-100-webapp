import { Component, HostListener, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer-nav/footer/footer.component';
import { NavComponent } from '../../footer-nav/nav/nav.component';

@Component({
  selector: 'app-no-auth',
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, NavComponent ],
  templateUrl: './no-auth.component.html',
  styleUrl: './no-auth.component.css',
})
export class NoAuthComponent {
  isSidebarOpen = true;
  isSidebarHalfOpen = false;

  ngOnInit() {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = false;
    }
  }

  toggleSidebar() {
    if (this.isSidebarOpen) {
      this.isSidebarOpen = false;
      this.isSidebarHalfOpen = true;
    } else {
      this.isSidebarOpen = true;
      this.isSidebarHalfOpen = false;
    }
  }
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    provincia: new FormControl(null, [Validators.required]),  
    direccion: new FormControl('', [Validators.required, Validators.min(8)]),      
    especialidad: new FormControl(null, [Validators.required]),      
  });

  constructor() {}

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // Muestra la información en la consola
    } else {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }
}
