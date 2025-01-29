import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalRecord } from './schemas/medical-records.schema';
import { Model } from 'mongoose';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord.name)
    private medicalRecordModel: Model<MedicalRecord>
  ) {}

  async create(
    doctorId: string,
    createMedicalRecordDto: CreateMedicalRecordDto
  ) {
    const medicalRecord = new this.medicalRecordModel({
      ...createMedicalRecordDto,
      doctorId,
    });
    const savedMedicalRecord = await medicalRecord.save();

    return savedMedicalRecord.toObject();
  }

  async getAll(appointmentId: string) {
    const medicalRecords = await this.medicalRecordModel
      .find({
        appointmentId,
      })
      .lean()
      .exec();

    if (medicalRecords.length == 0) {
      throw new NotFoundException(
        `La cita con id: ${appointmentId} no tiene grabaciones médicas todavía`
      );
    }

    return medicalRecords;
  }
}
