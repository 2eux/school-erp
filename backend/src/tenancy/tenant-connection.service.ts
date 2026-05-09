import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import type { DbConfig } from '../config/db.config';
import { MAX_TENANT_SOURCES } from '../database/public.datasource';

@Injectable()
export class TenantConnectionService implements OnApplicationShutdown {
  private readonly logger = new Logger(TenantConnectionService.name);
  private readonly cache = new Map<string, DataSource>();

  constructor(private readonly configService: ConfigService) {}

  async getTenantConnection(schemaName: string): Promise<DataSource> {
    const cached = this.cache.get(schemaName);
    if (cached?.isInitialized) {
      // Move to end of Map for LRU tracking
      this.cache.delete(schemaName);
      this.cache.set(schemaName, cached);
      return cached;
    }

    await this.evictIfAtCapacity();

    const db = this.configService.get<DbConfig>('db')!;

    const ds = new DataSource({
      type: 'postgres',
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      schema: schemaName,
      entities: [__dirname + '/../modules/tenanted/**/entities/*.entity{.ts,.js}'],
      synchronize: db.sync,
      logging: db.logging,
    });

    await ds.initialize();
    this.cache.set(schemaName, ds);
    this.logger.log(`DataSource initialized for schema: ${schemaName}`);

    return ds;
  }

  async synchronizeSchema(schemaName: string): Promise<void> {
    const ds = await this.getTenantConnection(schemaName);
    await ds.synchronize();
    this.logger.log(`Schema synchronized: ${schemaName}`);
  }

  private async evictIfAtCapacity(): Promise<void> {
    if (this.cache.size < MAX_TENANT_SOURCES) return;

    // Map iteration order is insertion order; first key is the least recently used
    const oldestKey = this.cache.keys().next().value;
    if (!oldestKey) return;

    const ds = this.cache.get(oldestKey);
    this.cache.delete(oldestKey);
    if (ds?.isInitialized) {
      await ds.destroy();
      this.logger.log(`Evicted DataSource for schema: ${oldestKey}`);
    }
  }

  async onApplicationShutdown(): Promise<void> {
    for (const [schema, ds] of this.cache) {
      if (ds.isInitialized) {
        await ds.destroy();
        this.logger.log(`DataSource closed for schema: ${schema}`);
      }
    }
    this.cache.clear();
  }
}
