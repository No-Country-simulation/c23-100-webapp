import { AppointmentStatus } from '../enums/appointment-status.enum';
import { DoctorSpecialization } from '../enums/doctor-specialization.enum';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId?: string;
  date: Date;
  specialization: DoctorSpecialization;
  reason: string;
  status: AppointmentStatus;
  videoCallLink?: string;
}
