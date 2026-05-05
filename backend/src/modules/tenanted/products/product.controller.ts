import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type { RequestWithTenant } from '../../../tenancy/tenant.middleware';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.productService.findAll(req.tenantSchema!);
  }

  @Get('stats')
  getStats(@Req() req: RequestWithTenant) {
    return this.productService.getProductStats(req.tenantSchema!);
  }

  @Get(':id')
  findOne(@Req() req: RequestWithTenant, @Param('id', ParseUUIDPipe) id: string) {
    return this.productService.findOne(req.tenantSchema!, id);
  }

  @Post()
  create(@Req() req: RequestWithTenant, @Body() dto: CreateProductDto) {
    return this.productService.create(req.tenantSchema!, dto);
  }

  @Put(':id')
  update(
    @Req() req: RequestWithTenant,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto
  ) {
    return this.productService.update(req.tenantSchema!, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: RequestWithTenant, @Param('id', ParseUUIDPipe) id: string) {
    return this.productService.remove(req.tenantSchema!, id);
  }
}
