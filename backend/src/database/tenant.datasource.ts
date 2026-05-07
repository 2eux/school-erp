import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { TenantService } from '../modules/public/tenants/services/tenant.service';
import { NotFoundException } from '@nestjs/common';

const cache = new Map<string, DataSource>();

// new (ChatGP)
@Injectable({ scope: Scope.REQUEST })
export class TenantDataSourceFactory {
  constructor(
    @Inject(REQUEST) private req: Request,
    private tenantService: TenantService,
  ) {}

  async get(): Promise<DataSource> {
    const slug = this.req['tenantSlug'];

    const tenant = await this.tenantService.findBySlug(slug);

    if (!tenant) throw new NotFoundException('Tenant not found');

    const schema = tenant.schemaName;

    if (cache.has(schema)) {
      return cache.get(schema) as DataSource;
    }

    const ds = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      schema,
      entities: ['dist/**/*.entity.js'],
    });

    await ds.initialize();

    cache.set(schema, ds);

    return ds;
  }
}