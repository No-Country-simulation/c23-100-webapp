import { AppointmentStatus } from '../enums/appointment-status.enum';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId?: string;
  date: Date;
  status: AppointmentStatus;
  videoCallLink?: string;
}
