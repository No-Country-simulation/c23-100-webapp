import { RouterModule } from '@angular/router';
import { Component, HostListener, input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    provincia: new FormControl(null, [Validators.required]),
    direccion: new FormControl('', [Validators.required, Validators.min(8)]),
    especialidad: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value); // Muestra la información en la consola
    } else {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }
}
