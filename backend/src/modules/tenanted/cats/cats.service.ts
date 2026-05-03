import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catsRepo: Repository<Cat>,
  ) {}

  async create(dto: CreateCatDto): Promise<Cat> {
    const cat = this.catsRepo.create({
      name: dto.name,
      breed: dto.breed ?? null,
      age: dto.age ?? null,
    });
    return this.catsRepo.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catsRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catsRepo.findOne({ where: { id } });
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
    return this.catsRepo.save(cat);
  }

  async remove(id: string): Promise<void> {
    const cat = await this.findOne(id);
    await this.catsRepo.remove(cat);
  }
}
