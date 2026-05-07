import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { UpdateMembershipRoleDto } from '../dto/update-membership-role.dto';
import { TenantService } from '~/platform/tenants/services/tenant.service';
import { MembershipRole } from '../enums/membership-role.enum';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    private readonly tenantService: TenantService,
  ) {}

  async create(dto: CreateMembershipDto): Promise<Membership> {
    const tenant = await this.tenantService.findById(dto.tenantId);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    const existing = await this.membershipRepository.findOne({
      where: { userId: dto.userId, tenantId: dto.tenantId },
    });
    if (existing) {
      throw new ConflictException('Membership already exists for this user and tenant');
    }

    const membership = this.membershipRepository.create({
      userId: dto.userId,
      tenantId: dto.tenantId,
      role: dto.role ?? MembershipRole.MEMBER,
    });
    return this.membershipRepository.save(membership);
  }

  async findById(id: string): Promise<Membership> {
    const m = await this.membershipRepository.findOne({ where: { id } });
    if (!m) {
      throw new NotFoundException('Membership not found');
    }
    return m;
  }

  async findByTenantId(tenantId: string): Promise<Membership[]> {
    const tenant = await this.tenantService.findById(tenantId);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return this.membershipRepository.find({
      where: { tenantId },
      order: { createdAt: 'ASC' },
    });
  }

  async findByUserId(userId: string): Promise<Membership[]> {
    return this.membershipRepository.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
  }

  async updateRole(id: string, dto: UpdateMembershipRoleDto): Promise<Membership> {
    const membership = await this.findById(id);
    membership.role = dto.role;
    return this.membershipRepository.save(membership);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.membershipRepository.delete(id);
  }
}
