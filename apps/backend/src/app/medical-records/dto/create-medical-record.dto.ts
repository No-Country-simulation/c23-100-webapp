import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsMongoId()
  appointmentId: string;

  @IsMongoId()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}
