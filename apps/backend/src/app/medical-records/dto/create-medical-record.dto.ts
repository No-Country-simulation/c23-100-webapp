import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @ApiProperty()
  @IsMongoId()
  appointmentId: string;

  @ApiProperty()
  @IsMongoId()
  patientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notes: string;
}
