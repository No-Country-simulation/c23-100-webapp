import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsUUID()
  appointmentId: string;

  @IsUUID()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}
