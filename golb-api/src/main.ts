import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import Environments from './config/environments';

import ConfigKeys from './config/configKeys'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>(ConfigKeys.port);

  const options = new DocumentBuilder()
    .setTitle('Golb API')
    .setDescription('The Golb API documentation')
    .setVersion('1.0')
    .addTag('golb')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: process.env.NODE_ENV !== Environments.Development
  }));
  await app.listen(port);
}
bootstrap();
