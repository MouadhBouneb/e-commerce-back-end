/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Categorie } from './categories';
import { ArticleCouleurs } from './articleCouleurs';
import { FileUploead } from './files';
import { DocumentDetail } from './documentDetail';
import { UserVotes } from './userVote';

@Entity({ name: 'd_article' })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 20, nullable: true, unique: true })
  a_code: string;

  @Column({ length: 20, nullable: true, unique: true })
  a_ref: string;

  @Column({ length: 50 })
  a_desgination: string;

  @Column({ length: 150, nullable: true })
  a_desciption: string;

  @Column()
  @IsNumber()
  a_prix: number;

  @Column()
  @IsNumber()
  a_tva: number;

  @Column({ nullable: true })
  @IsNumber()
  a_remise: number;

  @Column()
  @IsNumber()
  a_qts: number;

  @Column({ default: true })
  a_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Categorie, (categorie) => categorie.article, { 
    onDelete: 'CASCADE' 
  })
  categorie: Categorie;

  @OneToMany(() => FileUploead, (file) => file.article)
  images: Array<FileUploead>;

  @OneToMany(() => ArticleCouleurs, (articleCouleur) => articleCouleur.article)
  couleurs: Array<ArticleCouleurs>;

  @OneToMany(() => DocumentDetail, (documentDetail) => documentDetail.article)
  documentDetails: Array<DocumentDetail>;

  @OneToMany(() => UserVotes, (userVote) => userVote.article)
  votes: Array<UserVotes>;
}
