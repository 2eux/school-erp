import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { Membership } from '~/platform/memberships/entities/membership.entity';
import { MembershipRole } from '~/platform/memberships/enums/membership-role.enum';
import { Key } from '~/common/enums/keys.enum';
import { getTenantConnectionConfig } from '../../../../database/database.config';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { PlatformRole } from '~/platform/users/enums/platform-role.enum';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  /**
   * Creates a tenant. If ownerId is provided the user automatically
   * receives an OWNER membership for the new tenant.
   */
  async createTenant(dto: CreateTenantDto, ownerId?: string): Promise<Tenant> {
    const { name, slug, domain } = dto;
    const existing = await this.tenantRepository.findOne({ where: { slug } });
    if (existing) {
      throw new ConflictException('Tenant slug already exists');
    }

    const schemaName = `${Key.TenantSchemaPrefix}${slug.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    const tenant = this.tenantRepository.create({ name, slug, domain, schemaName });
    await this.tenantRepository.save(tenant);

    await this.createTenantSchema(schemaName);
    await this.runTenantMigrations(schemaName);

    if (ownerId) {
      const membership = this.membershipRepository.create({
        userId: ownerId,
        tenantId: tenant.id,
        role: MembershipRole.OWNER,
      });
      await this.membershipRepository.save(membership);
    }

    return tenant;
  }

  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  /** Returns only tenants where the user has any membership. */
  async getTenantsByUser(userId: string): Promise<Tenant[]> {
    const memberships = await this.membershipRepository.find({
      where: { userId },
    });
    const tenantIds = memberships.map((m) => m.tenantId);
    if (!tenantIds.length) return [];
    return this.tenantRepository.find({ where: { id: In(tenantIds) } });
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async findBySlug(slug: string): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { slug } });
  }

  /**
   * Returns a tenant only if the requester is a SUPER_ADMIN or has any
   * membership in that tenant.
   */
  async findByIdForUser(
    id: string,
    userId: string,
    role: PlatformRole,
  ): Promise<Tenant> {
    const tenant = await this.findById(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    if (role === PlatformRole.SUPER_ADMIN) return tenant;

    const membership = await this.membershipRepository.findOne({
      where: { tenantId: id, userId },
    });
    if (!membership) {
      throw new ForbiddenException('Access denied');
    }
    return tenant;
  }

  async updateTenant(
    id: string,
    dto: UpdateTenantDto,
    requesterId: string,
    requesterRole: PlatformRole,
  ): Promise<Tenant> {
    const tenant = await this.findById(id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    if (requesterRole !== PlatformRole.SUPER_ADMIN) {
      const membership = await this.membershipRepository.findOne({
        where: { tenantId: id, userId: requesterId, role: MembershipRole.OWNER },
      });
      if (!membership) {
        throw new ForbiddenException('Only the tenant owner or a super admin can update this tenant');
      }
    }

    Object.assign(tenant, dto);
    return this.tenantRepository.save(tenant);
  }

  async deleteTenant(id: string): Promise<void> {
    const tenant = await this.findById(id);
    if (!tenant) {
      throw new ConflictException('Tenant not found');
    }

    await this.dropTenantSchema(tenant.schemaName);
    await this.tenantRepository.delete(id);
  }

  private async createTenantSchema(schemaName: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
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
