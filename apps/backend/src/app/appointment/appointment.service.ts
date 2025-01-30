import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schema/appointment.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment = new this.appointmentModel(createAppointmentDto);
      const savedAppointment = (await appointment.save()).toObject();

      return savedAppointment;
    } catch {
      throw new InternalServerErrorException('Error al registrar cita');
    }
  }

  async findAll() {
    try {
      const appointments = await this.appointmentModel.find().lean();
      return appointments;
    } catch {
      throw new InternalServerErrorException('Error al recuperar citas');
    }
  }

  async findOne(id: string) {
    const appointment = await this.appointmentModel.findById(id).lean();

    if (!appointment) {
      throw new NotFoundException(`Cita con id: ${id} no encontrada`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    await this.findOne(id);

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .lean();

    if (!updatedAppointment) {
      throw new NotFoundException(
        `Cita con id: ${id} no encontrada para actualizar`
      );
    }

    return updatedAppointment;
  }
}
