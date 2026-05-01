import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configLoaders, envValidationSchema, validateEnv } from './config';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFilePath = ['.env', `.env.${nodeEnv}`];

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // cache: true,
    envFilePath,
    // validate: validateEnv,
    validationSchema: envValidationSchema,
    load: configLoaders,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
