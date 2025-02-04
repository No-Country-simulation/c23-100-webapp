/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { DoctorSpecialization } from '../enums/doctor-specialization';

const doctorSpecializationList: string[] = [
  DoctorSpecialization.ENDOCRINOLOGIST,
  DoctorSpecialization.GENERAL_PRACTITIONER,
  DoctorSpecialization.NUTRITIONIST,
  DoctorSpecialization.PSYCHIATRIST,
  DoctorSpecialization.PSYCHOLOGIST,
  DoctorSpecialization.PSYCHOTHERAPIST,
];

@Injectable()
export class ParseDoctorSpecializationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!doctorSpecializationList.includes(value)) {
      throw new BadRequestException(
        `Valid specializations are: ${doctorSpecializationList}`
      );
    }

    return value;
  }
}
