import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export enum Role {
  PATIENT = 'Patient',
  ADMIN = 'Admin',
  DOCTOR = 'Doctor',
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
