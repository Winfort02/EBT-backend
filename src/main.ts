import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KEYS } from './constants';
import { GlobalExceptionFilter } from './exceptions/global.exception';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>(KEYS.SERVER_PORT);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  });
  app.useGlobalFilters(new GlobalExceptionFilter(configService))
  await app.listen(port ?? 3000);
}
bootstrap();
