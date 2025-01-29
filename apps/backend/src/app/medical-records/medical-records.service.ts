import { Injectable, NotFoundException } from '@nestjs/common';
import { FirestoreService } from '../database/firestore.service';
import { CreateMedicalRecordDto, MedicalRecord } from '@org/shared';

@Injectable()
export class MedicalRecordsService {
  private readonly collectionName = 'medical_records';

  constructor(private readonly firestoreService: FirestoreService) {}

  async create(
    doctorId: string,
    createMedicalRecordDto: CreateMedicalRecordDto
  ) {
    const id = crypto.randomUUID();

    return this.firestoreService.createDocument<MedicalRecord>(
      this.collectionName,
      {
        ...createMedicalRecordDto,
        date: new Date(),
        id,
        doctorId,
      },
      id
    );
  }

  async getAll(appointmentId: string) {
    const records = await this.firestoreService.getCollection<MedicalRecord>(
      this.collectionName
    );
    const filteredRecords = records.filter(
      (record) => record.appointmentId === appointmentId
    );

    if (filteredRecords.length === 0) {
      throw new NotFoundException('No medical records found');
    }

    return filteredRecords;
  }
}
