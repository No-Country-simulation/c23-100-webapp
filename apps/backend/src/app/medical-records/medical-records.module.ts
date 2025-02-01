import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MedicalRecord,
  MedicalRecordSchema,
} from './schemas/medical-records.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalRecord.name, schema: MedicalRecordSchema },
    ]),
  ],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
