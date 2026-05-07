import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MembershipService } from '../services/membership.service';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { UpdateMembershipRoleDto } from '../dto/update-membership-role.dto';
import { PlatformJwtAuthGuard } from '~/common/guards/platform-jwt-auth.guard';
import { RolesGuard } from '~/common/guards/roles.guard';
import { Roles } from '~/common/decorators/roles.decorator';
import { PlatformRole } from '~/platform/users/enums/platform-role.enum';

@Controller('memberships')
@UseGuards(PlatformJwtAuthGuard)
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  create(@Body() dto: CreateMembershipDto) {
    return this.membershipService.create(dto);
  }

  @Get('tenant/:tenantId')
  findByTenant(@Param('tenantId') tenantId: string) {
    return this.membershipService.findByTenantId(tenantId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.membershipService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipService.findById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  updateRole(@Param('id') id: string, @Body() dto: UpdateMembershipRoleDto) {
    return this.membershipService.updateRole(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  async remove(@Param('id') id: string) {
    await this.membershipService.remove(id);
    return { message: 'Membership removed' };
  }
}
