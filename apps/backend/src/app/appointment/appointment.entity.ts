import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class Appointment {
  @IsString()
  id: string; // UUID

  @IsString()
  patientId: string;

  @IsString()
  doctorId: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsString()
  status: string; // pending, confirmed, cancelled

  @IsOptional()
  @IsString()
  videoCallLink?: string;
}
