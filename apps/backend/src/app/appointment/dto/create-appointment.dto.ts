import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { AppointmentStatus } from '../../common/enums/appointment-status';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';

export class CreateAppointmentDto {
  @IsString()
  @Length(28, 28)
  @Matches(/^[A-Za-z0-9_-]+$/)
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
