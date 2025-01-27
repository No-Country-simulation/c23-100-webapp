import { Component, HostListener, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { NoAuthComponent } from "./no-auth/no-auth.component";
import { PacienteComponent } from './paciente/paciente.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule,NoAuthComponent, PacienteComponent, DoctorComponent, AdminComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}