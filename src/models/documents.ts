/* eslint-disable prettier/prettier */
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
    OneToOne,
  } from 'typeorm';
  import { IsNumber } from 'class-validator';

import { User } from './user';
import { DocumentDetail } from './documentDetail';
import { FileUploead } from './files';
  
  @Entity({ name: 'd_docuement' })
  export class Document extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    // devis DV0001 => premier commande | BC BC00001 apres confirmation du commande | BL BL00001 en livraison | facture FA00001 validation de livraision
    @Column({ length: 20, nullable: true,unique:true })
    d_code: string;
  
    @Column({ length: 20, nullable: true })
    d_totalTTC: string;
  
    @Column({ length: 50 })
    d_totalHT: string;
  
    @Column({ length: 200, nullable: true })
    d_commentaire: string;

    @Column({default:0})
    @IsNumber()
    d_totalTVA: number;

    @Column({default:0})
    @IsNumber()
    d_fraisLivraison: number;
  
    @Column({ nullable: true })
    @IsNumber()
    d_totalRemise: number;
  
    // 1 devis | 2 BC | 3 BL | 4 FA
    @Column({default:1})
    @IsNumber()
    type: number;

    @Column({ length: 15, default:"Saisie" })
    d_statut: string;
  
    @Column({ default: true })
    a_active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.documents)
    user: User;

    @OneToMany(() => DocumentDetail, (docdetail) => docdetail.document)
    documentDetails: Array<DocumentDetail>;

    @OneToOne(() => FileUploead, (file) => file.document, { 
      onDelete: 'CASCADE' 
    })
    file: FileUploead;
  }
  