import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';
import { AppointmentStatus } from '../../common/enums/appointment-status';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop({ required: true, trim: true })
  patientId: string;

  @Prop({ required: false, trim: true })
  doctorId?: string;

  @Prop({ required: true, trim: true })
  reason: string;

  @Prop({ required: true })
  date: Date;

  @Prop({
    type: String,
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Prop({ type: String, required: true, enum: DoctorSpecialization })
  specialization: DoctorSpecialization;

  @Prop({ required: false })
  videoCallLink?: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
