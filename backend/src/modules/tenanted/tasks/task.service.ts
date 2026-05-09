import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TENANT_DATASOURCE } from '~/tenancy/tenancy.constants';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './entities/task-status.enum';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private readonly repo: Repository<Task>;

  constructor(@Inject(TENANT_DATASOURCE) private readonly ds: DataSource) {
    this.repo = this.ds.getRepository(Task);
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create({
      title: dto.title,
      description: dto.description ?? null,
      status: dto.status ?? TaskStatus.TODO,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
    });
    return this.repo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id "${id}" not found`);
    }
    return task;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) {
      task.description = dto.description || null;
    }
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.dueDate !== undefined) {
      task.dueDate = dto.dueDate ? new Date(dto.dueDate) : null;
    }
    return this.repo.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.repo.remove(task);
  }
}
