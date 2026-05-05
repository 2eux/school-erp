import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const PUBLIC_SCHEMA = 'public';
export const TENANT_SCHEMA_PREFIX = 'tenant_';
export const MAX_TENANT_SOURCES = 80; // Tune based on PG max_connections

export const getMasterDbConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '101',
  database: process.env.DB_NAME || 'multitenant_db',
  schema: PUBLIC_SCHEMA, // Master schema for tenants table
  entities: [__dirname + '/../modules/public/**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
});

export const getTenantConnectionConfig = (schemaName: string): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '101',
  database: process.env.DB_NAME || 'multitenant_db',
  schema: schemaName, // Each tenant has its own schema
  entities: [__dirname + '/../modules/tenanted/**/*.entity{.ts,.js}'],
  synchronize: true,
});