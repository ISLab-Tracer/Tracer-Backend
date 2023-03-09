import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as dotenv from 'dotenv';

const whitelist = [
  'http://10.0.3.184',
  'http://10.0.3.181',
  'https://tracer.islab.dev',
  'https://api-tracer.islab.dev',
];

async function bootstrap() {
  console.log(process.env.NODE_ENV);
  const cors: CorsOptions | boolean =
    process.env.NODE_ENV === 'development'
      ? {
          origin: '*',
          methods: ['POST', 'PUT', 'DELETE', 'GET'],
          credentials: true,
        }
      : {
          origin: whitelist,
          methods: ['POST', 'PUT', 'DELETE', 'GET'],
          credentials: true,
        };

  console.log(cors);
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(cors);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.useStaticAssets(join(__dirname, '..', 'assets'), {
    prefix: '/assets/',
  });
  await app.listen(port);
}
bootstrap();
