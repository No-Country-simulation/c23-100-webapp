import { IsNotEmpty } from 'class-validator';
import { IsPhoneNumber } from 'class-validator';
import { IsEnum } from 'class-validator';
import { IsOptional } from 'class-validator';
import { MinLength } from 'class-validator';
import { IsString, IsEmail } from 'class-validator';

export enum Role {
  PATIENT = 'patient',
  ADMIN = 'admin',
  DOCTOR = 'doctor',
}

export enum DoctorSpecialization {
  GENERAL_PRACTITIONER = 'General Practitioner',
  CARDIOLOGIST = 'Cardiologist',
  NEUROLOGIST = 'Neurologist',
  OBSTETRICIAN = 'Obstetrician',
  PEDIATRICIAN = 'Pediatrician',
  DERMATOLOGIST = 'Dermatologist',
  PSYCHIATRIST = 'Psychiatrist',
  CLINICAL_PSYCHOLOGIST = 'Clinical Psychologist',
  OPHTHALMOLOGIST = 'Ophthalmologist',
  AUDIOLOGIST = 'Audiologist',
  ORTHOPEDIST = 'Orthopedist',
  PLASTIC_SURGEON = 'Plastic Surgeon',
  ENDOCRINOLOGIST = 'Endocrinologist',
  IMMUNOLOGIST = 'Immunologist',
  ALLERGIST = 'Allergist',
  PATHOLOGIST = 'Pathologist',
  PUBLIC_HEALTH_SPECIALIST = 'Public Health Specialist',
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
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
