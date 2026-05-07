import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatePlatformUserDto } from './dto/create-platform-user.dto';
import { PlatformRole } from './enums/platform-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createPlatformUser(dto: CreatePlatformUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      platformRole: dto.platformRole ?? PlatformRole.USER,
      isActive: dto.isActive ?? true,
    });
    await this.userRepository.save(user);
    return this.findById(user.id);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(
    requesterId: string,
    requesterRole: PlatformRole,
    targetId: string,
    dto: UpdateUserDto,
  ): Promise<User> {
    const isSelf = requesterId === targetId;
    const isSuperAdmin = requesterRole === PlatformRole.SUPER_ADMIN;

    if (!isSelf && !isSuperAdmin) {
      throw new ForbiddenException('You can only update your own profile');
    }

    // Only super admin can change platformRole or isActive
    if (!isSuperAdmin) {
      delete dto.platformRole;
      delete dto.isActive;
    }

    const user = await this.findById(targetId);
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }
}

