import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() appointment: Appointment) {
    return this.appointmentService.create(appointment);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() appointment: Partial<Appointment>) {
    return this.appointmentService.update(id, appointment);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appointmentService.delete(id);
  }
}
