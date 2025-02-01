import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from '../../config/envs';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(envs.db.url, {
      onConnectionCreate: (connection: Connection) => {
        const dbLogger = new Logger('Database');

        connection.on('open', () => {
          dbLogger.log('Database connected successfully');
        });

        return connection;
      },
    }),
  ],
})
export class DatabaseModule {}
