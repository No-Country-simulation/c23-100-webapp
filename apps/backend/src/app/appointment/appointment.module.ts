import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DatabaseModule } from '../database/database.module'; // Importar DatabaseModule

@Module({
  imports: [DatabaseModule], // Registrar DatabaseModule
  controllers: [AppointmentController],
  providers: [AppointmentService], // Solo el servicio de citas
})
export class AppointmentModule {}
