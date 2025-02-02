import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MailsModule } from './mails/mails.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../config/envs';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AppointmentModule,
    MailsModule,
    MedicalRecordsModule,
    JwtModule.register({
      global: true,
      secret: envs.jwtSecretKey,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
