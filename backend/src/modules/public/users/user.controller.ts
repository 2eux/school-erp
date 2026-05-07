import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatePlatformUserDto } from './dto/create-platform-user.dto';
import { PlatformJwtAuthGuard } from '~/common/guards/platform-jwt-auth.guard';
import { RolesGuard } from '~/common/guards/roles.guard';
import { Roles } from '~/common/decorators/roles.decorator';
import { CurrentUser } from '~/common/decorators/current-user.decorator';
import { PlatformRole } from './enums/platform-role.enum';

interface PlatformUser {
  userId: string;
  email: string;
  platformRole: PlatformRole;
}

@Controller('platform/users')
@UseGuards(PlatformJwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  create(@Body() dto: CreatePlatformUserDto) {
    return this.userService.createPlatformUser(dto);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: PlatformUser,
  ) {
    if (user.platformRole !== PlatformRole.SUPER_ADMIN && user.userId !== id) {
      throw new ForbiddenException('Access denied');
    }
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: PlatformUser,
  ) {
    return this.userService.update(user.userId, user.platformRole, id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(PlatformRole.SUPER_ADMIN)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.remove(id);
    return { message: 'User deleted successfully' };
  }
}

