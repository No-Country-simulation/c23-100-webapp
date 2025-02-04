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
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    nullable: true,
  })
  @IsEnum(Role)
  @IsOptional()
  role = Role.PATIENT;

  @ApiProperty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    nullable: true,
  })
  @IsEnum(DoctorSpecialization)
  @IsOptional()
  specialization?: DoctorSpecialization;
}
