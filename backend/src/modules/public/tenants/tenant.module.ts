import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { Membership } from '../memberships/entities/membership.entity';
import { TenantService } from './services/tenant.service';
import { TenantController } from './controllers/tenant.controller';
import { TenantConnectionService } from '../../../tenancy/tenant-connection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Membership])],
  controllers: [TenantController],
  providers: [TenantService, TenantConnectionService],
  exports: [TenantService, TenantConnectionService],
})
export class TenantModule {}