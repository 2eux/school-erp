import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

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
  
  const port = process.env.PORT || 5000;
  await app.listen(port);
  
  console.log(`🚀 Multi-tenant SaaS application running on http://localhost:${port}`);
  console.log(`📊 Architecture: Schema-per-tenant (Cost-effective)`);
}

bootstrap();
