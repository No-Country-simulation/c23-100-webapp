import { RouterModule } from '@angular/router';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { User } from '../../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../../../core/services/appointment.service';
import { PaginationMetadata } from '../../../shared/interfaces/pagination-metadata';
import { Appointment } from '../../../shared/interfaces/appointment';

@Component({
  selector: 'app-doctor-panel',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent implements OnInit {
  private readonly appointmentService = inject(AppointmentService);
  private readonly paginationMetadata = signal<PaginationMetadata | null>(null);
  protected appointments = signal<Appointment[]>([]);

  public user = input.required<User>();

  ngOnInit(): void {
    this.appointmentService.getAll({}).subscribe((res) => {
      this.paginationMetadata.set(res.meta);
      this.appointments.set(res.data);
    });
  }
}
