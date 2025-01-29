import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';
import { Role } from '../../common/enums/user-role';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role = Role.PATIENT;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsEnum(DoctorSpecialization)
  @IsOptional()
  specialization?: DoctorSpecialization;
}
