import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';
import { Role } from '../../common/enums/user-role';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

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
