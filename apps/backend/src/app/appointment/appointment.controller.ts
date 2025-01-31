import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AppointmentGuard } from './appointment.guard';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { User } from '../common/decorators/user.decorator';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.appointmentService.findAll(paginationDto);
  }

  @Get('user')
  findByUser(@User('sub') userId: string) {
    return this.appointmentService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() appointment: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(id, appointment);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.appointmentService.delete(id);
  }
  @Patch(':id/assign-doctor')
  @UseGuards(AppointmentGuard) // Solo el administrador puede asignar doctores
  async assignDoctor(
    @Param('id') appointmentId: string,
    @Body('doctorId') doctorId: string
  ) {
    return this.appointmentService.assignDoctor(appointmentId, doctorId);
  }

}
