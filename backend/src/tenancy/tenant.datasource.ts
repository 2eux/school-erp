import type { DataSourceOptions } from 'typeorm';
import type { DbConfig } from '../config/db.config';

const tenantedEntitiesGlob =
  __dirname + '/../modules/tenanted/**/entities/*.entity{.ts,.js}';

export function createTenantPoolDataSourceOptions(
  db: DbConfig,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    entities: [tenantedEntitiesGlob],
    synchronize: false,
    logging: db.logging,
    extra: {
      max: db.tenantPoolSize,
      connectionTimeoutMillis: db.connectionTimeout,
    },
  };
}

export function createTenantSchemaSyncDataSourceOptions(
  db: DbConfig,
  schemaName: string,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    schema: schemaName,
    entities: [tenantedEntitiesGlob],
    synchronize: false,
    logging: false,
  };
}
