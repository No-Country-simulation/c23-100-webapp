import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendAppointmentConfirmationOptions } from './send-appointment-confirmation.interface';
import { SendDoctorNotificationOptions } from './send-doctor-notification.interface';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}

  async sendAppointmentConfirmation(
    options: SendAppointmentConfirmationOptions
  ) {
    await this.mailerService.sendMail({
      to: options.patient.email,
      subject: 'Actualización sobre tu Cita Médica',
      template: 'appointment-confirmed',
      context: options,
    });
  }

  async sendDoctorNotification(options: SendDoctorNotificationOptions) {
    await this.mailerService.sendMail({
      to: options.doctor.email,
      subject: '¡Nueva cita médica asignada!',
      template: 'doctor-notification',
      context: options,
    });
  }
}
