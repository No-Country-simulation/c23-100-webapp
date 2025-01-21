import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, AppointmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
