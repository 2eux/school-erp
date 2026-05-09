import {
  Injectable,
  Logger,
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
import { TenantConnectionService } from '~/tenancy/tenant-connection.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { PlatformRole } from '~/platform/users/enums/platform-role.enum';
import { RequestContextDto } from '~/common/dto/request-context.dto';

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  constructor(
    @InjectRepository(Tenant)
    private tenantRepository: Repository<Tenant>,
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectDataSource()
    private dataSource: DataSource,
    private tenantConnectionService: TenantConnectionService,
  ) {}

  /**
   * Creates a tenant. If ownerId is provided the user automatically
   * receives an OWNER membership for the new tenant.
   */
  async createTenant(
    ctx: RequestContextDto,
    dto: CreateTenantDto,
  ): Promise<Tenant> {
    const { user } = ctx;
    const ownerId = user?.role === PlatformRole.SUPER_ADMIN ? undefined : user?.id ?? '';
    
    const existing = await this.tenantRepository.findOne({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('Tenant slug already exists');
    }

    const schemaName = `${Key.TenantSchemaPrefix}${dto.slug.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    const tenant = this.tenantRepository.create({ ...dto, schemaName });
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

  async getAllTenants(ctx: RequestContextDto): Promise<Tenant[]> {
    if (ctx.user?.role !== PlatformRole.SUPER_ADMIN) {
      return this.getTenantsByUser(ctx, ctx.user?.id ?? '');
    }

    return this.tenantRepository.find();
  }

  /** Returns only tenants where the user has any membership. */
  async getTenantsByUser(_ctx: RequestContextDto, userId: string): Promise<Tenant[]> {
    const memberships = await this.membershipRepository.find({
      where: { userId },
    });
    const tenantIds = memberships.map((m) => m.tenantId);
    if (!tenantIds.length) return [];
    return this.tenantRepository.find({ where: { id: In(tenantIds) } });
  }

  async findById(ctx: RequestContextDto, id: string): Promise<Tenant | null> {
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
    ctx: RequestContextDto,
    id: string,
  ): Promise<Tenant> {
    const tenant = await this.findById(ctx, id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    if (ctx.user?.role === PlatformRole.SUPER_ADMIN) return tenant;

    const membership = await this.membershipRepository.findOne({
      where: { tenantId: id, userId: ctx.user?.id ?? '' },
    });
    if (!membership) {
      throw new ForbiddenException('Access denied');
    }
    return tenant;
  }

  async updateTenant(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateTenantDto,
  ): Promise<Tenant> {
    const { user } = ctx;
    const tenant = await this.findById(ctx, id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    if (user?.role !== PlatformRole.SUPER_ADMIN) {
      const membership = await this.membershipRepository.findOne({
        where: { tenantId: id, userId: user?.id ?? '', role: MembershipRole.OWNER },
      });
      if (!membership) {
        throw new ForbiddenException('Only the tenant owner or a super admin can update this tenant');
      }
    }

    Object.assign(tenant, dto);
    return this.tenantRepository.save(tenant);
  }

  async deleteTenant(ctx: RequestContextDto, id: string): Promise<void> {
    const tenant = await this.findById(ctx, id);
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
      const quoted = this.quoteIdentifier(schemaName);
      await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${quoted}`);
      this.logger.log(`Schema ${schemaName} created successfully`);
    } catch (error) {
      this.logger.error(`Error creating schema ${schemaName}: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async runTenantMigrations(schemaName: string) {
    // Always synchronize when setting up a new tenant schema,
    // regardless of DB_SYNC. In production, replace with explicit migrations.
    await this.tenantConnectionService.synchronizeSchema(schemaName);
  }

  private async dropTenantSchema(schemaName: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const quoted = this.quoteIdentifier(schemaName);
      await queryRunner.query(`DROP SCHEMA IF EXISTS ${quoted} CASCADE`);
      this.logger.log(`Schema ${schemaName} dropped successfully`);
    } catch (error) {
      this.logger.error(`Error dropping schema ${schemaName}: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private quoteIdentifier(identifier: string): string {
    return `"${identifier.replace(/"/g, '""')}"`;
  }
}
