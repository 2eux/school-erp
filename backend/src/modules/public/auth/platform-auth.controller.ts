import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { PlatformAuthService } from './platform-auth.service';
import { PlatformRegisterDto } from './dto/platform-register.dto';
import { PlatformLoginDto } from './dto/platform-login.dto';
import { PlatformJwtAuthGuard } from '../../../common/guards/platform-jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@Controller('platform/auth')
export class PlatformAuthController {
  constructor(private readonly platformAuthService: PlatformAuthService) {}

  @Post('register')
  register(@Body() dto: PlatformRegisterDto) {
    return this.platformAuthService.register(dto);
  }

  @Post('login')
  login(@Body() dto: PlatformLoginDto) {
    return this.platformAuthService.login(dto);
  }

  @Get('me')
  @UseGuards(PlatformJwtAuthGuard)
  getProfile(@CurrentUser() user: any) {
    return this.platformAuthService.getProfile(user.userId);
  }
}
