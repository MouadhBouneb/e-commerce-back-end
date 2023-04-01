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
import { IsNumber } from 'class-validator';

import { Document } from './documents';
import { Article } from './artciles';

@Entity({ name: 'd_docuementDetail' })
export class DocumentDetail extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  // devis DV0001 => premier commande | BC BC00001 apres confirmation du commande | BL BL00001 en livraison | facture FA00001 validation de livraision

  @Column({ length: 20, nullable: true })
  dd_totalTTC: string;

  @Column({ length: 50 })
  dd_totalHT: string;

  @Column({ length: 200, nullable: true })
  dd_commentaire: string;

  @Column({ default: 0 })
  @IsNumber()
  dd_TVA: number;

  @Column({ nullable: true, default: 0 })
  @IsNumber()
  dd_remise: number;

  // 1 devis | 2 BC | 3 BL | 4 FA
  @Column({ default: 1 })
  @IsNumber()
  dd_QT: number;

  @Column({ length: 10, nullable: true })
  dd_couleur: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Document, (doc) => doc.documentDetails, { 
    onDelete: 'CASCADE' 
  })
  document: Document;

  @ManyToOne(() => Article, (article) => article.documentDetails, { 
    onDelete: 'CASCADE' 
  })
  article: Article;
}
