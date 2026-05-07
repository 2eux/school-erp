import { Module } from '@nestjs/common';
import { TenantModule } from '../../public/tenants/tenant.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TenantModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class TenantUserModule {}
