import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '../../common/enums/appointment-status';
import { DoctorSpecialization } from '../../common/enums/doctor-specialization';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    nullable: true,
  })
  @IsMongoId()
  @IsOptional()
  doctorId?: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @ApiProperty()
  @IsEnum(DoctorSpecialization)
  specialization: DoctorSpecialization;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus = AppointmentStatus.PENDING;

  @ApiProperty({
    nullable: true,
  })
  @IsString()
  @IsOptional()
  videoCallLink?: string;
}
