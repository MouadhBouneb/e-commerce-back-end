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
import { Article } from './artciles';

@Entity({ name: 'd_articleCouleur' })
export class ArticleCouleurs extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 20 })
  @MinLength(6)
  @MaxLength(20)
  ac_codeCss: string;

  @Column({ default: true })
  ac_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Article, (article) => article.couleurs, { 
    onDelete: 'CASCADE' 
  })
  article: Article;
}
