import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';
import { ProductsService } from './products.service';
import type { RequestWithTenant } from '../../../tenancy/tenant.middleware';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}

class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;
}

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Req() req: RequestWithTenant, @Body() dto: CreateProductDto) {
    return this.productsService.create(req.tenantSchema!, dto);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.productsService.findAll(req.tenantSchema!);
  }

  @Get('stats')
  getStats(@Req() req: RequestWithTenant) {
    return this.productsService.getProductStats(req.tenantSchema!);
  }

  @Get(':id')
  findOne(@Req() req: RequestWithTenant, @Param('id') id: string) {
    return this.productsService.findOne(req.tenantSchema!, id);
  }

  @Put(':id')
  update(
    @Req() req: RequestWithTenant,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto
  ) {
    return this.productsService.update(req.tenantSchema!, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: RequestWithTenant, @Param('id') id: string) {
    return this.productsService.remove(req.tenantSchema!, id);
  }
}