import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { RequestWithTenant } from '~/tenancy/tenant.middleware';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Req() req: RequestWithTenant,
    @Query() filterUserDto: FilterUserDto,
  ) {
    const users = await this.userService.findAll(req.tenantSchema!, filterUserDto);

    return {
      success: true,
      statusCode: 200,
      message: 'List of users',
      data: users,
    };
  }

  @Post()
  async create(
    @Req() req: RequestWithTenant,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.userService.create(req.tenantSchema!, createUserDto);

    return {
      success: true,
      statusCode: 201,
      message: `User created. ID: ${user.id}`,
      data: user,
    };
  }

  @Get(':id')
  async findOne(
    @Req() req: RequestWithTenant,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const user = await this.userService.findById(req.tenantSchema!, id);

    return {
      success: true,
      statusCode: 200,
      message: `User found. ID: ${user.id}`,
      data: user,
    };
  }

  @Patch(':id')
  async update(
    @Req() req: RequestWithTenant,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(req.tenantSchema!, id, updateUserDto);

    return {
      success: true,
      statusCode: 200,
      message: `User updated. ID: ${user.id}`,
      data: user,
    };
  }

  @Delete(':id')
  async remove(
    @Req() req: RequestWithTenant,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.userService.remove(req.tenantSchema!, id);

    return {
      success: true,
      statusCode: 200,
      message: `User deleted. ID: ${id}`,
    };
  }
}
