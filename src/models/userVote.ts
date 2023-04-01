/* eslint-disable prettier/prettier */

import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from './user';
import { Article } from './artciles';

@Entity({ name: 'd_userVote' })
export class UserVotes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  uv_vote: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Article, (article) => article.votes, { 
    onDelete: 'CASCADE' 
  })
  article: Article;
}
