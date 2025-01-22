import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsEmail,
  MinLength,
} from 'class-validator';

export enum Role {
  PATIENT = 'Patient',
  ADMIN = 'Admin',
  DOCTOR = 'Doctor',
}

export enum DoctorSpecialization {
  GENERAL_PRACTITIONER = 'Médico General',
  CARDIOLOGIST = 'Cardiólogo',
  NEUROLOGIST = 'Neurólogo',
  DERMATOLOGIST = 'Dermatólogo',
  OPHTHALMOLOGIST = 'Oftalmólogo',
  ENDOCRINOLOGIST = 'Endocrinólogo',
  PUBLIC_HEALTH_SPECIALIST = 'Especialista en Salud Pública',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
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
