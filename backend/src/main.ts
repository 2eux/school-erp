import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    skipUndefinedProperties: true,
    // forbidNonWhitelisted: true,
  }));

  app.useGlobalFilters(new GlobalExceptionFilter());

  
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  if (!appConfig) {
    throw new Error('App config not found');
  }
  
  await app.listen(appConfig.port);
  
  console.log(`🚀 Multi-tenant SaaS application running on http://${appConfig.host}:${appConfig.port}`);
  console.log(`📊 Architecture: Schema-per-tenant (Cost-effective)`);
}

bootstrap();
