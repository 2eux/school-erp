import { registerAs } from '@nestjs/config';
import type { LoggerOptions } from 'typeorm';

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  sync: boolean;
  logging: LoggerOptions;
}

export default registerAs('db', (): DbConfig => ({
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  sync: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true' ? ['query', 'error', 'schema'] : false,
}));
