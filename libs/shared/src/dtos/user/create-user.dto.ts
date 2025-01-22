import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';
import { Role } from '../../enums/user-role';
import { DoctorSpecialization } from '../../enums/doctor-specialization';

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
