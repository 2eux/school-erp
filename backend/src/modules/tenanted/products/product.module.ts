import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TenantModule } from '../../public/tenants/tenant.module';

@Module({
  imports: [TenantModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
