import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MembershipService } from '../services/membership.service';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { UpdateMembershipRoleDto } from '../dto/update-membership-role.dto';

@Controller('memberships')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  create(@Body() dto: CreateMembershipDto) {
    return this.membershipService.create(dto);
  }

  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.membershipService.findByTenantId(tenantId);
  }

  @Get('identity/:identityId')
  findByIdentity(@Param('identityId') identityId: string) {
    return this.membershipService.findByIdentityId(identityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipService.findById(id);
  }

  @Patch(':id')
  updateRole(@Param('id') id: string, @Body() dto: UpdateMembershipRoleDto) {
    return this.membershipService.updateRole(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.membershipService.remove(id);
    return { message: 'Membership removed' };
  }
}
