import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TenantModule } from '../../public/tenants/tenants.module';

@Module({
  imports: [TenantModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}