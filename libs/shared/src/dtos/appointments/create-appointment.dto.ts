import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status';
import { DoctorSpecialization } from '../../enums/doctor-specialization';

export class CreateAppointmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsEnum(DoctorSpecialization)
  specialization: DoctorSpecialization;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus = AppointmentStatus.PENDING;

  @IsString()
  @IsOptional()
  videoCallLink?: string;
}
