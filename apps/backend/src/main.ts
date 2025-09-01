import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { envs } from './config/envs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Api');
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('No Country Medical API')
    .setDescription('API para administrar No Country Medical')
    .setVersion('1.0')
    .addTag('nocountrymedical')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Convertir el string de URLs a array
  const allowedOrigins = envs.frontend_url.split(',').map(url => url.trim());

  app.enableCors({
    credentials: true,
    origin: allowedOrigins, // Ahora es un array
  });

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    })
  );

  app.setGlobalPrefix('api');

  await app.listen(envs.port);
  logger.log(`🚀 Application is running on: http://localhost:${envs.port}/api`);
}

bootstrap();
