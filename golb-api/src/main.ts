import { NestFactory } from '@nestjs/core';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app/app.module';
import Environments from './config/environments';
import ConfigKeys from './config/configKeys'


function getPort(app: INestApplication): number {
  const configService = app.get(ConfigService);
  return configService.get<number>(ConfigKeys.port);
}

function createSwaggerDoc(app: INestApplication): OpenAPIObject {
  const options = new DocumentBuilder()
    .setTitle('Golb API')
    .setDescription('The Golb API documentation')
    .setVersion('1.0')
    .addTag('golb')
    .build();
  return SwaggerModule.createDocument(app, options);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  SwaggerModule.setup('api', app, createSwaggerDoc(app));

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: process.env.NODE_ENV !== Environments.Development
  }));

  await app.listen(getPort(app));
}
bootstrap();
