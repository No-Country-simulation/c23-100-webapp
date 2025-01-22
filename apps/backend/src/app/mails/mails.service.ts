import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendAppointmentConfirmationOptions } from '@org/shared';

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
}
