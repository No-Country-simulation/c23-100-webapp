import { Component, HostListener, OnInit } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'apps/frontend/src/app/core/services/admin.service';
import { Appointment } from 'apps/frontend/src/app/shared/interfaces/appointment';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-asignar-doctor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './asignar-doctor.component.html',
  styleUrl: './asignar-doctor.component.css',
})
export class AsignarDoctorComponent implements OnInit {
  
  appointments: Appointment[] = []; // Propiedad para almacenar las citas

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAppointments(); // Cargar citas al iniciar el componente
  }

  loadAppointments() {
    const token = localStorage.getItem('userToken');
    console.log('Token:', token); // Verifica el token
  
    this.adminService.getAppointments().subscribe({
      next: (appointments) => {
        console.log('Citas recibidas:', appointments); // Verifica las citas recibidas
        this.appointments = appointments;
      },
      error: (err) => {
        console.error('Error al cargar las citas', err);
      },
    });
  }
}
