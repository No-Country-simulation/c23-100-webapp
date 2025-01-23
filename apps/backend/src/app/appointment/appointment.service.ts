import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../database/firestore.service';
import {
  Appointment,
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from '@org/shared';

@Injectable()
export class AppointmentService {
  private readonly collectionName = 'appointments';

  constructor(private readonly firestoreService: FirestoreService) {}

  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<Appointment> {
    return this.firestoreService.createDocument<CreateAppointmentDto>(
      this.collectionName,
      createAppointmentDto
    ) as Promise<Appointment>;
  }

  async findAll(): Promise<Appointment[]> {
    return this.firestoreService.getCollection<Appointment>(
      this.collectionName
    );
  }

  async findOne(id: string): Promise<Appointment> {
    return this.firestoreService.getDocument<Appointment>(
      this.collectionName,
      id
    );
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    return this.firestoreService.updateDocument<Appointment>(
      this.collectionName,
      id,
      updateAppointmentDto
    );
  }

  async delete(id: string): Promise<Appointment> {
    return this.firestoreService.deleteDocument<Appointment>(
      this.collectionName,
      id
    );
  }
}
