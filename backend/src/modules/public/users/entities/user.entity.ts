import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { PlatformRole } from '../enums/platform-role.enum';
import { Expose } from 'class-transformer';
import { Membership } from '../../memberships/entities/membership.entity';
import type { Tenant } from '../../tenants/entities/tenant.entity';

@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  /** Never returned by default queries — use { select: [..., 'password'] } explicitly */
  @Column({ select: false })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  /** Join of first + last name — computed, not stored */
  fullName: string;

  // for testing: will be removed later
  @Expose()
  get name(): string {
    const first = this.firstName?.trim() ?? '';
    const last = this.lastName?.trim() ?? '';
    return [first, last].filter(Boolean).join(' ');
  }

  @Column({
    type: 'enum',
    enum: PlatformRole,
    default: PlatformRole.USER,
    name: 'platform_role',
  })
  platformRole: PlatformRole;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships: Membership[];

  @AfterLoad()
  @BeforeInsert()
  @BeforeUpdate()
  syncFullName(): void {
    const parts = [this.firstName, this.lastName].filter(
      (p) => p != null && String(p).trim() !== '',
    );
    this.fullName = parts.join(' ');
  }
}
