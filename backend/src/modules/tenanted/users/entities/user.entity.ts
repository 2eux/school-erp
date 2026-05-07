import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  fullName: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  @AfterLoad()
  @BeforeInsert()
  @BeforeUpdate()
  syncFullName(): void {
    const parts = [this.firstName, this.lastName].filter(
      (p) => p != null && String(p).trim() !== '',
    );
    this.fullName = parts.join(' ');
  }

  
  @AfterInsert()
  logInsert() {
    console.log(`User Inserted #ID: ${this.id}`)
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User Updated #ID: ${this.id}`)
  }

  @AfterRemove()
  logRemove() {
    console.log(`User Removed`)
  }
}
