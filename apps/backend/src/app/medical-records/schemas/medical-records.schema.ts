import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MedicalRecordDocument = HydratedDocument<MedicalRecord>;

@Schema({ timestamps: true })
export class MedicalRecord {
  @Prop({ required: true, trim: true })
  appointmentId: string;

  @Prop({ required: true, trim: true })
  doctorId: string;

  @Prop({ required: true, trim: true })
  patientId: string;

  @Prop({ required: true, trim: true })
  notes: string;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
