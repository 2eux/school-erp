import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
  ) {}

  async findById(id: string): Promise<Task | null> {
    return this.repo.findOne({ where: { id } });
  }

  async findAllOrdered(): Promise<Task[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async save(entity: Task): Promise<Task> {
    return this.repo.save(entity);
  }

  async remove(entity: Task): Promise<void> {
    await this.repo.remove(entity);
  }

  create(partial: Partial<Task>): Task {
    return this.repo.create(partial);
  }
}
