import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TenantConnectionService } from '~/tenancy/tenant-connection.service';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private tenantConnectionService: TenantConnectionService,
  ) {}

  async register(
    schemaName: string,
    tenantId: string,
    email: string,
    password: string,
    name: string,
  ) {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({
      email,
      password: hashedPassword,
      name,
    });

    await userRepo.save(user);
    return this.generateToken(user, tenantId, schemaName);
  }

  async login(schemaName: string, tenantId: string, email: string, password: string) {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user, tenantId, schemaName);
  }

  private generateToken(user: User, tenantId: string, schemaName: string) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      tenantId,
      schemaName 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async getUserProfile(schemaName: string, userId: string) {
    const connection = await this.tenantConnectionService.getTenantConnection(schemaName);
    const userRepo = connection.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }
}