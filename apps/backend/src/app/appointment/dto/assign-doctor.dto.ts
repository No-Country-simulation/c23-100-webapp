import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class AssignDoctorDto {
  @ApiProperty()
  @IsMongoId()
  doctorId: string;
}
