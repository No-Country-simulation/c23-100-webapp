import { Component, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '@org/shared';
import { PacienteComponent } from './paciente/paciente.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AdminComponent } from './admin/admin.component';
import { NoAuthComponent } from './no-auth/no-auth.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, PacienteComponent, DoctorComponent, AdminComponent, NoAuthComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  protected user?: User;

  ngOnInit(): void {
    let usuario: User = {name: "", email: "", role: undefined, phone: "", specialization: ""};
    this.user = usuario;
  }
}