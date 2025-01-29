import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsString()
  @Length(28, 28)
  @Matches(/^[A-Za-z0-9_-]+$/)
  appointmentId: string;

  @IsString()
  @Length(28, 28)
  @Matches(/^[A-Za-z0-9_-]+$/)
  patientId: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}
