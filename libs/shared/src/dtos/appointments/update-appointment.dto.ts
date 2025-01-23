import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status';

export class UpdateAppointmentDto {
  @IsUUID()
  @IsOptional()
  patientId?: string;

  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsOptional()
  date?: Date;

  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @IsString()
  @IsOptional()
  videoCallLink?: string;
}
