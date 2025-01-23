import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status';

export class CreateAppointmentDto {
  @IsUUID()
  patientId: string;

  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsString()
  @IsOptional()
  videoCallLink?: string;
}
