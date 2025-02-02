import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '../../common/enums/appointment-status';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';

export class CreateAppointmentDto {
  @IsMongoId()
  patientId: string;

  @IsMongoId()
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
