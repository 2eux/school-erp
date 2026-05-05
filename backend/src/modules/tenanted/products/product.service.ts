import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantConnectionService } from '../../../tenancy/tenant-connection.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private tenantConnectionService: TenantConnectionService) {}

  async create(schemaName: string, productData: Partial<Product>): Promise<Product> {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const productRepo = connection.getRepository(Product);

    const product = productRepo.create(productData);
    return productRepo.save(product);
  }

  async findAll(schemaName: string): Promise<Product[]> {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const productRepo = connection.getRepository(Product);

    return productRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(schemaName: string, id: string): Promise<Product> {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const productRepo = connection.getRepository(Product);

    const product = await productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(schemaName: string, id: string, productData: Partial<Product>): Promise<Product> {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const productRepo = connection.getRepository(Product);

    const result = await productRepo.update(id, productData);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }

    return this.findOne(schemaName, id);
  }

  async remove(schemaName: string, id: string): Promise<void> {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const productRepo = connection.getRepository(Product);

    const result = await productRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async getProductStats(schemaName: string) {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const productRepo = connection.getRepository(Product);

    const [products, total] = await productRepo.findAndCount();
    const totalValue = products.reduce((sum, p) => sum + Number(p.price) * p.stock, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    return {
      totalProducts: total,
      totalStock,
      totalValue: totalValue.toFixed(2),
    };
  }
}
