import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envs } from './config/envs';

async function bootstrap() {
  const logger = new Logger('Api');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(envs.port);
  logger.log(`🚀 Application is running on: http://localhost:${envs.port}/api`);
}

bootstrap();
