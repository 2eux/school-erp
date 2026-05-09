import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async create(data: Partial<Product>): Promise<Product> {
    return this.productRepo.saveNew(data);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.findAll({ createdAt: 'DESC' } as any);
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepo.findByIdOrFail(id);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const product = await this.productRepo.findByIdOrFail(id);
    Object.assign(product, productData);
    return this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepo.findByIdOrFail(id);
    await this.productRepo.remove(product);
  }

  async getProductStats() {
    const [products, total] = await this.productRepo.findAndCount();
    const totalValue = products.reduce(
      (sum, p) => sum + Number(p.price) * p.stock,
      0,
    );
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    return {
      totalProducts: total,
      totalStock,
      totalValue: totalValue.toFixed(2),
    };
  }
}
