import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TENANT_DATASOURCE } from '~/tenancy/tenancy.constants';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  private readonly repo: Repository<Cat>;

  constructor(@Inject(TENANT_DATASOURCE) private readonly ds: DataSource) {
    this.repo = this.ds.getRepository(Cat);
  }

  async create(dto: CreateCatDto): Promise<Cat> {
    const cat = this.repo.create({
      name: dto.name,
      breed: dto.breed ?? null,
      age: dto.age ?? null,
    });
    return this.repo.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.repo.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Cat with id "${id}" not found`);
    }
    return cat;
  }

  async update(id: string, dto: UpdateCatDto): Promise<Cat> {
    const cat = await this.findOne(id);
    if (dto.name !== undefined) cat.name = dto.name;
    if (dto.breed !== undefined) cat.breed = dto.breed || null;
    if (dto.age !== undefined) cat.age = dto.age ?? null;
    return this.repo.save(cat);
  }

  async remove(id: string): Promise<void> {
    const cat = await this.findOne(id);
    await this.repo.remove(cat);
  }
}
