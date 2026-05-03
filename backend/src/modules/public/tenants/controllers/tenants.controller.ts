import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { TenantService } from '../services/tenants.service';
import { IsString, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';

class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-z0-9_]+$/, {
    message: 'Subdomain must contain only lowercase letters, numbers, and underscores'
  })
  subdomain: string;
}

@Controller('tenants')
export class TenantController {
  constructor(private tenantService: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.tenantService.createTenant(dto.name, dto.subdomain);
  }

  @Get()
  async findAll() {
    return this.tenantService.getAllTenants();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tenantService.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tenantService.deleteTenant(id);
    return { message: 'Tenant deleted successfully' };
  }
}