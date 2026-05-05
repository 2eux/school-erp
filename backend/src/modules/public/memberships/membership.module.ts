import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { MembershipService } from './services/membership.service';
import { MembershipController } from './controllers/membership.controller';
import { TenantModule } from '../tenants/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Membership]), TenantModule],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
