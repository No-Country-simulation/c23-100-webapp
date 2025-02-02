/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AppointmentStatus } from '../enums/appointment-status';

const appointmentStatusList: string[] = [
  AppointmentStatus.CANCELLED,
  AppointmentStatus.CONFIRMED,
  AppointmentStatus.PENDING,
];

@Injectable()
export class ParseAppointmentStatusPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!appointmentStatusList.includes(value)) {
      throw new BadRequestException(
        `Valid status are: ${appointmentStatusList}`
      );
    }

    return value;
  }
}
