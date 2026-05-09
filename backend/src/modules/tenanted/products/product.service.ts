import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TENANT_DATASOURCE } from '~/tenancy/tenancy.constants';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly repo: Repository<Product>;

  constructor(@Inject(TENANT_DATASOURCE) private readonly ds: DataSource) {
    this.repo = this.ds.getRepository(Product);
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.repo.create(productData);
    return this.repo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.repo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    const result = await this.repo.update(id, productData);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
  }

  async getProductStats() {
    const [products, total] = await this.repo.findAndCount();
    const totalValue = products.reduce((sum, p) => sum + Number(p.price) * p.stock, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    return {
      totalProducts: total,
      totalStock,
      totalValue: totalValue.toFixed(2),
    };
  }
}
