import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateMedicalRecordDto } from '@org/shared';
import { MedicalRecordsGuard } from './medical-records.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('medical-records')
@UseGuards(AuthGuard)
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @UseGuards(MedicalRecordsGuard)
  create(
    @User('uid') doctorId: string,
    @Body() createMedicalRecordDto: CreateMedicalRecordDto
  ) {
    return this.medicalRecordsService.create(doctorId, createMedicalRecordDto);
  }

  @Get()
  getAll(@Query('appointmentId', ParseUUIDPipe) appointmentId: string) {
    return this.medicalRecordsService.getAll(appointmentId);
  }
}
