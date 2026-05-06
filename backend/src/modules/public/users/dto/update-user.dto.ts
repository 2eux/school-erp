import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { PlatformRole } from '../enums/platform-role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(PlatformRole)
  platformRole?: PlatformRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
