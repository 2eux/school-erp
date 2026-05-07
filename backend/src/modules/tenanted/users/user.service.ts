import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TenantConnectionService } from '~/tenancy/tenant-connection.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private tenantConnectionService: TenantConnectionService) {}

  async findAll(schemaName: string, filterUserDto: FilterUserDto): Promise<User[]> {
    this.logger.log(`${this.findAll.name} Service Called`);

    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const { id, firstName, lastName, email, role } = filterUserDto;
    const where: any = {};
    if (id) where.id = id;
    if (firstName) where.firstName = firstName;
    if (lastName) where.lastName = lastName;
    if (email) where.email = email;
    if (role) where.role = role;

    return userRepo.find({ where });
  }

  async findById(schemaName: string, id: string): Promise<User> {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(schemaName: string, dto: CreateUserDto): Promise<User> {
    this.logger.log(`${this.create.name} Service Called`);

    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const existing = await userRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = userRepo.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      role: dto.role ?? 'user',
      status: dto.status ?? 'active',
    });

    await userRepo.save(user);
    return this.findById(schemaName, user.id);
  }

  async update(schemaName: string, id: string, dto: UpdateUserDto): Promise<User> {
    this.logger.log(`${this.update.name} Service Called`);

    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const user = await this.findById(schemaName, id);
    Object.assign(user, dto);
    await userRepo.save(user);
    return this.findById(schemaName, id);
  }

  async remove(schemaName: string, id: string): Promise<void> {
    this.logger.log(`${this.remove.name} Service Called`);

    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    await this.findById(schemaName, id);
    await userRepo.delete(id);
  }

  async getProfile(schemaName: string, userId: string) {
    const user = await this.findById(schemaName, userId);
    const { password, ...result } = user;
    return result;
  }
}
