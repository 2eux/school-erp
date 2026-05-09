import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TENANT_DATASOURCE } from '~/tenancy/tenancy.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly repo: Repository<User>;

  constructor(@Inject(TENANT_DATASOURCE) private readonly ds: DataSource) {
    this.repo = this.ds.getRepository(User);
  }

  async findAll(filterUserDto: FilterUserDto): Promise<User[]> {
    this.logger.log(`${this.findAll.name} Service Called`);

    const { id, firstName, lastName, email, role } = filterUserDto;
    const where: any = {};
    if (id) where.id = id;
    if (firstName) where.firstName = firstName;
    if (lastName) where.lastName = lastName;
    if (email) where.email = email;
    if (role) where.role = role;

    return this.repo.find({ where });
  }

  async findById(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    this.logger.log(`${this.create.name} Service Called`);

    const existing = await this.repo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.repo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      role: dto.role ?? 'user',
      status: dto.status ?? 'active',
    });

    await this.repo.save(user);
    return this.findById(user.id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    this.logger.log(`${this.update.name} Service Called`);

    const user = await this.findById(id);
    Object.assign(user, dto);
    await this.repo.save(user);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`${this.remove.name} Service Called`);

    await this.findById(id);
    await this.repo.delete(id);
  }

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    const { password, ...result } = user;
    return result;
  }
}
