/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Article } from './artciles';

@Entity({ name: 'd_categorie' })
export class Categorie extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 50 })
  c_desgination: string;

  @Column({ length: 150, nullable: true })
  c_desciption: string;

  @Column({ nullable: true })
  c_icon: string;

  @Column({ default: true })
  c_active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // si cette cartegorie appartient a une autre categotrie
  @Column()
  @IsNumber()
  c_categoriePere: number;

  @OneToMany(() => Article, (artcile) => artcile.categorie)
  article: Array<Article>;

  @OneToMany(() => Categorie, (categorie) => categorie.categorie)
  suc_categories: Array<Categorie>;

  @ManyToOne(() => Categorie, (categorie) => categorie.suc_categories, { 
    onDelete: 'CASCADE' 
  })
  categorie: Categorie;

}
