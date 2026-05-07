import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { getTenantConnectionConfig } from '../database/database.config';

@Injectable({ scope: Scope.REQUEST })
export class TenantConnectionService {
  private tenantDataSource: DataSource;
  private currentSchema: string;

  constructor(@Inject(REQUEST) private request: any) {}

  async getTenantConnection(schemaName: string): Promise<DataSource> {
    // Reuse connection if it's for the same schema
    if (this.tenantDataSource?.isInitialized && this.currentSchema === schemaName) {
      return this.tenantDataSource;
    }

    // Close existing connection if switching schemas
    if (this.tenantDataSource?.isInitialized) {
      await this.tenantDataSource.destroy();
    }

    const config = getTenantConnectionConfig(schemaName);
    this.tenantDataSource = new DataSource(config as any);
    this.currentSchema = schemaName;
    
    if (!this.tenantDataSource.isInitialized) {
      await this.tenantDataSource.initialize();
    }

    return this.tenantDataSource;
  }

  async closeTenantConnection() {
    if (this.tenantDataSource?.isInitialized) {
      await this.tenantDataSource.destroy();
    }
  }

  getCurrentSchema(): string {
    return this.currentSchema;
  }
}
