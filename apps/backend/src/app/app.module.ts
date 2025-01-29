import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MailsModule } from './mails/mails.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AppointmentModule,
    MailsModule,
    MedicalRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
