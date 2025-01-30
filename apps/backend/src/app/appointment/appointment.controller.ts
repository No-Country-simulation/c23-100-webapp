import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AppointmentGuard } from './appointment.guard';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
@UseGuards(AuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() appointment: CreateAppointmentDto) {
    return this.appointmentService.create(appointment);
  }

  @Get()
  @UseGuards(AppointmentGuard)
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() appointment: UpdateAppointmentDto) {
    return this.appointmentService.update(id, appointment);
  }
}
