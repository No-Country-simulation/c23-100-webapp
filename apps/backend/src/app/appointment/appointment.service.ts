import { Injectable } from '@nestjs/common';
import { FirestoreService } from '../database/firestore.service';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  private readonly collectionName = 'appointments';

  constructor(private readonly firestoreService: FirestoreService) {}

  async create(appointment: Appointment): Promise<Appointment> {
    return this.firestoreService.createDocument<Appointment>(
      this.collectionName,
      appointment,
      appointment.id,
    );
  }

  async findAll(): Promise<Appointment[]> {
    return this.firestoreService.getCollection<Appointment>(this.collectionName);
  }

  async findOne(id: string): Promise<Appointment> {
    return this.firestoreService.getDocument<Appointment>(this.collectionName, id);
  }

  async update(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
    return this.firestoreService.updateDocument<Appointment>(
      this.collectionName,
      id,
      appointment,
    );
  }

  async delete(id: string): Promise<Appointment> {
    return this.firestoreService.deleteDocument<Appointment>(this.collectionName, id);
  }
}
