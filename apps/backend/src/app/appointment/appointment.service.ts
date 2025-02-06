import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './schema/appointment.schema';
import { Model } from 'mongoose';
import { AppointmentStatus } from '../common/enums/appointment-status';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { User } from '../user/schemas/user.schema';
import { MailsService } from '../mails/mails.service';
import { formatHourByDate } from '../common/utils/format-date';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailsService: MailsService
  ) {}

  async create(patientId: string, createAppointmentDto: CreateAppointmentDto) {
    try {
      const appointment = new this.appointmentModel({
        ...createAppointmentDto,
        patientId,
      });
      const savedAppointment = (await appointment.save()).toObject();

      return savedAppointment;
    } catch {
      throw new InternalServerErrorException('Error al registrar cita');
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { page, limit } = paginationDto;
      const startIndex = (page - 1) * limit;
      const appointments = await this.appointmentModel
        .find()
        .skip(startIndex)
        .limit(limit)
        .select('-__v')
        .exec();
      const total = await this.appointmentModel.countDocuments();

      return {
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        data: appointments,
      };
    } catch {
      throw new InternalServerErrorException('Error al recuperar citas');
    }
  }

  async findOne(id: string) {
    const appointment = await this.appointmentModel
      .findById(id)
      .lean()
      .select('-__v');
    if (!appointment) {
      throw new NotFoundException(`Cita con id: ${id} no encontrada`);
    }

    return appointment;
  }

  async findByUser(userId: string) {
    const appointments = await this.appointmentModel
      .find({
        patientId: userId,
      })
      .select('-__v')
      .exec();

    if (appointments.length === 0) {
      throw new NotFoundException(
        'El usuario no tiene citas médicas agendadas'
      );
    }

    return appointments;
  }

  async findByDoctor(userId: string) {
    const appointments = await this.appointmentModel
      .find({
        doctorId: userId,
      })
      .select('-__v')
      .exec();

    if (appointments.length === 0) {
      throw new NotFoundException(
        'El usuario médico no tiene citas con pacientes agendadas'
      );
    }

    return appointments;
  }

  async findByStatus(status: AppointmentStatus) {
    const appointments = await this.appointmentModel
      .find({ status })
      .select('-__v')
      .lean()
      .exec();

    if (appointments.length === 0) {
      throw new NotFoundException(
        `No se encontraron citas médicas con estado: ${status}`
      );
    }

    return appointments;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    await this.findOne(id);

    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .lean()
      .select('-__v');

    if (!updatedAppointment) {
      throw new NotFoundException(
        `Cita con id: ${id} no encontrada para actualizar`
      );
    }

    return updatedAppointment;
  }
  async assignDoctor(appointmentId: string, doctorId: string) {
    // Verificar si la cita existe
    const appointment = await this.appointmentModel.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundException(`Cita con id ${appointmentId} no encontrada`);
    }

    const doctor = await this.userModel.findById(doctorId);

    if (!doctor) {
      throw new NotFoundException(`Doctor con id ${doctorId} no encontrado`);
    }

    if (doctor.specialization !== appointment.specialization) {
      throw new BadRequestException(
        'El doctor asignado no cumple con la especialidad solicitada'
      );
    }

    appointment.doctorId = doctorId;
    appointment.status = AppointmentStatus.CONFIRMED;

    this.sendConfirmationEmail(appointment);
    this.sendDoctorNotificationEmail(appointment);

    const updatedAppointment = await appointment.save();
    return updatedAppointment;
  }

  async delete(id: string) {
    const appointment = await this.findOne(id);
    await this.appointmentModel.deleteOne({ _id: id });

    return appointment;
  }

  private async sendConfirmationEmail(appointment: Appointment) {
    const options = await this.getEmailOptionsByAppointment(appointment);
    await this.mailsService.sendAppointmentConfirmation(options);
  }

  private async sendDoctorNotificationEmail(appointment: Appointment) {
    const options = await this.getEmailOptionsByAppointment(appointment);
    await this.mailsService.sendDoctorNotification(options);
  }

  private async getEmailOptionsByAppointment(appointment: Appointment) {
    const doctor = await this.userModel.findById(appointment.doctorId);
    const patient = await this.userModel.findById(appointment.patientId);

    return {
      doctor: {
        name: doctor.name,
        email: doctor.email,
      },
      patient: {
        email: patient.email,
        name: patient.name,
      },
      date: appointment.date.toDateString(),
      hour: formatHourByDate(appointment.date),
      reason: appointment.reason,
    };
  }
}
