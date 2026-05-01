import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { DbConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get<DbConfig>('db');
        if (!db?.host || !db.username || !db.database) {
          throw new Error('Database configuration (db) is incomplete');
        }

        const nodeEnv = configService.get('NODE_ENV');
        const isProduction = nodeEnv === 'production';

        return {
          type: 'postgres' as const,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          autoLoadEntities: true,
          // entities: ['src/**/*.entity.ts'],
          // migrations: ['src/migrations/*.ts'],
          synchronize: !isProduction,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
