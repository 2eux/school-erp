import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { getTenantConnectionConfig } from '../../../../database/database.config';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async createTenant(name: string, subdomain: string): Promise<Tenant> {
    const existing = await this.tenantRepository.findOne({ where: { subdomain } });
    if (existing) {
      throw new ConflictException('Tenant subdomain already exists');
    }

    const schemaName = `tenant_${subdomain.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    
    // Create tenant record in public schema
    const tenant = this.tenantRepository.create({ name, subdomain, schemaName });
    await this.tenantRepository.save(tenant);

    // Create tenant schema
    await this.createTenantSchema(schemaName);
    
    // Run migrations for tenant schema
    await this.runTenantMigrations(schemaName);

    return tenant;
  }

  private async createTenantSchema(schemaName: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
      // Create schema if it doesn't exist
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
      console.log(`Schema ${schemaName} created successfully`);
    } catch (error) {
      console.error(`Error creating schema ${schemaName}:`, error.message);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async runTenantMigrations(schemaName: string) {
    const tenantConfig = getTenantConnectionConfig(schemaName);
    const tenantDataSource = new DataSource(tenantConfig as any);
    
    try {
      await tenantDataSource.initialize();
      
      // This will create all tables in the tenant schema
      await tenantDataSource.synchronize();
      
      console.log(`Migrations completed for schema ${schemaName}`);
    } catch (error) {
      console.error(`Error running migrations for ${schemaName}:`, error.message);
      throw error;
    } finally {
      if (tenantDataSource.isInitialized) {
        await tenantDataSource.destroy();
      }
    }
  }

  async findBySubdomain(subdomain: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { subdomain } });
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantRepository.find({ where: { isActive: true } });
  }

  async deleteTenant(id: string): Promise<void> {
    const tenant = await this.findById(id);
    if (!tenant) {
      throw new ConflictException('Tenant not found');
    }

    // Drop the schema
    await this.dropTenantSchema(tenant.schemaName);
    
    // Delete tenant record
    await this.tenantRepository.delete(id);
  }

  private async dropTenantSchema(schemaName: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
      await queryRunner.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
      console.log(`Schema ${schemaName} dropped successfully`);
    } catch (error) {
      console.error(`Error dropping schema ${schemaName}:`, error.message);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
