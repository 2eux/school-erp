import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RequestWithTenant } from '~/tenancy/tenant.middleware';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    return this.authService.getMe(req.user.schemaName, req.user.userId);
  }
}
