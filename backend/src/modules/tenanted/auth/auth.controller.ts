import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import type { RequestWithTenant } from '../../../tenancy/tenant.middleware';
import { JwtAuthGuard } from './jwt-auth.guard';

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Req() req: RequestWithTenant, @Body() dto: RegisterDto) {
    return this.authService.register(
      req.tenantSchema!,
      req.tenantId!,
      dto.email,
      dto.password,
      dto.firstName,
      dto.lastName,
    );
  }

  @Post('login')
  async login(@Req() req: RequestWithTenant, @Body() dto: LoginDto) {
    return this.authService.login(
      req.tenantSchema!,
      req.tenantId!,
      dto.email,
      dto.password
    );
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return this.authService.getUserProfile(req.user.schemaName, req.user.userId);
  }
}