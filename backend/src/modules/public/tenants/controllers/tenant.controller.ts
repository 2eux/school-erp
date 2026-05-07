import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { PlatformJwtAuthGuard } from '~/common/guards/platform-jwt-auth.guard';
import { RolesGuard } from '~/common/guards/roles.guard';
import { Roles } from '~/common/decorators/roles.decorator';
import { CurrentUser } from '~/common/decorators/current-user.decorator';
import { PlatformRole } from '~/platform/users/enums/platform-role.enum';
import { RequestContext } from '~/common/decorators/request-context.decorator';
import { RequestContextDto } from '~/common/dto/request-context.dto';

interface PlatformUser {
  userId: string;
  email: string;
  platformRole: PlatformRole;
}

@Controller('tenants')
@UseGuards(PlatformJwtAuthGuard)
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get()
  async findAll(
    @CurrentUser() user: PlatformUser,
    @RequestContext() ctx: RequestContextDto,
  ) {
    console.log("Request Context:", ctx);
    if (user.platformRole === PlatformRole.SUPER_ADMIN) {
      return this.tenantService.getAllTenants();
    }
    return this.tenantService.getTenantsByUser(user.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: PlatformUser,
  ) {
    return this.tenantService.findByIdForUser(id, user.userId, user.platformRole);
  }

  @Post()
  async create(@Body() dto: CreateTenantDto, @CurrentUser() user: PlatformUser) {
    const ownerId =
      user.platformRole === PlatformRole.SUPER_ADMIN ? undefined : user.userId;
    return this.tenantService.createTenant(dto, ownerId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTenantDto,
    @CurrentUser() user: PlatformUser,
  ) {
    return this.tenantService.updateTenant(id, dto, user.userId, user.platformRole);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.tenantService.deleteTenant(id);
    return { message: 'Tenant deleted successfully' };
  }
}
