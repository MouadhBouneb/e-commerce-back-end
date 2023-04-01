/* eslint-disable prettier/prettier */

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { IsString, MaxLength, MinLength, IsEmail } from 'class-validator';
import { Log } from './Log';
import { Document } from './documents';
import { UserVotes } from './userVote';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  fullName: string;

  @Column({ length: 150, unique: true })
  @MinLength(20)
  @MaxLength(150)
  @IsEmail()
  email: string;

  @Column({ length: 150, default: 'USER' })
  @MinLength(3)
  @MaxLength(150)
  @IsString()
  role: string;

  @Column({ length: 150 })
  @MinLength(3)
  @MaxLength(150)
  @IsString()
  adresse: string;

  @Column({ length: 15 })
  @MinLength(8)
  @MaxLength(15)
  @IsString()
  tel: string;

  @Column({ default: false })
  vip: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Log, (log) => log.user)
  logs: Array<Log>;

  @OneToMany(() => Document, (doc) => doc.user)
  documents: Array<Document>;

  @OneToMany(() => UserVotes, (userVote) => userVote.user)
  votes: Array<UserVotes>;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
