import {
  Inject,
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TENANT_DATASOURCE } from '~/tenancy/tenancy.constants';
import type { RequestWithTenant } from '~/tenancy/tenant.middleware';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly userRepo: Repository<User>;

  constructor(
    @Inject(TENANT_DATASOURCE) ds: DataSource,
    @Inject(REQUEST) private readonly request: RequestWithTenant,
    private readonly jwtService: JwtService,
  ) {
    this.userRepo = ds.getRepository(User);
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await this.userRepo.save(user);
    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user);
  }

  async getMe(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      tenantId: this.request.tenantId,
      schemaName: this.request.tenantSchema,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
      },
    };
  }
}
