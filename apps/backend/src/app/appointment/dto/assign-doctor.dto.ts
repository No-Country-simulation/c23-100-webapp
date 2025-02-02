import { IsMongoId } from 'class-validator';

export class AssignDoctorDto {
  @IsMongoId()
  doctorId: string;
}
