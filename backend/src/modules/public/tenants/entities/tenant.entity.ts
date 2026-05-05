import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TenantStatus } from '../enums/tenant-status.enum';

@Entity('tenants', { schema: 'public' })
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Acme Secondary School
  @Column({ unique: true })
  name: string;

  // 001_acme (alternative to subdomain)
  @Column({ unique: true })
  slug: string;

  // tenant_001_acme (generated)
  @Column({ name: 'schema_name', unique: true })
  schemaName: string;

  // acme.myapp:com or erp.acme.com
  @Column({ nullable: true, unique: true })
  domain: string;

  @Column({ type: 'enum', enum: TenantStatus, default: TenantStatus.ACTIVE })
  status: TenantStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}