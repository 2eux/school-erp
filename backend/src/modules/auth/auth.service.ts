import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  private stripPassword(user: User): Omit<User, 'passwordHash'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async register(dto: RegisterDto): Promise<Omit<User, 'passwordHash'>> {
    const existing = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = this.userRepository.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
      role: UserRole.STAFF,
    });

    const saved = await this.userRepository.save(user);
    return this.stripPassword(saved);
  }

  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; user: Omit<User, 'passwordHash'> }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, user: this.stripPassword(user) };
  }

  async findById(id: string): Promise<Omit<User, 'passwordHash'> | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) return null;
    return this.stripPassword(user);
  }

  async seedAdmin(): Promise<void> {
    const existing = await this.userRepository.findOne({
      where: { email: 'admin@school.edu' },
    });
    if (existing) return;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash('Admin123!', salt);

    const admin = this.userRepository.create({
      email: 'admin@school.edu',
      passwordHash,
      name: 'System Admin',
      role: UserRole.SUPER_ADMIN,
    });

    await this.userRepository.save(admin);
    console.log('✅ Default admin user created: admin@school.edu / Admin123!');
  }
}
