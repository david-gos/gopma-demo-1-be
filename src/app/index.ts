import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { loadGuards } from './app.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initApplication = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);

  // loadGuards(app);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  return app;
};
