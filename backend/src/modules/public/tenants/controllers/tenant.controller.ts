import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TenantService } from '../services/tenant.service';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { UpdateTenantDto } from '../dto/update-tenant.dto';

@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Get()
  async findAll() {
    return this.tenantService.getAllTenants();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tenantService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.tenantService.createTenant(dto);
  }
  
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTenantDto,
  ) {
    return this.tenantService.updateTenant(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tenantService.deleteTenant(id);
    return { message: 'Tenant deleted successfully' };
  }
}
