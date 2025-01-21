import { AppointmentStatus } from '../enums/appointment-status';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId?: string;
  date: Date;
  status: AppointmentStatus;
  videoCallLink?: string;
}
