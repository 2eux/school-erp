import { Expose } from 'class-transformer'
import { PlatformRole } from '../enums/platform-role.enum'

export class UserDto {
  @Expose()
  id: string

  @Expose()
  email: string

  @Expose()
  platformRole: PlatformRole
}