/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { User } from './user';

@Entity({ name: 'd_log' })
export class Log extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 20 })
  @MinLength(3)
  @MaxLength(20)
  action: string;

  @Column({ length: 150 })
  @MaxLength(150)
  @MinLength(10)
  description: string;

  // 1 log | 2 erreur
  @Column()
  type: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.logs)
  user: User;
}
