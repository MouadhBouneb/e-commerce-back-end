/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { MinLength, MaxLength } from 'class-validator';
import { Article } from './artciles';
import { Document } from './documents';

@Entity({ name: 'd_file' })
export class FileUploead extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 150 })
  @MinLength(20)
  @MaxLength(150)
  f_path: string;

  @Column({ length: 150 })
  @MinLength(20)
  @MaxLength(150)
  f_name: string;

  @Column({ length: 20 })
  @MaxLength(20)
  @MinLength(2)
  f_typeFile: string;

  @Column({ length: 10 })
  @MaxLength(10)
  @MinLength(2)
  f_extension: string;

  @Column({ default: true })
  f_active: boolean;

  @Column({ default: false })
  f_principal: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Article, (article) => article.images)
  article: Article;

  @OneToOne(() => Document, (doc) => doc.file)
  document: Document;


}
