import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
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
