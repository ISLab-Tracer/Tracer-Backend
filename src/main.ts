import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist = [
  'http://10.0.3.184',
  'http://10.0.3.181',
  'https://tracer.ongdv.dev',
  'https://api-tracer.ongdv.dev',
];

async function bootstrap() {
  const cors: CorsOptions | boolean =
    process.env.NODE_ENV === 'development'
      ? true
      : {
          origin: whitelist,
          methods: ['POST', 'PUT', 'DELETE', 'GET'],
        };
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: cors,
  });
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
